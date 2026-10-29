/**
 * ANURAG KUMAR - PORTFOLIO INTERACTION ENGINE
 * Features:
 * - Dynamic Neural Network & Constellation Canvas
 * - Real-Time Interactive Developer Terminal
 * - LMPC Compliance Scanner Simulator (Smart India Hackathon)
 * - Multilingual Speech Synthesis for 12 Indian Languages (Civic Avatar)
 * - 3D Card Tilt Physics & Smooth Micro-Animations
 * - Procedural Web Audio API Sound Effects
 * - Skill Matrix Search & Category Filtering
 * - Clean Resume Sheet Print Integration
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Global State & Settings
  // --------------------------------------------------------------------------
  const state = {
    soundEnabled: true,
    audioCtx: null,
  };

  // --------------------------------------------------------------------------
  // Web Audio API Synthesizer (Procedural UI SFX)
  // --------------------------------------------------------------------------
  function initAudio() {
    if (!state.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playUiSound(type = 'click') {
    if (!state.soundEnabled) return;
    try {
      initAudio();
      if (!state.audioCtx) return;
      if (state.audioCtx.state === 'suspended') {
        state.audioCtx.resume();
      }

      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);

      const now = state.audioCtx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'terminal') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // --------------------------------------------------------------------------
  // Interactive Neural / Particle Canvas Background
  // --------------------------------------------------------------------------
  function initNeuralCanvas() {
    const canvas = document.getElementById('neural-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 38 : 75;
    const connectionDistance = 140;

    let mouse = { x: null, y: null, radius: 160 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.75;
        this.vy = (Math.random() - 0.5) * 0.75;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.4 ? 'rgba(0, 242, 254, ' : 'rgba(168, 85, 247, ';
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse gentle repel
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 2.5;
            this.y -= (dy / dist) * force * 2.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.fill();
      }
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update & Draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      resize();
    });

    init();
    animate();
  }

  // --------------------------------------------------------------------------
  // Hero Dynamic Typewriter
  // --------------------------------------------------------------------------
  function initTypewriter() {
    const textEl = document.getElementById('typewriter-text');
    if (!textEl) return;

    const phrases = [
      'Full-Stack & Applied AI Applications',
      'Computer Vision & OCR Compliance Engines',
      'Smart India Hackathon Winning Systems',
      'Next.js 16 & Modern Web Architectures',
      'Claude API-Powered Multilingual Agents',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function tick() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        textEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        textEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 75;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2200; // Pause at end of phrase
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 450;
      }

      setTimeout(tick, typingSpeed);
    }

    tick();
  }

  // --------------------------------------------------------------------------
  // 3D Card Tilt Effect
  // --------------------------------------------------------------------------
  function init3DTilt() {
    const card = document.getElementById('hero-tilt-card');
    if (!card) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  }

  // --------------------------------------------------------------------------
  // Header Scroll & Mobile Nav
  // --------------------------------------------------------------------------
  function initNavigation() {
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Active Section Highlighting
      const scrollPos = window.scrollY + 120;
      const sections = document.querySelectorAll('section[id]');

      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        playUiSound('click');
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
      });

      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
        });
      });
    }

    // Sound toggle button
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      const onIcon = soundBtn.querySelector('.sound-on-icon');
      const offIcon = soundBtn.querySelector('.sound-off-icon');

      soundBtn.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        if (state.soundEnabled) {
          onIcon.classList.remove('hidden');
          offIcon.classList.add('hidden');
          playUiSound('success');
          showToast('Futuristic Sound Effects: ON');
        } else {
          onIcon.classList.add('hidden');
          offIcon.classList.remove('hidden');
          showToast('Sound Effects: MUTED');
        }
      });
    }

    // Print Resume Button
    const printBtn = document.getElementById('print-resume-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        playUiSound('click');
        window.print();
      });
    }

    // Back to top
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        playUiSound('click');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // --------------------------------------------------------------------------
  // Skills Matrix Filter & Search
  // --------------------------------------------------------------------------
  function initSkillsFilter() {
    const tabs = document.querySelectorAll('.skill-tab');
    const searchInput = document.getElementById('skill-search-input');
    const cards = document.querySelectorAll('.skill-card');

    let activeCategory = 'all';
    let searchQuery = '';

    function filterCards() {
      cards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        const textContent = card.textContent.toLowerCase();

        const matchesCat = activeCategory === 'all' || cardCategory === activeCategory;
        const matchesSearch = searchQuery === '' || textContent.includes(searchQuery);

        if (matchesCat && matchesSearch) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        playUiSound('click');
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        activeCategory = tab.getAttribute('data-category');
        filterCards();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        filterCards();
      });
    }
  }

  // --------------------------------------------------------------------------
  // Interactive Developer Terminal & Shell
  // --------------------------------------------------------------------------
  function initTerminal() {
    const output = document.getElementById('terminal-output');
    const form = document.getElementById('terminal-form');
    const input = document.getElementById('terminal-input');
    const clearBtn = document.getElementById('clear-term-btn');
    const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');

    if (!form || !input || !output) return;

    const commands = {
      help: () => `
<span class="accent-text">Available Commands:</span>
  • <span class="term-code">summary</span>    : Display Anurag's professional background & education
  • <span class="term-code">skills</span>     : Core programming languages, AI & web stacks
  • <span class="term-code">projects</span>   : Key production apps (LMPC, Civic Avatar, TechVriksh)
  • <span class="term-code">sih</span>        : Smart India Hackathon victory details
  • <span class="term-code">techvriksh</span> : TechVriksh full-stack role & contributions
  • <span class="term-code">contact</span>    : Phone, email, location & social links
  • <span class="term-code">hire</span>       : Availability for internships & projects
  • <span class="term-code">resume</span>     : Open printable clean resume view
  • <span class="term-code">clear</span>      : Clear the terminal console
      `,

      summary: () => `
<span class="accent-text">Anurag Kumar</span> | Data Science Student & Full-Stack AI Application Developer
• <span class="dimmed-text">Location:</span> Farukhnagar, Gurugram, Haryana
• <span class="dimmed-text">Education:</span> B.Tech in Data Science, SAITM (Expected 2029)
• <span class="dimmed-text">Profile:</span> Hands-on builder creating full-stack web applications and applied-AI prototypes using React/Next.js, Python/Flask, Claude API, OpenCV, and relational/NoSQL databases. Team Winner at internal Smart India Hackathon round.
      `,

      skills: () => `
<span class="accent-text">Technical Skills Breakdown:</span>
• <span class="dimmed-text">Languages:</span> Python, JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL
• <span class="dimmed-text">Frontend:</span> React, Next.js 16, Tailwind CSS, Vite, Bootstrap 5, Jinja2
• <span class="dimmed-text">Backend & APIs:</span> Node.js, Flask, FastAPI, REST APIs, serverless API routes, Postman
• <span class="dimmed-text">AI, OCR & Vision:</span> Anthropic Claude API, Perplexity AI API, Tesseract OCR, OpenCV, PyTorch
• <span class="dimmed-text">Data & Viz:</span> NumPy, pandas, Recharts, Three.js, React Three Fiber, Leaflet, Framer Motion, Lenis
• <span class="dimmed-text">Databases & Tools:</span> PostgreSQL, MySQL, MongoDB, SQLite, SQLAlchemy, Git, GitHub, pytest, VS Code, Antigravity, Codex, Claude Code
      `,

      projects: () => `
<span class="accent-text">Featured Production Projects:</span>
1. <span class="term-code">LMPC Compliance Scanner</span> [SIH Winner]
   - Automatic packaging label inspection under Legal Metrology Act 2011.
   - Stack: Python, Flask, OpenCV, Tesseract OCR, SQLite, SQLAlchemy, ReportLab.
   - GitHub: <a href="https://github.com/rokey6950-cell/lmpc-compliance-scanner" target="_blank" class="detail-link">github.com/rokey6950-cell/lmpc-compliance-scanner</a>
2. <span class="term-code">AI Government Avatar & Civic Communication</span>
   - Multilingual public broadcast platform supporting 12 Indian languages.
   - Stack: React, Vite, Anthropic Claude API, Recharts, Speech APIs.
   - Live URL: <a href="https://gov-platform.vercel.app/" target="_blank" class="detail-link">https://gov-platform.vercel.app/</a>
   - GitHub: <a href="https://github.com/rokey6950-cell/gov-platform" target="_blank" class="detail-link">github.com/rokey6950-cell/gov-platform</a>
3. <span class="term-code">TechVriksh Platform</span> [Lead Platform & Operations]
   - Community engine & 3D WebGL portal empowering 1,000+ builders across 18 states.
   - Stack: Next.js 16, TypeScript, Perplexity AI SDK, Three.js, React Three Fiber, Leaflet, Lenis, GSAP.
   - Live URL: <a href="https://techvriksh.vercel.app/" target="_blank" class="detail-link">https://techvriksh.vercel.app/</a>
   - GitHub: <a href="https://github.com/rokey6950-cell/Tech-Vriksh" target="_blank" class="detail-link">github.com/rokey6950-cell/Tech-Vriksh</a>
      `,

      sih: () => `
<span class="accent-text">🏆 Smart India Hackathon (SIH) Achievement:</span>
• <span class="dimmed-text">Status:</span> Team Winner (Internal / College-Level Round)
• <span class="dimmed-text">Project:</span> LMPC Compliance Scanner
• <span class="dimmed-text">GitHub:</span> <a href="https://github.com/rokey6950-cell/lmpc-compliance-scanner" target="_blank" class="detail-link">github.com/rokey6950-cell/lmpc-compliance-scanner</a>
• <span class="dimmed-text">Innovation:</span> Automated statutory compliance verification for packaged consumer products using OpenCV image processing and Tesseract OCR, generating downloadable legal audit reports in seconds.
      `,

      techvriksh: () => `
<span class="accent-text">TechVriksh | Tech & Operations Lead:</span>
• <span class="dimmed-text">Scale:</span> 1,000+ Community Members across 18 Indian States
• <span class="dimmed-text">Host Venues:</span> OpsTree Global (Noida), Unstop Office (Saket, New Delhi)
• <span class="dimmed-text">Live Platform:</span> <a href="https://techvriksh.vercel.app/" target="_blank" class="detail-link">https://techvriksh.vercel.app/</a>
• <span class="dimmed-text">GitHub Repo:</span> <a href="https://github.com/rokey6950-cell/Tech-Vriksh" target="_blank" class="detail-link">github.com/rokey6950-cell/Tech-Vriksh</a>
• Lead platform architecture, WebGL 3D spatial camera corridor (Three.js/R3F), and Lenis smooth momentum scrolling.
• Integrated web-grounded community intelligence with the official Perplexity AI SDK (/api/agent) and an interactive Leaflet India choropleth map.
• Oversee technical infrastructure and operations for 15+ workshops, bootcamps, and hackathons.
      `,

      contact: () => `
<span class="accent-text">Contact Channels:</span>
• <span class="dimmed-text">Email:</span> <a href="mailto:rokey6950@gmail.com" class="detail-link">rokey6950@gmail.com</a>
• <span class="dimmed-text">Phone:</span> <a href="tel:7033191827" class="detail-link">+91 7033191827</a>
• <span class="dimmed-text">Location:</span> Farukhnagar, Gurugram, Haryana, India
• <span class="dimmed-text">GitHub:</span> <a href="https://github.com/rokey6950-cell" target="_blank" class="detail-link">github.com/rokey6950-cell</a>
• <span class="dimmed-text">LinkedIn:</span> <a href="https://www.linkedin.com/in/anurag-kumar-b6a3753bb/" target="_blank" class="detail-link">linkedin.com/in/anurag-kumar-b6a3753bb/</a>
      `,

      hire: () => `
<span class="accent-text">🌟 Why Hire Anurag Kumar?</span>
• Rare combination of rigorous Data Science foundation + real-world Full-Stack execution.
• Hackathon-proven speed: engineered an SIH winning OCR compliance tool under strict deadlines.
• Deep familiarity with modern agentic workflows, Claude API, Next.js 16, and Python architectures.
• Status: <span class="status-chip success">Actively Open for Internships & High-Impact Projects</span>
      `,

      resume: () => {
        window.print();
        return `Opening printable clean resume view...`;
      },
    };

    function executeCommand(rawCmd) {
      const cmd = rawCmd.trim().toLowerCase();
      playUiSound('terminal');

      // Append user command line
      const userLine = document.createElement('div');
      userLine.className = 'term-line output';
      userLine.innerHTML = `<span class="prompt-user">visitor@anurag</span>:<span class="prompt-path">~</span>$ <span class="cmd-text">${escapeHtml(rawCmd)}</span>`;
      output.appendChild(userLine);

      if (cmd === '') return;

      if (cmd === 'clear') {
        output.innerHTML = `
          <div class="term-line output system-welcome">
            <span class="accent-text">Terminal cleared.</span> Type <span class="term-code">help</span> for available commands.
          </div>
        `;
        return;
      }

      const resLine = document.createElement('div');
      resLine.className = 'term-line output';

      if (commands[cmd]) {
        resLine.innerHTML = commands[cmd]();
      } else {
        resLine.innerHTML = `<span style="color:#f43f5e">Command not found: "${escapeHtml(cmd)}".</span> Type <span class="term-code">help</span> for a list of valid commands.`;
      }

      output.appendChild(resLine);
      output.scrollTop = output.scrollHeight;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value;
      if (val) {
        executeCommand(val);
        input.value = '';
      }
    });

    quickCmdBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        if (cmd) {
          executeCommand(cmd);
        }
      });
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        playUiSound('click');
        executeCommand('clear');
      });
    }
  }

  // --------------------------------------------------------------------------
  // LMPC Compliance Scanner Simulator
  // --------------------------------------------------------------------------
  function initLmpcSimulator() {
    const sampleBtns = document.querySelectorAll('.sample-btn');
    const runBtn = document.getElementById('run-ocr-btn');
    const resultsContainer = document.getElementById('ocr-audit-results');
    const productDisplay = document.getElementById('sim-product-display');
    const pdfBtn = document.getElementById('sim-pdf-btn');

    const samples = {
      oatmeal: {
        title: 'ORGANIC HARVEST OATMEAL',
        netWt: '454 g (1.0 lb)',
        font: 'Font: 4.2mm (Req > 4.0mm)',
        mrp: '₹ 249.00 (Incl. of all taxes)',
        mfg: '08/2026 | Exp: 08/2027',
        packer: 'Organic Valley Ltd, Sector 18, Gurugram',
        care: 'care@organicharvest.in / 1800-425-9988',
        status: 'pass',
        bannerTitle: 'COMPLIANT (100% Passed)',
        bannerSub: 'Meets all Legal Metrology Act 2011 mandates',
        checks: [
          { name: 'Net Weight Declaration', detail: '454 g detected (Font > 4.0mm)', status: 'pass' },
          { name: 'Maximum Retail Price (MRP)', detail: '₹ 249.00 (Incl. of all taxes present)', status: 'pass' },
          { name: 'Manufacturer / Packer Identity', detail: 'Full address & name detected', status: 'pass' },
          { name: 'Month & Year of Manufacture', detail: '08/2026 format valid', status: 'pass' },
          { name: 'Consumer Grievance Redressal', detail: 'Phone & email verified', status: 'pass' },
        ],
      },
      chips: {
        title: 'ARTISAN CRUNCH POTATO CHIPS',
        netWt: '95 g',
        font: 'Font: 1.8mm (FAIL: Req > 2.5mm for 95g)',
        mrp: '₹ 40.00 (Taxes included)',
        mfg: '10/2026',
        packer: 'SnackCrafters, Industrial Area, Manesar',
        care: 'Email only (Missing mandatory telephone helpline)',
        status: 'fail',
        bannerTitle: 'NON_COMPLIANT (Violations Detected)',
        bannerSub: 'Rule 5 & Rule 9 font height & contact non-compliance',
        checks: [
          { name: 'Net Weight Font Height', detail: '1.8mm detected (Minimum 2.5mm mandatory)', status: 'fail' },
          { name: 'Maximum Retail Price (MRP)', detail: '₹ 40.00 declared correctly', status: 'pass' },
          { name: 'Manufacturer Address', detail: 'Address present', status: 'pass' },
          { name: 'Manufacturing Date', detail: '10/2026 detected', status: 'pass' },
          { name: 'Consumer Care Contact', detail: 'FAILED: Missing statutory telephone number', status: 'fail' },
        ],
      },
      cookie: {
        title: 'LUXURY BELGIAN CHOCO COOKIES',
        netWt: '200 g',
        font: 'Font: 3.1mm (Compliant)',
        mrp: '₹ 350.00 (Missing "Incl. of all taxes" text)',
        mfg: 'Imported: 05/2026',
        packer: 'Global Brands Import Pvt Ltd',
        care: 'support@globalimports.in',
        status: 'review',
        bannerTitle: 'NEEDS_REVIEW (Manual Inspector Review)',
        bannerSub: 'Import declaration verification & tax clause ambiguity',
        checks: [
          { name: 'Net Weight Declaration', detail: '200 g valid font size', status: 'pass' },
          { name: 'MRP Statutory Phrasing', detail: 'WARNING: Missing explicit "Incl. of all taxes"', status: 'warn' },
          { name: 'Importer License & Registration', detail: 'Requires manual verification with FSSAI/LMPC registry', status: 'warn' },
          { name: 'Country of Origin', detail: 'Belgium declared on rear', status: 'pass' },
          { name: 'Customer Care Details', detail: 'Valid email detected', status: 'pass' },
        ],
      },
    };

    let activeSampleKey = 'oatmeal';

    sampleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        playUiSound('click');
        sampleBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        activeSampleKey = btn.getAttribute('data-sample');
        const s = samples[activeSampleKey];

        if (productDisplay && s) {
          productDisplay.innerHTML = `
            <div class="label-header-mock">${s.title}</div>
            <div class="label-row-mock"><span>Net Wt:</span> <strong>${s.netWt}</strong> <span class="font-tag">${s.font}</span></div>
            <div class="label-row-mock"><span>MRP:</span> <strong>${s.mrp}</strong></div>
            <div class="label-row-mock"><span>Mfg Date:</span> <strong>${s.mfg}</strong></div>
            <div class="label-row-mock"><span>Manufacturer:</span> ${s.packer}</div>
            <div class="label-row-mock"><span>Consumer Care:</span> ${s.care}</div>
          `;
        }

        renderResults(s);
      });
    });

    function renderResults(s) {
      if (!resultsContainer || !s) return;

      const bannerClass = s.status === 'pass' ? 'status-pass' : s.status === 'fail' ? 'status-fail' : 'status-review';
      const bannerIcon = s.status === 'pass' ? '✔' : s.status === 'fail' ? '✖' : '⚠';

      const checksHtml = s.checks
        .map(
          (c) => `
        <div class="check-row ${c.status}">
          <span class="check-icon">${c.status === 'pass' ? '✓' : c.status === 'fail' ? '✗' : '!'}</span>
          <span class="check-name">${c.name}</span>
          <span class="check-detail">${c.detail}</span>
        </div>
      `
        )
        .join('');

      resultsContainer.innerHTML = `
        <div class="overall-status-banner ${bannerClass}">
          <span class="banner-icon">${bannerIcon}</span>
          <div>
            <div class="banner-title">${s.bannerTitle}</div>
            <div class="banner-sub">${s.bannerSub}</div>
          </div>
        </div>
        <div class="check-items-list">${checksHtml}</div>
        <div class="sim-actions-footer">
          <button class="btn btn-sm btn-outline" id="sim-pdf-btn">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            <span>Download Official PDF Inspection Report</span>
          </button>
        </div>
      `;

      // Re-attach PDF report listener
      const newPdfBtn = document.getElementById('sim-pdf-btn');
      if (newPdfBtn) {
        newPdfBtn.addEventListener('click', downloadSimulatedReport);
      }
    }

    if (runBtn) {
      runBtn.addEventListener('click', () => {
        playUiSound('terminal');
        runBtn.innerHTML = `<span>Scanning with OpenCV & Tesseract...</span>`;
        runBtn.disabled = true;

        setTimeout(() => {
          runBtn.innerHTML = `
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span>Run OpenCV & Tesseract Rule Audit</span>
          `;
          runBtn.disabled = false;
          playUiSound('success');
          renderResults(samples[activeSampleKey]);
          showToast(`LMPC Scan Completed: ${samples[activeSampleKey].bannerTitle}`);
        }, 600);
      });
    }

    function downloadSimulatedReport() {
      playUiSound('click');
      const s = samples[activeSampleKey];
      const reportText = `================================================================================
GOVERNMENT OF INDIA - LEGAL METROLOGY (PACKAGED COMMODITIES) RULES, 2011
OFFICIAL INSPECTION & COMPLIANCE REPORT (GENERATED VIA LMPC SCANNER)
Lead Developer: Anurag Kumar (Smart India Hackathon Team Winner)
================================================================================
Timestamp: ${new Date().toLocaleString()}
Product Examined: ${s.title}
Overall Compliance Outcome: ${s.bannerTitle}
Statutory Details:
- Net Weight Declared: ${s.netWt} (${s.font})
- Maximum Retail Price (MRP): ${s.mrp}
- Manufacturing / Import Date: ${s.mfg}
- Packer Address: ${s.packer}
- Consumer Helpline: ${s.care}

Rule Audit Breakdown:
${s.checks.map((c, i) => `${i + 1}. [${c.status.toUpperCase()}] ${c.name}: ${c.detail}`).join('\n')}

Inspector Digital Signature: Verified (ReportLab Engine v4.2)
================================================================================`;

      const blob = new Blob([reportText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `LMPC_Compliance_Report_${activeSampleKey.toUpperCase()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast('Downloaded official inspection report summary!');
    }

    if (pdfBtn) {
      pdfBtn.addEventListener('click', downloadSimulatedReport);
    }
  }

  // --------------------------------------------------------------------------
  // AI Civic Avatar & Multilingual Speech Synthesizer
  // --------------------------------------------------------------------------
  function initCivicAvatar() {
    const langSelect = document.getElementById('civic-lang-select');
    const noticeText = document.getElementById('civic-notice-text');
    const speakBtn = document.getElementById('civic-speak-btn');
    const stopBtn = document.getElementById('civic-stop-btn');
    const avatarCircle = document.getElementById('civic-avatar-circle');
    const speakingBadge = document.getElementById('speaking-badge');

    const notices = {
      'en-IN': {
        lang: 'English (India)',
        text: 'Citizens are hereby notified that water supply maintenance work will be carried out in Sector 14 tomorrow from 8:00 AM to 11:00 AM. Kindly store adequate water.',
      },
      'hi-IN': {
        lang: 'Hindi',
        text: 'नागरिकों को सूचित किया जाता है कि कल सुबह 8 बजे से 11 बजे तक सेक्टर 14 में जल आपूर्ति पाइपलाइन रखरखाव कार्य रहेगा। कृपया आवश्यक जल संचय करें।',
      },
      'bn-IN': {
        lang: 'Bengali',
        text: 'নাগরিকদের জানানো হচ্ছে যে আগামীকাল সকাল ৮টা থেকে ১১টা পর্যন্ত সেক্টর ১৪-এ জল সরবরাহ রক্ষণাবেক্ষণের কাজ চলবে। অনুগ্রহ করে পর্যাপ্ত জল সংরক্ষণ করুন।',
      },
      'te-IN': {
        lang: 'Telugu',
        text: 'పౌరులకు తెలియజేయడమైనది: రేపు ఉదయం 8:00 గంటల నుండి 11:00 గంటల వరకు సెక్టార్ 14 లో నీటి సరఫరా పైప్‌లైన్ మరమ్మతు పనులు జరుగుతాయి.',
      },
      'ta-IN': {
        lang: 'Tamil',
        text: 'குடிமக்கள் கவனத்திற்கு: நாளை காலை 8 மணி முதல் 11 மணி வரை செக்டார் 14ல் குடிநீர் குழாய் பராமரிப்பு பணிகள் நடைபெற உள்ளது. போதுமான தண்ணீரை சேமிக்கவும்.',
      },
      'mr-IN': {
        lang: 'Marathi',
        text: 'नागरिकांना सूचित करण्यात येते की उद्या सकाळी ८ ते ११ या वेळेत सेक्टर १४ मध्ये पाणीपुरवठा पाईपलाईन दुरुस्तीचे काम केले जाईल.',
      },
      'gu-IN': {
        lang: 'Gujarati',
        text: 'નાગરિકોને જણાવવામાં આવે છે કે આવતીકાલે સવારે 8:00 થી 11:00 દરમિયાન સેક્ટર 14 માં પાણી પુરવઠાનું સમારકામ હાથ ધરવામાં આવશે.',
      },
      'kn-IN': {
        lang: 'Kannada',
        text: 'ನಾಗರಿಕರಿಗೆ ಸೂಚನೆ: ನಾಳೆ ಬೆಳಿಗ್ಗೆ 8:00 ರಿಂದ 11:00 ರವರೆಗೆ ಸೆಕ್ಟರ್ 14 ರಲ್ಲಿ ನೀರು ಸರಬರಾಜು ಪೈಪ್‌ಲೈನ್ ನಿರ್ವಹಣಾ ಕಾರ್ಯ ನಡೆಯಲಿದೆ.',
      },
      'ml-IN': {
        lang: 'Malayalam',
        text: 'പൗരന്മാരുടെ ശ്രദ്ധയ്ക്ക്: നാളെ രാവിലെ 8 മുതൽ 11 വരെ സെക്ടർ 14-ൽ ജലവിതരണ പൈപ്പ്‌ലൈൻ അറ്റകുറ്റപ്പണികൾ നടക്കും.',
      },
      'pa-IN': {
        lang: 'Punjabi',
        text: 'ਨਾਗਰਿਕਾਂ ਨੂੰ ਸੂਚਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਕਿ ਕੱਲ੍ਹ ਸਵੇਰੇ 8:00 ਤੋਂ 11:00 ਵਜੇ ਤੱਕ ਸੈਕਟਰ 14 ਵਿੱਚ ਪਾਣੀ ਦੀ ਸਪਲਾਈ ਦੀ ਮੁਰੰਮਤ ਦਾ ਕੰਮ ਰਹੇਗਾ।',
      },
      'or-IN': {
        lang: 'Odia',
        text: 'ନାଗରିକମାନଙ୍କୁ ସୂଚିତ କରାଯାଉଛି ଯେ ଆସନ୍ତାକାଲି ସକାଳ ୮ଟାରୁ ୧୧ଟା ପର୍ଯ୍ୟନ୍ତ ସେକ୍ଟର ୧୪ ରେ ଜଳ ଯୋଗାଣ ମରାମତି କାର୍ଯ୍ୟ ହେବ।',
      },
      'ur-IN': {
        lang: 'Urdu',
        text: 'شہریوں کو مطلع کیا جاتا ہے کہ کل صبح 8:00 سے 11:00 بجے تک سیکٹر 14 میں پانی کی سپلائی پائپ لائن کی مرمت کا کام رہے گا۔',
      },
    };

    if (langSelect && noticeText) {
      langSelect.addEventListener('change', () => {
        playUiSound('click');
        const code = langSelect.value;
        if (notices[code]) {
          noticeText.textContent = `"${notices[code].text}"`;
        }
      });
    }

    function stopSpeaking() {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (avatarCircle) avatarCircle.classList.remove('speaking');
      if (speakingBadge) {
        speakingBadge.textContent = 'Idle';
        speakingBadge.style.color = '#c084fc';
      }
    }

    if (speakBtn && langSelect) {
      speakBtn.addEventListener('click', () => {
        playUiSound('click');
        stopSpeaking();

        const code = langSelect.value;
        const notice = notices[code] || notices['hi-IN'];

        if (!('speechSynthesis' in window)) {
          showToast('Speech Synthesis not supported by this browser.');
          return;
        }

        const utterance = new SpeechSynthesisUtterance(notice.text);
        utterance.lang = code;
        utterance.rate = 0.95;
        utterance.pitch = 1.05;

        // Try to select an Indian voice if available
        const voices = window.speechSynthesis.getVoices();
        const matchedVoice = voices.find((v) => v.lang === code || v.lang.startsWith(code.split('-')[0]));
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        utterance.onstart = () => {
          if (avatarCircle) avatarCircle.classList.add('speaking');
          if (speakingBadge) {
            speakingBadge.textContent = `Speaking (${notice.lang})`;
            speakingBadge.style.color = '#34d399';
          }
        };

        utterance.onend = () => {
          stopSpeaking();
        };

        utterance.onerror = () => {
          stopSpeaking();
        };

        window.speechSynthesis.speak(utterance);
      });
    }

    if (stopBtn) {
      stopBtn.addEventListener('click', () => {
        playUiSound('click');
        stopSpeaking();
      });
    }
  }

  // --------------------------------------------------------------------------
  // Modals Framework
  // --------------------------------------------------------------------------
  function initModals() {
    const openBtns = document.querySelectorAll('.launch-demo-btn');
    const closeBtns = document.querySelectorAll('.modal-close-btn');
    const backdrops = document.querySelectorAll('.modal-backdrop');

    openBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        playUiSound('click');
        const modalId = btn.getAttribute('data-modal');
        const target = document.getElementById(modalId);
        if (target) {
          target.classList.add('active');
          target.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeModal(backdrop) {
      playUiSound('click');
      backdrop.classList.remove('active');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }

    closeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        const target = document.getElementById(modalId);
        if (target) closeModal(target);
      });
    });

    backdrops.forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          closeModal(backdrop);
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        backdrops.forEach((bd) => {
          if (bd.classList.contains('active')) {
            closeModal(bd);
          }
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // Clipboard Copy & Contact Form
  // --------------------------------------------------------------------------
  function initContactAndClipboard() {
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy');
        if (textToCopy && navigator.clipboard) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            playUiSound('success');
            showToast(`Copied to clipboard: ${textToCopy}`);
            btn.textContent = 'Copied!';
            setTimeout(() => {
              btn.textContent = 'Copy';
            }, 2000);
          });
        }
      });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        playUiSound('success');

        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;

        showToast(`Thank you, ${name}! Your message is prepared. Opening email client...`);

        // Create mailto fallback link
        const mailtoUrl = `mailto:rokey6950@gmail.com?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 800);

        contactForm.reset();
      });
    }
  }

  // --------------------------------------------------------------------------
  // Toast Helper
  // --------------------------------------------------------------------------
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f2fe" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3800);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initNeuralCanvas();
    initTypewriter();
    init3DTilt();
    initNavigation();
    initSkillsFilter();
    initTerminal();
    initLmpcSimulator();
    initCivicAvatar();
    initModals();
    initContactAndClipboard();
  });
})();

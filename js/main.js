// === NAV SCROLL EFFECT ===
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// === CUSTOM CURSOR ===
const cursorDot = document.createElement('div');
const cursorRing = document.createElement('div');
cursorDot.className = 'cursor-dot';
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX - 4 + 'px';
  cursorDot.style.top = mouseY - 4 + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX - 16 + 'px';
  cursorRing.style.top = ringY - 16 + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Magnetic hover on interactive elements
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a, button, .btn-primary, .btn-secondary').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });

  // Card tilt on mouse move
  document.querySelectorAll('.origin-card, .coffee-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});

// === FLOATING BACKGROUND ===
function initFloatingBg() {
  const container = document.querySelector('.floating-bg');
  if (!container) return;

  const beanConfigs = [
    { left: '3%', w: 44, h: 66, dur: 18, delay: 0, fill: '#a08060' },
    { left: '14%', w: 36, h: 54, dur: 24, delay: 3, fill: '#8b7050' },
    { left: '28%', w: 40, h: 60, dur: 20, delay: 7, fill: '#b09070' },
    { left: '40%', w: 32, h: 48, dur: 26, delay: 1, fill: '#9a7e5e' },
    { left: '55%', w: 48, h: 72, dur: 22, delay: 5, fill: '#b8966e' },
    { left: '68%', w: 34, h: 51, dur: 28, delay: 9, fill: '#8b7050' },
    { left: '82%', w: 42, h: 63, dur: 19, delay: 11, fill: '#a89070' },
    { left: '93%', w: 28, h: 42, dur: 30, delay: 4, fill: '#9a8060' },
    { left: '8%', w: 30, h: 45, dur: 25, delay: 16, fill: '#b09070' },
    { left: '48%', w: 38, h: 57, dur: 32, delay: 14, fill: '#a89070' },
    { left: '75%', w: 46, h: 69, dur: 21, delay: 8, fill: '#b8966e' },
    { left: '35%', w: 34, h: 51, dur: 27, delay: 13, fill: '#9a7e5e' },
  ];

  beanConfigs.forEach(cfg => {
    const bean = document.createElement('div');
    bean.className = 'bean';
    bean.style.cssText = `left:${cfg.left};width:${cfg.w}px;height:${cfg.h}px;animation-duration:${cfg.dur}s;animation-delay:${cfg.delay}s;`;
    bean.innerHTML = `<svg viewBox="0 0 40 60"><ellipse cx="20" cy="30" rx="16" ry="26" fill="${cfg.fill}"/><line x1="20" y1="6" x2="20" y2="54" stroke="#5a4530" stroke-width="2"/></svg>`;
    container.appendChild(bean);
  });

  const steamConfigs = [
    { left: '8%', h: 150, dur: 10, delay: 0 },
    { left: '22%', h: 120, dur: 13, delay: 2 },
    { left: '38%', h: 180, dur: 15, delay: 5 },
    { left: '55%', h: 130, dur: 11, delay: 1 },
    { left: '72%', h: 160, dur: 14, delay: 7 },
    { left: '88%', h: 100, dur: 12, delay: 4 },
    { left: '45%', h: 140, dur: 16, delay: 9 },
  ];

  steamConfigs.forEach(cfg => {
    const steam = document.createElement('div');
    steam.className = 'steam';
    steam.style.cssText = `left:${cfg.left};height:${cfg.h}px;background:linear-gradient(to top,rgba(212,165,116,0.22),transparent);animation-duration:${cfg.dur}s;animation-delay:${cfg.delay}s;`;
    container.appendChild(steam);
  });

  for (let i = 0; i < 12; i++) {
    const dust = document.createElement('div');
    dust.className = 'dust';
    const size = 3 + Math.random() * 3;
    dust.style.cssText = `left:${5 + Math.random() * 90}%;top:${10 + Math.random() * 80}%;width:${size}px;height:${size}px;background:rgba(212,165,116,${0.4 + Math.random() * 0.25});animation-duration:${7 + Math.random() * 5}s;animation-delay:${Math.random() * 8}s;box-shadow:0 0 ${size + 3}px rgba(212,165,116,${0.2 + Math.random() * 0.2});`;
    container.appendChild(dust);
  }
}

document.addEventListener('DOMContentLoaded', initFloatingBg);

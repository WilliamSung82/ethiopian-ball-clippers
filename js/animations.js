export function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance animation
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    gsap.set(['.hero-badge', '.hero-sub', '.hero-cta'], { y: 20 });
    heroTl
      .to('.hero-badge', { opacity: 1, y: 0, duration: 0.8 }, 0.3)
      .fromTo('.hero-title', { opacity: 0, y: 40, letterSpacing: '8px' }, { opacity: 1, y: 0, letterSpacing: '0px', duration: 1.2 }, 0.5)
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8 }, 0.8)
      .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8 }, 1.0);
  }

  // Staggered card reveals
  gsap.utils.toArray('.origin-card, .coffee-card, .pc, .partner-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0, y: 60, duration: 0.8, delay: i % 3 * 0.15, ease: 'power3.out',
    });
  });

  // Stats counter animation
  gsap.utils.toArray('.stat-number').forEach(stat => {
    const target = stat.textContent;
    const num = parseInt(target);
    if (isNaN(num)) return;
    const suffix = target.replace(/[\d]/g, '');
    ScrollTrigger.create({
      trigger: stat, start: 'top 80%',
      onEnter: () => {
        gsap.from(stat, {
          textContent: 0, duration: 2, ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function () { stat.textContent = Math.round(parseFloat(stat.textContent)) + suffix; },
        });
      },
      once: true,
    });
  });

  // Section fade-ins
  gsap.utils.toArray('.section-label, .section-title, .section-sub').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
    });
  });
}

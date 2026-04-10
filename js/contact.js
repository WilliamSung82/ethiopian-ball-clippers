// === TAB SWITCHING ===
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-content');

function switchTab(tabId) {
  tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
  tabPanels.forEach(panel => {
    panel.classList.remove('active');
    if (panel.id === tabId) {
      // Force reflow so animation replays
      void panel.offsetWidth;
      panel.classList.add('active');
    }
  });
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Auto-switch on URL hash
function checkHash() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const matchBtn = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
    if (matchBtn) switchTab(hash);
  }
}
checkHash();
window.addEventListener('hashchange', checkHash);

// === SAMPLE PICKER ===
const MAX_SAMPLES = 3;
const sampleCards = document.querySelectorAll('.sample-card');

sampleCards.forEach(card => {
  card.addEventListener('click', () => {
    if (card.classList.contains('selected')) {
      card.classList.remove('selected');
      return;
    }
    const selected = document.querySelectorAll('.sample-card.selected');
    if (selected.length >= MAX_SAMPLES) return;
    card.classList.add('selected');
  });
});

// === FAQ ACCORDION ===
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-q');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Close all others
    faqItems.forEach(other => other.classList.remove('open'));
    // Toggle current
    if (!isOpen) item.classList.add('open');
  });
});

export { switchTab };

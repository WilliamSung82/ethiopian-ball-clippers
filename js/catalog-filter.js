import { coffees } from './data.js';

// --- Flavor-profile keyword mapping ---
const profileKeywords = {
  Fruity:     ['Blueberry', 'Blackcurrant', 'Grapefruit', 'Peach', 'Red Apple', 'Plum', 'Stone Fruit', 'Citrus', 'Citrus Zest', 'Jam', 'Wine'],
  Floral:     ['Jasmine', 'Floral', 'Bergamot', 'Honey'],
  Chocolatey: ['Dark Chocolate', 'Chocolate', 'Caramel', 'Brown Sugar', 'Vanilla'],
  Spiced:     ['Black Tea', 'Mineral', 'Bright', 'Spiced']
};

// --- Build a single card HTML ---
function renderCard(c) {
  const regionShort = c.region.split(',')[0];
  const dots = Array.from({ length: 5 }, (_, i) =>
    `<div class="dot${i < c.body ? ' filled' : ''}"></div>`
  ).join('');

  const tags = c.flavors.slice(0, 3).map(f =>
    `<span class="tag">${f}</span>`
  ).join('');

  return `
    <a href="coffee-detail.html?id=${c.id}" class="coffee-card" data-country="${c.country}" data-flavors="${c.flavors.join(',').toLowerCase()}">
      <div class="card-img">
        <div class="card-gradient" style="background:${c.gradient}"></div>
        <div class="card-badge">${c.badge}</div>
        <div class="card-flag">${c.flag}</div>
        <div class="card-quick"><button class="card-quick-btn">Quick View &rarr;</button></div>
      </div>
      <div class="card-body">
        <div class="card-origin">${c.country} &middot; ${regionShort}</div>
        <div class="card-name">${c.name}</div>
        <div class="card-desc">${c.description}</div>
        <div class="card-meta">
          <div class="meta-item"><span class="meta-label">Roast</span><span class="meta-value">${c.roast}</span></div>
          <div class="meta-item"><span class="meta-label">Altitude</span><span class="meta-value">${c.altitude}</span></div>
          <div class="meta-item"><span class="meta-label">Process</span><span class="meta-value">${c.process}</span></div>
          <div class="meta-item">
            <span class="meta-label">Body</span>
            <div class="rating">${dots}</div>
          </div>
        </div>
        <div class="card-tags">${tags}</div>
      </div>
    </a>`;
}

// --- Render all cards ---
const grid = document.querySelector('.catalog-grid');
if (!grid) { console.warn('catalog-filter: .catalog-grid not found'); }

function renderGrid(list) {
  if (list.length === 0) {
    grid.innerHTML = '<div class="no-results">No coffees match your filters.</div>';
  } else {
    grid.innerHTML = list.map(renderCard).join('');
  }
  animateCards();
}

// --- GSAP animation helper ---
function animateCards() {
  if (typeof gsap === 'undefined') return;
  const cards = grid.querySelectorAll('.coffee-card');
  if (!cards.length) return;
  gsap.fromTo(cards,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
  );
}

// --- State ---
let activeOrigin = 'All';
let activeProfile = null;
let searchQuery = '';

function filteredCoffees() {
  return coffees.filter(c => {
    // Origin filter
    if (activeOrigin !== 'All' && c.country !== activeOrigin) return false;

    // Profile filter
    if (activeProfile) {
      const keywords = profileKeywords[activeProfile] || [];
      const match = c.flavors.some(f => keywords.includes(f));
      if (!match) return false;
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const haystack = [c.name, c.country, ...c.flavors].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

// --- Wire up filter buttons ---
document.querySelectorAll('.filter-btn[data-origin]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-origin]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeOrigin = btn.dataset.origin;
    renderGrid(filteredCoffees());
  });
});

document.querySelectorAll('.filter-btn[data-profile]').forEach(btn => {
  btn.addEventListener('click', () => {
    // Toggle: click same profile again to deactivate
    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
      activeProfile = null;
    } else {
      document.querySelectorAll('.filter-btn[data-profile]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeProfile = btn.dataset.profile;
    }
    renderGrid(filteredCoffees());
  });
});

// --- Wire up search ---
const searchInput = document.querySelector('.search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderGrid(filteredCoffees());
  });
}

// --- Initial render ---
renderGrid(coffees);

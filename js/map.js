const HIGHLIGHT_IDS = ['ET', 'KE', 'TZ', 'RW', 'BI', 'UG'];

const PIN_DATA = [
  { id: 'tip-ethiopia',  label: 'Ethiopia',  x: 172, y: 68 },
  { id: 'tip-kenya',     label: 'Kenya',     x: 170, y: 95 },
  { id: 'tip-uganda',    label: 'Uganda',    x: 158, y: 88 },
  { id: 'tip-rwanda',    label: 'Rwanda',    x: 155, y: 100 },
  { id: 'tip-burundi',   label: 'Burundi',   x: 155, y: 105 },
  { id: 'tip-tanzania',  label: 'Tanzania',  x: 168, y: 112 },
  { id: 'tip-turkey',    label: 'Turkey',    x: 170, y: -5 },
];

const ROUTE_PATH = 'M170,70 C170,50 175,20 170,-5';

function createSVGElement(tag, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v);
  }
  return el;
}

async function fetchSVGPaths(url) {
  const resp = await fetch(url);
  const text = await resp.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'image/svg+xml');
  return Array.from(doc.querySelectorAll('path'));
}

export async function initMap() {
  const container = document.querySelector('.map-container');
  if (!container) return;

  const [africaPaths, turkeyPaths] = await Promise.all([
    fetchSVGPaths('assets/map/africa.svg'),
    fetchSVGPaths('assets/map/turkey.svg'),
  ]);

  // Build the combined SVG
  const svg = createSVGElement('svg', {
    viewBox: '-5 -25 255 255',
    class: 'route-map-svg',
    preserveAspectRatio: 'xMidYMid meet',
  });

  // Africa group
  const africaGroup = createSVGElement('g', { class: 'africa-group' });
  africaPaths.forEach(srcPath => {
    const id = srcPath.getAttribute('id');
    const d = srcPath.getAttribute('d');
    if (!d) return;
    const isHighlighted = HIGHLIGHT_IDS.includes(id);
    const path = createSVGElement('path', {
      d,
      id: id || '',
      fill: isHighlighted ? '#2a1f10' : '#151008',
      stroke: isHighlighted ? 'rgba(212,165,116,0.3)' : 'rgba(212,165,116,0.07)',
      'stroke-width': isHighlighted ? '0.4' : '0.2',
    });
    if (isHighlighted) path.classList.add('highlighted-country');
    africaGroup.appendChild(path);
  });
  svg.appendChild(africaGroup);

  // Turkey group
  const turkeyGroup = createSVGElement('g', {
    class: 'turkey-group',
    transform: 'translate(143.1,-16.3) scale(0.0678)',
  });
  turkeyPaths.forEach(srcPath => {
    const d = srcPath.getAttribute('d');
    if (!d) return;
    const path = createSVGElement('path', {
      d,
      fill: '#1f1508',
      stroke: 'rgba(212,165,116,0.15)',
      'stroke-width': '3',
    });
    turkeyGroup.appendChild(path);
  });
  svg.appendChild(turkeyGroup);

  // Route line
  const routeLine = createSVGElement('path', {
    d: ROUTE_PATH,
    fill: 'none',
    stroke: 'rgba(212,165,116,0.35)',
    'stroke-width': '0.6',
    'stroke-dasharray': '3 2',
    class: 'route-line',
  });
  svg.appendChild(routeLine);

  // Traveling dot
  const travelDot = createSVGElement('circle', {
    r: '1.8',
    fill: '#d4a574',
    class: 'travel-dot',
  });
  const animateMotion = createSVGElement('animateMotion', {
    dur: '4s',
    repeatCount: 'indefinite',
    path: ROUTE_PATH,
  });
  travelDot.appendChild(animateMotion);
  svg.appendChild(travelDot);

  // Pin markers
  const pinsGroup = createSVGElement('g', { class: 'pins-group' });
  PIN_DATA.forEach(pin => {
    const g = createSVGElement('g', {
      class: 'map-pin',
      'data-tip': pin.id,
      transform: `translate(${pin.x}, ${pin.y})`,
    });

    // Outer glow
    const glow = createSVGElement('circle', {
      r: '3.5',
      fill: 'rgba(212,165,116,0.12)',
      class: 'pin-glow',
    });

    // Pin dot
    const dot = createSVGElement('circle', {
      r: '1.6',
      fill: '#d4a574',
      stroke: '#0a0705',
      'stroke-width': '0.4',
    });

    g.appendChild(glow);
    g.appendChild(dot);
    pinsGroup.appendChild(g);
  });
  svg.appendChild(pinsGroup);

  container.appendChild(svg);

  // Tooltip interaction
  const pins = svg.querySelectorAll('.map-pin');
  pins.forEach(pin => {
    const tipId = pin.getAttribute('data-tip');
    const tipEl = document.getElementById(tipId);
    if (!tipEl) return;

    pin.addEventListener('mouseenter', (e) => {
      // Position tooltip near pin
      const rect = container.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      const pinRect = pin.getBoundingClientRect();
      const left = pinRect.left - rect.left + pinRect.width / 2;
      const top = pinRect.top - rect.top;

      tipEl.style.left = left + 'px';
      tipEl.style.top = (top - 8) + 'px';
      tipEl.classList.add('show');
    });

    pin.addEventListener('mouseleave', () => {
      tipEl.classList.remove('show');
    });
  });
}

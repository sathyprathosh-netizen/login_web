/* ================================================================
   CULINA-SUITE — Shared JavaScript Engine v1.0
   Global utilities, navigation, mock data & simulation logic
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   MOCK DATA STORE
   ---------------------------------------------------------------- */
const CS = {

  /* --- Restaurant Config --- */
  config: {
    restaurantName: 'The Grand Brasserie',
    outlets: [
      { id: 'main', name: 'Main Branch – Bandra', type: 'Dine-In', status: 'online', revenue: 84200 },
      { id: 'juhu', name: 'Juhu Outlet', type: 'Dine-In', status: 'online', revenue: 61800 },
      { id: 'ck1', name: 'Cloud Kitchen #1', type: 'Cloud Kitchen', status: 'online', revenue: 47500 },
      { id: 'ck2', name: 'Cloud Kitchen #2', type: 'Cloud Kitchen', status: 'warning', revenue: 29100 },
      { id: 'mall', name: 'Phoenix Mall Kiosk', type: 'Kiosk', status: 'offline', revenue: 0 },
    ],
    activeOutlet: 'main',
    currency: '₹',
  },

  /* --- Menu Items --- */
  menu: [
    { id: 1, name: 'Truffle Mushroom Risotto', category: 'Mains', price: 680, cost: 190, ingredients: ['Arborio Rice', 'Truffle Oil', 'Mushrooms', 'Parmesan', 'White Wine'], stock: 24, sku: 'CSM-001' },
    { id: 2, name: 'Pan-Seared Salmon', category: 'Mains', price: 890, cost: 280, ingredients: ['Atlantic Salmon', 'Capers', 'Lemon Butter', 'Dill', 'Asparagus'], stock: 18, sku: 'CSM-002' },
    { id: 3, name: 'Chicken Piccata', category: 'Mains', price: 620, cost: 155, ingredients: ['Chicken Breast', 'Capers', 'Lemon Juice', 'Butter', 'Flour'], stock: 32, sku: 'CSM-003' },
    { id: 4, name: 'Classic Caesar Salad', category: 'Starters', price: 320, cost: 75, ingredients: ['Romaine Lettuce', 'Parmesan', 'Croutons', 'Caesar Dressing'], stock: 40, sku: 'CSS-001' },
    { id: 5, name: 'Burrata & Prosciutto', category: 'Starters', price: 490, cost: 140, ingredients: ['Burrata Cheese', 'Prosciutto', 'Cherry Tomatoes', 'Basil', 'EVOO'], stock: 14, sku: 'CSS-002' },
    { id: 6, name: 'Espresso Martini', category: 'Cocktails', price: 380, cost: 85, ingredients: ['Vodka', 'Espresso', 'Coffee Liqueur', 'Simple Syrup'], stock: 60, sku: 'CSC-001' },
    { id: 7, name: 'Mango Bellini', category: 'Cocktails', price: 320, cost: 60, ingredients: ['Prosecco', 'Mango Puree', 'Mint'], stock: 55, sku: 'CSC-002' },
    { id: 8, name: 'Tiramisu', category: 'Desserts', price: 340, cost: 70, ingredients: ['Mascarpone', 'Espresso', 'Ladyfingers', 'Cocoa', 'Eggs'], stock: 22, sku: 'CSD-001' },
    { id: 9, name: 'Chocolate Lava Cake', category: 'Desserts', price: 360, cost: 80, ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Flour', 'Sugar'], stock: 28, sku: 'CSD-002' },
    { id: 10, name: 'Sourdough Garlic Bread', category: 'Sides', price: 180, cost: 35, ingredients: ['Sourdough', 'Butter', 'Garlic', 'Parsley'], stock: 50, sku: 'CSI-001' },
  ],

  /* --- Tables --- */
  tables: [
    { id: 1, label: 'T01', capacity: 2, status: 'vacant', section: 'Window' },
    { id: 2, label: 'T02', capacity: 4, status: 'occupied', section: 'Window', covers: 3, time: '45min', orderId: 'ORD-1042' },
    { id: 3, label: 'T03', capacity: 4, status: 'bill', section: 'Window', covers: 4, time: '82min', orderId: 'ORD-1039' },
    { id: 4, label: 'T04', capacity: 6, status: 'vacant', section: 'Main' },
    { id: 5, label: 'T05', capacity: 6, status: 'occupied', section: 'Main', covers: 5, time: '28min', orderId: 'ORD-1045' },
    { id: 6, label: 'T06', capacity: 2, status: 'reserved', section: 'Main' },
    { id: 7, label: 'T07', capacity: 4, status: 'occupied', section: 'Bar', covers: 2, time: '15min', orderId: 'ORD-1047' },
    { id: 8, label: 'T08', capacity: 4, status: 'vacant', section: 'Bar' },
    { id: 9, label: 'T09', capacity: 8, status: 'occupied', section: 'Private', covers: 7, time: '62min', orderId: 'ORD-1038' },
    { id: 10, label: 'T10', capacity: 8, status: 'bill', section: 'Private', covers: 6, time: '95min', orderId: 'ORD-1035' },
    { id: 11, label: 'T11', capacity: 2, status: 'vacant', section: 'Terrace' },
    { id: 12, label: 'T12', capacity: 2, status: 'occupied', section: 'Terrace', covers: 2, time: '21min', orderId: 'ORD-1048' },
  ],

  /* --- Live KDS Orders --- */
  kdsOrders: [
    { id: 'ORD-1047', table: 'T07', type: 'Dine-In', items: [{ name: 'Truffle Mushroom Risotto', qty: 1, mods: 'No Parmesan' }, { name: 'Espresso Martini', qty: 2 }], station: 'Kitchen', elapsed: 7, status: 'preparing', priority: 'normal' },
    { id: 'ORD-1045', table: 'T05', type: 'Dine-In', items: [{ name: 'Chicken Piccata', qty: 3 }, { name: 'Classic Caesar Salad', qty: 2, mods: 'Dressing on side' }, { name: 'Sourdough Garlic Bread', qty: 2 }], station: 'Kitchen', elapsed: 19, status: 'delayed', priority: 'warning' },
    { id: 'ORD-1048', table: 'T12', type: 'Dine-In', items: [{ name: 'Pan-Seared Salmon', qty: 2 }, { name: 'Mango Bellini', qty: 2 }], station: 'Bar', elapsed: 4, status: 'preparing', priority: 'normal' },
    { id: 'DLV-9021', table: 'Delivery', type: 'Delivery', items: [{ name: 'Burrata & Prosciutto', qty: 1 }, { name: 'Chicken Piccata', qty: 2 }, { name: 'Tiramisu', qty: 2 }], station: 'Kitchen', elapsed: 24, status: 'critical', priority: 'critical' },
    { id: 'TKW-3312', table: 'Takeaway', type: 'Takeaway', items: [{ name: 'Classic Caesar Salad', qty: 1 }, { name: 'Chocolate Lava Cake', qty: 1 }], station: 'Kitchen', elapsed: 11, status: 'preparing', priority: 'normal' },
    { id: 'ORD-1042', table: 'T02', type: 'Dine-In', items: [{ name: 'Espresso Martini', qty: 3 }, { name: 'Mango Bellini', qty: 1 }], station: 'Bar', elapsed: 5, status: 'preparing', priority: 'normal' },
  ],

  /* --- Inventory / Stock --- */
  inventory: [
    { id: 'INV-001', name: 'Atlantic Salmon (Fillet)', unit: 'kg', onHand: 2.4, minLevel: 3.0, reorderQty: 8, costPerUnit: 1200, supplier: 'SeaFresh Co.', status: 'low' },
    { id: 'INV-002', name: 'Burrata Cheese', unit: 'units', onHand: 8, minLevel: 6, reorderQty: 20, costPerUnit: 180, supplier: 'Artisan Dairy', status: 'ok' },
    { id: 'INV-003', name: 'Truffle Oil (EVOO Base)', unit: 'L', onHand: 0.3, minLevel: 0.5, reorderQty: 2, costPerUnit: 3800, supplier: 'La Truffe Import', status: 'critical' },
    { id: 'INV-004', name: 'Arborio Rice', unit: 'kg', onHand: 12.5, minLevel: 5, reorderQty: 15, costPerUnit: 280, supplier: 'Grain Masters', status: 'ok' },
    { id: 'INV-005', name: 'Prosciutto (Sliced)', unit: 'kg', onHand: 1.2, minLevel: 1.0, reorderQty: 3, costPerUnit: 1850, supplier: 'Deli Imports', status: 'ok' },
    { id: 'INV-006', name: 'Mascarpone Cheese', unit: 'kg', onHand: 4.8, minLevel: 2, reorderQty: 6, costPerUnit: 420, supplier: 'Artisan Dairy', status: 'ok' },
    { id: 'INV-007', name: 'Dark Chocolate (70%)', unit: 'kg', onHand: 3.2, minLevel: 2, reorderQty: 5, costPerUnit: 890, supplier: 'Choco Imports', status: 'ok' },
    { id: 'INV-008', name: 'Prosecco (Bottle)', unit: 'btl', onHand: 7, minLevel: 12, reorderQty: 24, costPerUnit: 1100, supplier: 'Vineyard Direct', status: 'low' },
    { id: 'INV-009', name: 'Coffee Liqueur (Kahlúa)', unit: 'btl', onHand: 3, minLevel: 2, reorderQty: 6, costPerUnit: 2200, supplier: 'Bar Supplies Ltd.', status: 'ok' },
    { id: 'INV-010', name: 'Chicken Breast (Boneless)', unit: 'kg', onHand: 8.5, minLevel: 5, reorderQty: 12, costPerUnit: 380, supplier: 'Farm Fresh', status: 'ok' },
  ],

  /* --- Analytics --- */
  analytics: {
    today: { revenue: 84200, orders: 147, avgTicket: 572, newCustomers: 31, covers: 214 },
    week: [
      { day: 'Mon', revenue: 68400, orders: 112 },
      { day: 'Tue', revenue: 72100, orders: 128 },
      { day: 'Wed', revenue: 79800, orders: 139 },
      { day: 'Thu', revenue: 84200, orders: 147 },
      { day: 'Fri', revenue: 0, orders: 0 },
      { day: 'Sat', revenue: 0, orders: 0 },
      { day: 'Sun', revenue: 0, orders: 0 },
    ],
    topItems: [
      { name: 'Pan-Seared Salmon', qty: 47, revenue: 41830 },
      { name: 'Truffle Mushroom Risotto', qty: 38, revenue: 25840 },
      { name: 'Espresso Martini', qty: 62, revenue: 23560 },
      { name: 'Burrata & Prosciutto', qty: 29, revenue: 14210 },
      { name: 'Tiramisu', qty: 41, revenue: 13940 },
    ],
    hourly: [8, 12, 18, 32, 54, 78, 92, 84, 71, 65, 48, 39, 27, 18, 12, 8],
  },
};

/* ----------------------------------------------------------------
   DOM UTILITIES
   ---------------------------------------------------------------- */
const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

const createElement = (tag, attrs = {}, ...children) => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else el.setAttribute(k, v);
  });
  children.forEach(c => {
    if (typeof c === 'string') el.insertAdjacentHTML('beforeend', c);
    else if (c) el.appendChild(c);
  });
  return el;
};

/* ----------------------------------------------------------------
   AUTHENTICATION & SESSION
   ---------------------------------------------------------------- */
const AUTH_REDIRECT_EXEMPT = ['login.html', 'index.html'];

function getUser() {
  try {
    return JSON.parse(localStorage.getItem('cs_user'));
  } catch (e) { return null; }
}

function checkAuth() {
  const user = getUser();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  if (!user && !AUTH_REDIRECT_EXEMPT.includes(currentPage)) {
    window.location.href = 'login.html';
    return null;
  }

  // Role-based page protection
  if (user && user.position === 'Customer') {
    const restrictedPages = ['admin.html', 'inventory.html', 'outlets.html', 'kds.html'];
    if (restrictedPages.includes(currentPage)) {
      window.location.href = 'index.html';
      return user;
    }
  }

  return user;
}

function logout() {
  localStorage.removeItem('cs_user');
  window.location.href = 'login.html';
}

/* ----------------------------------------------------------------
   NAV BUILDER
   ---------------------------------------------------------------- */
const NAV_ITEMS = [
  { href: 'index.html', icon: '◈', label: 'Overview' },
  { href: 'customer.html', icon: '⊞', label: 'Dashboard', customerOnly: true },
  { href: 'pos.html', icon: '🛒', label: 'Order Now' },
  { href: 'ratings.html', icon: '⭐', label: 'Ratings' },
  { href: 'kds.html', icon: '⊟', label: 'KDS', staffOnly: true },
  { href: 'inventory.html', icon: '⊛', label: 'Inventory', restricted: true },
  { href: 'admin.html', icon: '◉', label: 'Analytics', restricted: true },
  { href: 'outlets.html', icon: '⊕', label: 'Outlets', restricted: true },
];

function buildNav() {
  const nav = $('.cs-nav');
  if (!nav) return;

  const user = getUser();
  const isAdmin = user && user.position === 'Manager';
  const isStaff = user && ['Cashier', 'Chef', 'Manager'].includes(user.position);
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const items = NAV_ITEMS
    .filter(n => {
      const isCustomer = user && user.position === 'Customer';
      if (n.restricted && !isAdmin) return false;
      if (n.staffOnly && !isStaff) return false;
      if (n.customerOnly && !isCustomer) return false;
      return true;
    })
    .map(n => {
      const isActive = currentPage === n.href ? 'active' : '';
      return `<a href="${n.href}" class="cs-nav__item ${isActive}">
        <span class="icon">${n.icon}</span> ${n.label}
      </a>`;
    }).join('');

  nav.innerHTML = `
    <div class="cs-nav__brand">
      <div class="cs-nav__logo">CS</div>
      <div class="cs-nav__name">CULINA<span>-SUITE</span></div>
    </div>
    <div class="cs-nav__mobile-toggle" id="navToggle">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="cs-nav__items">${items}</div>
    <div class="cs-nav__actions">
      <div class="user-pill" onclick="if(confirm('Logout?')) logout()">
        <div class="user-pill__name">${user ? user.name.split(' ')[0] : 'Guest'}</div>
        <div class="user-pill__role">${user ? user.position : 'Logout'}</div>
      </div>
    </div>
  `;

  // Mobile Toggle Logic
  const toggle = $('#navToggle');
  if (toggle) {
    toggle.onclick = () => {
      nav.classList.toggle('is-active');
      document.body.style.overflow = nav.classList.contains('is-active') ? 'hidden' : '';
    };

    // Close on link click
    $$('.cs-nav__item').forEach(item => {
      item.onclick = () => {
        nav.classList.remove('is-active');
        document.body.style.overflow = '';
      };
    });
  }
}

/* ----------------------------------------------------------------
   TOAST NOTIFICATION
   ---------------------------------------------------------------- */
function showToast(message, type = 'info', duration = 3500) {
  const colors = { success: 'var(--color-success)', warning: 'var(--color-warning)', error: 'var(--color-critical)', info: 'var(--color-primary)' };
  const icons = { success: '✓', warning: '⚡', error: '✕', info: '◈' };
  const color = colors[type] || colors.info;

  const toast = createElement('div', { class: 'cs-toast' });
  toast.style.cssText = `border-left: 3px solid ${color};`;
  toast.innerHTML = `
    <span style="color:${color};font-size:18px;">${icons[type] || icons.info}</span>
    <div>
      <div style="font-size:var(--text-sm);font-weight:600;color:var(--text-primary);">${message}</div>
    </div>
    <button onclick="this.parentElement.remove()" style="margin-left:auto;color:var(--text-muted);font-size:18px;">×</button>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fade-in 0.3s ease reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ----------------------------------------------------------------
   COUNTER ANIMATION
   ---------------------------------------------------------------- */
function animateCounter(el, target, duration = 1200, prefix = '', suffix = '', decimals = 0) {
  if (!el) return;
  const start = performance.now();
  const from = 0;

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = from + (target - from) * eased;
    el.textContent = prefix + current.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ----------------------------------------------------------------
   INTERSECTION OBSERVER — Animate on scroll
   ---------------------------------------------------------------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');

        // Trigger counters within visible section
        $$('[data-counter]', e.target).forEach(counter => {
          const target = parseFloat(counter.dataset.counter);
          const prefix = counter.dataset.prefix || '';
          const suffix = counter.dataset.suffix || '';
          const decimals = parseInt(counter.dataset.decimals) || 0;
          animateCounter(counter, target, 1400, prefix, suffix, decimals);
        });

        // Trigger individual counters if they also have data-animate
        if (e.target.hasAttribute('data-counter')) {
          const target = parseFloat(e.target.dataset.counter);
          const prefix = e.target.dataset.prefix || '';
          const suffix = e.target.dataset.suffix || '';
          const decimals = parseInt(e.target.dataset.decimals) || 0;
          animateCounter(e.target, target, 1400, prefix, suffix, decimals);
        }

        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  $$('[data-animate], [data-counter]').forEach(el => {
    if (el.dataset.delay) {
      el.style.setProperty('--delay', `${el.dataset.delay}ms`);
    }
    observer.observe(el);
  });
}

// Global reveal trigger
const visObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

/* ----------------------------------------------------------------
   TIME UTILITIES
   ---------------------------------------------------------------- */
function getTimeString() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

function formatCurrency(amount) {
  return CS.config.currency + amount.toLocaleString('en-IN');
}

function elapsedLabel(mins) {
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

/* ----------------------------------------------------------------
   LIVE CLOCK
   ---------------------------------------------------------------- */
function initClock(selector) {
  const el = $(selector);
  if (!el) return;
  const tick = () => { el.textContent = getTimeString(); };
  tick();
  setInterval(tick, 1000);
}

/* ----------------------------------------------------------------
   KDS ELAPSED TIMER UPDATER
   ---------------------------------------------------------------- */
function startKDSTimers() {
  setInterval(() => {
    $$('.kds-order').forEach(card => {
      const elapsedEl = card.querySelector('.kds-elapsed');
      if (!elapsedEl) return;
      let mins = parseInt(card.dataset.elapsed) || 0;
      mins++;
      card.dataset.elapsed = mins;
      elapsedEl.textContent = `${mins}m`;

      // Escalation
      card.classList.remove('normal', 'warning', 'critical');
      if (mins >= 20) {
        card.classList.add('critical');
        card.querySelector('.kds-status-text').textContent = 'CRITICAL';
      } else if (mins >= 12) {
        card.classList.add('warning');
        card.querySelector('.kds-status-text').textContent = 'DELAYED';
      } else {
        card.classList.add('normal');
        card.querySelector('.kds-status-text').textContent = 'PREPARING';
      }
    });
  }, 60000); // per minute in real app; for demo inject faster
}

/* ----------------------------------------------------------------
   SVG MINI SPARKLINE
   ---------------------------------------------------------------- */
function createSparkline(data, color = 'var(--color-primary)', width = 80, height = 30) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

/* ----------------------------------------------------------------
   CHART — Simple Bar Chart (Canvas-free)
   ---------------------------------------------------------------- */
function renderBarChart(container, data, options = {}) {
  const { labelKey = 'label', valueKey = 'value', color = 'var(--color-primary)' } = options;
  const max = Math.max(...data.map(d => d[valueKey]));
  container.innerHTML = '';
  const wrap = createElement('div', { style: 'display:flex;align-items:flex-end;gap:6px;height:100%;width:100%;' });
  data.forEach((d, i) => {
    const pct = max > 0 ? (d[valueKey] / max) * 100 : 0;
    const col = createElement('div', { style: 'flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;' });
    col.innerHTML = `
      <div style="font-size:10px;color:var(--text-muted);">${formatCurrency(d[valueKey]).replace('₹', '')}</div>
      <div class="chart-bar" style="width:100%;height:${pct}%;min-height:4px;animation:fill-bar 0.8s ${i * 0.08}s ease backwards;--fill-target:${pct}%;background:${color};" title="${d[labelKey]}: ${d[valueKey]}"></div>
      <div style="font-size:10px;color:var(--text-muted);">${d[labelKey]}</div>
    `;
    wrap.appendChild(col);
  });
  container.appendChild(wrap);
}

/* ----------------------------------------------------------------
   DONUT CHART (CSS-based)
   ---------------------------------------------------------------- */
function createDonut(percentage, color, size = 80) {
  const deg = (percentage / 100) * 360;
  return `
    <div style="width:${size}px;height:${size}px;border-radius:50%;background:conic-gradient(${color} 0deg ${deg}deg, var(--color-base-600) ${deg}deg 360deg);display:flex;align-items:center;justify-content:center;position:relative;">
      <div style="width:${size - 18}px;height:${size - 18}px;border-radius:50%;background:var(--color-base-800);display:flex;align-items:center;justify-content:center;font-size:${size / 5.5}px;font-weight:700;color:${color};">
        ${percentage}%
      </div>
    </div>
  `;
}

/* ----------------------------------------------------------------
   INIT ON DOM READY
   ---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const user = checkAuth();
  if (!user && !AUTH_REDIRECT_EXEMPT.includes(window.location.pathname.split('/').pop() || 'index.html')) return;

  buildNav();
  initClock('#live-clock');
  initScrollAnimations();
});

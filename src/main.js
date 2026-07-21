// Amra's Studio — SPA Router & Global State
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHome } from './pages/home.js';
import { renderShop } from './pages/shop.js';
import { renderProductDetail } from './pages/product-detail.js';
import { renderCustomOrder } from './pages/custom-order.js';
import { renderAbout } from './pages/about.js';
import { renderCart } from './pages/cart.js';
import { renderCheckout } from './pages/checkout.js';
import { renderFaq } from './pages/faq.js';
import { renderPolicies } from './pages/policies.js';
import { renderContact } from './pages/contact.js';
import { renderAdminLogin } from './pages/admin-login.js';
import { renderAdminDashboard } from './pages/admin-dashboard.js';


// ---- Global State ----
export const state = {
  cart: JSON.parse(localStorage.getItem('amras_cart') || '[]'),
  admin: null,
};

export function saveCart() {
  localStorage.setItem('amras_cart', JSON.stringify(state.cart));
  updateCartBadge();
}

export function addToCart(product, qty = 1, customizations = {}) {
  const existing = state.cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({ ...product, qty, customizations });
  }
  saveCart();
  showToast(`${product.name} added to cart!`);
}

export function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCart();
}

export function updateCartQty(productId, qty) {
  const item = state.cart.find(i => i.id === productId);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart();
  }
}

export function getCartTotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function getCartCount() {
  return state.cart.reduce((sum, item) => sum + item.qty, 0);
}

export function updateCartBadge() {
  const badge = document.querySelector('.nav-cart-badge');
  if (badge) {
    const count = getCartCount();
    badge.textContent = count;
    badge.classList.toggle('show', count > 0);
  }
}

// ---- Toast ----
export function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

import { db } from './lib/store.js';

// ---- Admin Auth & Data Helpers (Pure Frontend LocalStorage-based via unified db store) ----
export function getAdminProfile() {
  return db.getAdminProfile();
}

export function getAdminCredentials() {
  return db.getCredentials();
}

export function isAdminLoggedIn() {
  return sessionStorage.getItem('amras_admin_logged_in') === 'true';
}

export async function loginAdmin(email, password) {
  const success = await db.verifyLogin(email, password);
  if (success) {
    sessionStorage.setItem('amras_admin_logged_in', 'true');
    const profile = db.getAdminProfile();
    state.admin = { ...profile, loggedIn: true };
    return true;
  }
  return false;
}

export function logoutAdmin() {
  sessionStorage.removeItem('amras_admin_logged_in');
  state.admin = null;
  navigate('hidden-admin-gateway');
}

export async function updateAdminCredentials(currentPassword, newEmail, newPassword, displayName) {
  return db.changeCredentials(currentPassword, newEmail, newPassword, displayName);
}

export function verifyAdminWhatsAppReset(phone) {
  return db.verifyWhatsAppReset(phone);
}

export async function resetAdminPassword(email, newPassword) {
  return db.resetPassword(email, newPassword);
}

export function getInquiriesFromStorage() {
  return db.getInquiries();
}

export function saveInquiryToStorage(inqData) {
  return db.addInquiry(inqData);
}

export function updateInquiryStatusInStorage(id, status, notes) {
  return db.updateInquiryStatus(id, status, notes);
}

export function getStoreSettingsFromStorage() {
  return db.getSettings();
}

export function saveStoreSettingsToStorage(settings) {
  db.saveSettings(settings);
}

function restoreAdminSession() {
  if (isAdminLoggedIn()) {
    const profile = db.getAdminProfile();
    if (profile) {
      state.admin = { ...profile, loggedIn: true };
    }
  }
}

// ---- Router ----
const routes = {
  'home': renderHome,
  'shop': renderShop,
  'product': renderProductDetail,
  'custom-order': renderCustomOrder,
  'about': renderAbout,
  'cart': renderCart,
  'checkout': renderCheckout,
  'faq': renderFaq,
  'policies': renderPolicies,
  'contact': renderContact,
  'hidden-admin-gateway': renderAdminLogin,
  'admin-dashboard': renderAdminDashboard,
};

export function navigate(route) {
  window.location.hash = route;
}

function getRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  const parts = hash.split('/');
  return { page: parts[0], param: parts[1] || null };
}

function renderPage() {
  const { page, param } = getRoute();
  const mainContent = document.getElementById('main-content');

  // Hide storefront navbar/footer on admin routes
  const isAdminRoute = page === 'admin-dashboard' || page === 'hidden-admin-gateway';
  const navbarEl = document.getElementById('navbar');
  const footerEl = document.getElementById('footer');
  if (navbarEl) navbarEl.style.display = isAdminRoute ? 'none' : 'block';
  if (footerEl) footerEl.style.display = isAdminRoute ? 'none' : 'block';

  // Fade out
  mainContent.style.opacity = '0';
  mainContent.style.transform = 'translateY(10px)';

  setTimeout(() => {
    // Guard admin dashboard
    if (page === 'admin-dashboard' && !isAdminLoggedIn()) {
      mainContent.innerHTML = routes['hidden-admin-gateway']();
    } else if (routes[page]) {
      mainContent.innerHTML = routes[page](param);
    } else {
      mainContent.innerHTML = `
        <div class="page-header">
          <div class="container">
            <h1>Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
          </div>
        </div>
        <div class="section">
          <div class="container text-center">
            <a href="#home" class="btn btn-primary">Back to Home</a>
          </div>
        </div>
      `;
    }

    // Fade in
    mainContent.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    mainContent.style.opacity = '1';
    mainContent.style.transform = 'translateY(0)';

    // Reset transform after animation so fixed elements (e.g. admin mobile nav) anchor to viewport
    setTimeout(() => {
      if (mainContent.style.transform === 'translateY(0px)' || mainContent.style.transform === 'translateY(0)') {
        mainContent.style.transform = 'none';
      }
    }, 450);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('active', href === `#${page}`);
    });

    // Bind page-specific events
    bindPageEvents(page, param);
  }, 200);
}

function bindPageEvents(page, param) {
  const liveProducts = db.getProducts();

  // Card qty minus
  document.querySelectorAll('[data-card-qty-minus]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.cardQtyMinus;
      const valEl = document.querySelector(`.card-qty-value[data-card-qty-value="${id}"]`);
      if (valEl) {
        let val = parseInt(valEl.textContent) || 1;
        valEl.textContent = Math.max(1, val - 1);
      }
    });
  });

  // Card qty plus
  document.querySelectorAll('[data-card-qty-plus]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.cardQtyPlus;
      const valEl = document.querySelector(`.card-qty-value[data-card-qty-value="${id}"]`);
      if (valEl) {
        let val = parseInt(valEl.textContent) || 1;
        valEl.textContent = val + 1;
      }
    });
  });

  // Generic: product card clicks
  document.querySelectorAll('[data-product-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('[data-add-to-cart]') && !e.target.closest('.card-qty-btn')) {
        navigate(`product/${card.dataset.productId}`);
      }
    });
  });

  // Generic: add-to-cart buttons
  document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.addToCart);
      const product = liveProducts.find(p => p.id === id);
      if (product) {
        const qtyEl = document.querySelector(`.card-qty-value[data-card-qty-value="${id}"]`);
        const qty = qtyEl ? parseInt(qtyEl.textContent) || 1 : 1;
        addToCart(product, qty);
        if (qtyEl) qtyEl.textContent = '1';
      }
    });
  });
}

// ---- Initialize ----
function init() {
  // Render navbar & footer
  document.getElementById('navbar').innerHTML = renderNavbar();
  document.getElementById('footer').innerHTML = renderFooter();

  // Bind navbar events
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.mobile-overlay');

  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      overlay?.classList.toggle('show');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  // Close mobile menu on nav link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle?.classList.remove('open');
      navLinks?.classList.remove('open');
      overlay?.classList.remove('show');
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Restore admin session from sessionStorage
  restoreAdminSession();

  // Cart badge
  updateCartBadge();

  // Initial route render
  renderPage();

  // Listen for hash changes
  window.addEventListener('hashchange', renderPage);
}

document.addEventListener('DOMContentLoaded', init);

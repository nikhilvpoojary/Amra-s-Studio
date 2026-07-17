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
import { products } from './data/products.js';


// ---- Global State ----
export const state = {
  cart: JSON.parse(localStorage.getItem('amras_cart') || '[]'),
  admin: JSON.parse(localStorage.getItem('amras_admin') || 'null'),
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

// ---- Admin Auth ----
export function loginAdmin(password) {
  // Simple password check — in production use server-side auth
  const ADMIN_PASSWORD = 'amra2025';
  if (password === ADMIN_PASSWORD) {
    state.admin = { email: 'amrasstudio.co@gmail.com', loggedIn: true, loginTime: Date.now() };
    localStorage.setItem('amras_admin', JSON.stringify(state.admin));
    return true;
  }
  return false;
}

export function logoutAdmin() {
  state.admin = null;
  localStorage.removeItem('amras_admin');
  navigate('home');
}

export function isAdminLoggedIn() {
  return state.admin && state.admin.loggedIn;
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
  // Generic: product card clicks
  document.querySelectorAll('[data-product-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.btn')) {
        navigate(`product/${card.dataset.productId}`);
      }
    });
  });

  // Generic: add-to-cart buttons
  document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.addToCart);
      const product = products.find(p => p.id === id);
      if (product) addToCart(product);
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

  // Cart badge
  updateCartBadge();

  // Initial route render
  renderPage();

  // Listen for hash changes
  window.addEventListener('hashchange', renderPage);
}

document.addEventListener('DOMContentLoaded', init);

// Admin Dashboard — 4-Tab Sidebar Layout (LocalStorage version)
// Tabs: Dashboard Stats, Product Catalog, Inquiries Logs, Store Settings
import {
  logoutAdmin, showToast, getAdminProfile,
  getInquiriesFromStorage, updateInquiryStatusInStorage,
  getStoreSettingsFromStorage, saveStoreSettingsToStorage,
  updateAdminCredentials, getAdminCredentials
} from '../main.js';
import { products, saveProductsToStorage } from '../data/products.js';

// ---- Admin Panel State ----
let adminState = {
  activeTab: 'dashboard',
  products: [],
  inquiries: [],
  settings: {},
  profile: { email: '', displayName: 'Admin' },
  loading: true
};

// ---- Main Render (Shell Layout) ----
export function renderAdminDashboard() {
  const profile = getAdminProfile();
  if (profile) {
    adminState.profile = profile;
  }

  // Schedule init after DOM injection
  setTimeout(() => initAdminDashboard(), 50);

  return `
    <div class="admin-layout">
      <!-- Top Header Bar -->
      <header class="admin-header">
        <div class="admin-header-left" style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="/images/logo.png" alt="Logo" style="height: 32px; width: auto; object-fit: contain; filter: brightness(0) invert(1);" />
          <span class="admin-logo">Amra's Studio</span>
          <span class="admin-ops-badge">Authorized Operations Panel</span>
        </div>
        <div class="admin-header-right">
          <span class="admin-user-name">${adminState.profile.displayName || 'Admin'}</span>
          <button class="admin-logout-btn" id="admin-logout-btn">Logout</button>
          <div class="admin-nav-toggle" id="admin-nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <!-- Mobile navigation overlay -->
      <div class="admin-mobile-overlay" id="admin-mobile-overlay"></div>

      <!-- Body: Sidebar + Main -->
      <div class="admin-body">
        <!-- Left Sidebar / Drawer -->
        <aside class="admin-sidebar" id="admin-sidebar">
          <div class="admin-sidebar-label">CONTROLS</div>
          <nav class="admin-nav">
            <a class="admin-nav-item active" data-tab="dashboard">
              <span class="nav-icon">
                <svg class="admin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="10" rx="1" />
                  <rect width="7" height="5" x="3" y="14" rx="1" />
                </svg>
              </span> Dashboard Stats
            </a>
            <a class="admin-nav-item" data-tab="products">
              <span class="nav-icon">
                <svg class="admin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5V19A9 3 0 0 0 21 19V5" />
                  <path d="M3 12A9 3 0 0 0 21 12" />
                </svg>
              </span> Product Catalog
            </a>
            <a class="admin-nav-item" data-tab="inquiries">
              <span class="nav-icon">
                <svg class="admin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <path d="M9 12h6" />
                  <path d="M9 16h6" />
                  <path d="M9 8h6" />
                </svg>
              </span> Inquiries Logs
              <span class="admin-nav-badge" id="inquiry-count-badge" style="display:none;">0 new</span>
            </a>
            <a class="admin-nav-item" data-tab="settings">
              <span class="nav-icon">
                <svg class="admin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span> Store Settings
            </a>
            <!-- Mobile-only Logout item -->
            <a class="admin-nav-item admin-mobile-logout" id="admin-mobile-logout-btn">
              <span class="nav-icon">
                <svg class="admin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </span> Logout
            </a>
          </nav>
          <div class="admin-ops-card">
            <h4>⚡ Operations Mode</h4>
            <p>Changes persist and reflect immediately on the storefront. All edits are saved in browser storage.</p>
          </div>
        </aside>

        <!-- Main Content Area -->
        <div class="admin-main" id="admin-tab-content">
          <div class="admin-loading">
            <div class="admin-spinner"></div>
            Loading dashboard data...
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---- Initialize: Fetch Data & Render First Tab ----
function initAdminDashboard() {
  try {
    adminState.loading = true;

    // Load local storage / in-memory data
    adminState.products = products;
    adminState.inquiries = getInquiriesFromStorage();
    adminState.settings = getStoreSettingsFromStorage() || {};

    adminState.loading = false;

    // Update pending count badge
    updatePendingBadge();

    // Render active tab
    renderActiveTab();
  } catch (err) {
    console.error('Failed to load admin data:', err);
    adminState.loading = false;
    const content = document.getElementById('admin-tab-content');
    if (content) {
      content.innerHTML = `<div class="admin-empty"><div class="admin-empty-icon">⚠️</div><div class="admin-empty-text">Failed to load local settings.</div></div>`;
    }
  }
}

function updatePendingBadge() {
  const pending = adminState.inquiries.filter(i => i.status === 'Pending').length;
  const badge = document.getElementById('inquiry-count-badge');
  if (badge) {
    if (pending > 0) {
      badge.textContent = `${pending} new`;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }
}

function renderActiveTab() {
  const content = document.getElementById('admin-tab-content');
  if (!content) return;

  switch (adminState.activeTab) {
    case 'dashboard': content.innerHTML = renderDashboardTab(); break;
    case 'products': content.innerHTML = renderProductsTab(); break;
    case 'inquiries': content.innerHTML = renderInquiriesTab(); break;
    case 'settings': content.innerHTML = renderSettingsTab(); break;
  }

  // Update active nav state
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === adminState.activeTab);
  });
}

// ============================================
// TAB 1: DASHBOARD STATS
// ============================================
function renderDashboardTab() {
  const totalInquiries = adminState.inquiries.length;
  const pendingInquiries = adminState.inquiries.filter(i => i.status === 'Pending').length;
  const totalProducts = adminState.products.length;
  const outOfStock = adminState.products.filter(p => !p.inStock).length;
  const whatsapp = adminState.settings.whatsapp || 'N/A';

  // Latest 5 inquiries for the table
  const latest = adminState.inquiries.slice(0, 5);

  return `
    <h2>Studio Performance Overview</h2>

    <!-- Stat Cards -->
    <div class="admin-stats-grid">
      <div class="admin-stat-card">
        <div class="admin-stat-icon">📩</div>
        <div class="admin-stat-value">${totalInquiries}</div>
        <div class="admin-stat-label">Total Inquiries</div>
        <div class="admin-stat-sub">${pendingInquiries} pending action</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-icon">🛍️</div>
        <div class="admin-stat-value">${totalProducts}</div>
        <div class="admin-stat-label">Catalog Products</div>
        <div class="admin-stat-sub">Standard items</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-icon">⚠️</div>
        <div class="admin-stat-value">${outOfStock}</div>
        <div class="admin-stat-label">Out of Stock</div>
        <div class="admin-stat-sub">Require replenishment</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-icon">💬</div>
        <div class="admin-stat-value" style="font-size:1.1rem;">+${whatsapp}</div>
        <div class="admin-stat-label">Contact Destination</div>
        <div class="admin-stat-sub">WhatsApp on file</div>
      </div>
    </div>

    <!-- Latest Submissions Table -->
    <div class="admin-card">
      <div class="admin-card-body">
        <div class="admin-table-header">
          <h3>Latest Client Submissions</h3>
          <a class="admin-table-link" data-action="goto-inquiries">View All Logs →</a>
        </div>
        ${latest.length === 0 ? `
          <div class="admin-empty">
            <div class="admin-empty-icon">📭</div>
            <div class="admin-empty-text">No inquiries received yet</div>
          </div>
        ` : `
          <table class="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Bespoke Item</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${latest.map(inq => `
                <tr>
                  <td>${formatDate(inq.date)}</td>
                  <td>
                    <span class="admin-client-name">${escapeHtml(inq.name)}</span>
                    <span class="admin-client-phone">${escapeHtml(inq.phone)}</span>
                  </td>
                  <td>${escapeHtml(inq.variety || inq.description?.slice(0, 40) + '...')}</td>
                  <td><span class="admin-badge admin-badge-${statusClass(inq.status)}">${inq.status}</span></td>
                  <td><button class="admin-btn admin-btn-view" data-action="view-inquiry" data-id="${inq.id}">View</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `}
      </div>
    </div>
  `;
}

// ============================================
// TAB 2: PRODUCT CATALOG
// ============================================
function renderProductsTab() {
  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
      <h2 style="margin-bottom:0;">Product Catalog</h2>
      <button class="admin-btn admin-btn-primary" data-action="add-product" style="padding:0.5rem 1.25rem; font-size:0.85rem;">+ Add New Product</button>
    </div>

    <div class="admin-card">
      ${adminState.products.length === 0 ? `
        <div class="admin-card-body">
          <div class="admin-empty">
            <div class="admin-empty-icon">📦</div>
            <div class="admin-empty-text">No products in catalog yet</div>
          </div>
        </div>
      ` : `
        <table class="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Customizable</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${adminState.products.map(p => `
              <tr>
                <td>
                  <div class="admin-product-cell">
                    <img src="${p.images?.[0] || '/images/20260429_180635(0)(1).jpg'}" class="admin-product-thumb" alt="${escapeHtml(p.name)}" />
                    <strong>${escapeHtml(p.name)}</strong>
                  </div>
                </td>
                <td style="text-transform:capitalize;">${(p.category || '').replace(/-/g, ' ')}</td>
                <td>₹${Number(p.price).toLocaleString('en-IN')}</td>
                <td>${p.customizable ? '✅' : '—'}</td>
                <td><span class="admin-stock-badge ${p.inStock ? 'admin-stock-in' : 'admin-stock-out'}">${p.inStock ? 'In Stock' : 'Out'}</span></td>
                <td>
                  <div style="display:flex; gap:0.4rem; flex-wrap:nowrap;">
                    <button class="admin-btn admin-btn-edit" data-action="edit-product" data-id="${p.id}">Edit</button>
                    <button class="admin-btn admin-btn-delete" data-action="delete-product" data-id="${p.id}">Delete</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `}
    </div>
  `;
}

// ============================================
// TAB 3: INQUIRIES LOGS
// ============================================
function renderInquiriesTab() {
  return `
    <h2>Inquiries Logs</h2>

    <div class="admin-card">
      ${adminState.inquiries.length === 0 ? `
        <div class="admin-card-body">
          <div class="admin-empty">
            <div class="admin-empty-icon">📭</div>
            <div class="admin-empty-text">No inquiries received yet. Submissions from the Custom Order page will appear here.</div>
          </div>
        </div>
      ` : `
        <table class="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Client</th>
              <th>Bespoke Item</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${adminState.inquiries.map(inq => `
              <tr class="clickable-row" data-action="view-inquiry" data-id="${inq.id}">
                <td>${formatDate(inq.date)}</td>
                <td>
                  <span class="admin-client-name">${escapeHtml(inq.name)}</span>
                  <span class="admin-client-phone">${escapeHtml(inq.phone)}</span>
                </td>
                <td>${escapeHtml(inq.variety || inq.description?.slice(0, 50) + '...')}</td>
                <td>
                  <select class="admin-status-select" data-inquiry-id="${inq.id}" style="padding:0.25rem 0.5rem; border-radius:6px; border:1px solid #e0d4c4; font-size:0.75rem; font-weight:600; background:${statusBg(inq.status)}; cursor:pointer;">
                    <option value="Pending" ${inq.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="In Progress" ${inq.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${inq.status === 'Completed' ? 'selected' : ''}>Completed</option>
                  </select>
                </td>
                <td><button class="admin-btn admin-btn-view" data-action="view-inquiry" data-id="${inq.id}">View</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `}
    </div>
  `;
}

// ============================================
// TAB 4: STORE SETTINGS
// ============================================
function renderSettingsTab() {
  const s = adminState.settings;
  const p = adminState.profile;
  const creds = getAdminCredentials() || {};

  return `
    <h2>Store Settings</h2>

    <!-- Store Information -->
    <div class="admin-settings-section">
      <h3>📍 Store Information</h3>
      <form id="store-settings-form">
        <div class="admin-form-row">
          <div class="admin-form-group">
            <label class="admin-form-label">WhatsApp Number</label>
            <input type="text" class="admin-form-input" id="setting-whatsapp" value="${escapeHtml(s.whatsapp || '')}" placeholder="e.g. 917387920392" />
            <div class="admin-form-hint">Include country code, no + or spaces</div>
          </div>
          <div class="admin-form-group">
            <label class="admin-form-label">Business Email</label>
            <input type="email" class="admin-form-input" id="setting-email" value="${escapeHtml(s.email || '')}" placeholder="e.g. studio@example.com" />
          </div>
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Business Address</label>
          <input type="text" class="admin-form-input" id="setting-address" value="${escapeHtml(s.address || '')}" placeholder="e.g. Margao, Goa, India" />
        </div>
        <div class="admin-form-row">
          <div class="admin-form-group">
            <label class="admin-form-label">Instagram URL</label>
            <input type="url" class="admin-form-input" id="setting-instagram" value="${escapeHtml(s.instagram || '')}" placeholder="https://instagram.com/..." />
          </div>
          <div class="admin-form-group">
            <label class="admin-form-label">YouTube URL</label>
            <input type="url" class="admin-form-input" id="setting-youtube" value="${escapeHtml(s.youtube || '')}" placeholder="https://youtube.com/..." />
          </div>
        </div>
        <button type="submit" class="admin-btn admin-btn-save">Save Store Settings</button>
      </form>
    </div>
  `;
}

// ============================================
// MODALS
// ============================================
function showInquiryModal(inquiry) {
  const existing = document.querySelector('.admin-modal-overlay');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.className = 'admin-modal-overlay';
  modal.innerHTML = `
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h3>Inquiry #${inquiry.id} — ${escapeHtml(inquiry.name)}</h3>
        <button class="admin-modal-close" data-action="close-modal">✕</button>
      </div>
      <div class="admin-modal-body">
        <div class="admin-detail-row">
          <span class="admin-detail-label">Date</span>
          <span class="admin-detail-value">${new Date(inquiry.date).toLocaleString()}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-label">Client Name</span>
          <span class="admin-detail-value">${escapeHtml(inquiry.name)}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-label">Phone</span>
          <span class="admin-detail-value">${escapeHtml(inquiry.phone)}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-label">Email</span>
          <span class="admin-detail-value">${escapeHtml(inquiry.email || 'N/A')}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-label">Flower Type</span>
          <span class="admin-detail-value">${escapeHtml(inquiry.variety || 'Any')}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-label">Budget/Size</span>
          <span class="admin-detail-value">${escapeHtml(inquiry.budget || 'Standard')}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-label">Enhancements</span>
          <span class="admin-detail-value">${
            inquiry.enhancements
              ? Object.entries(inquiry.enhancements).filter(([,v]) => v).map(([k]) => k).join(', ') || 'None'
              : 'None'
          }</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-label">Description</span>
          <span class="admin-detail-value">${escapeHtml(inquiry.description || '')}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-label">Status</span>
          <span class="admin-detail-value"><span class="admin-badge admin-badge-${statusClass(inquiry.status)}">${inquiry.status}</span></span>
        </div>
        ${inquiry.referenceImage ? `
          <div class="admin-detail-row" style="flex-direction:column;">
            <span class="admin-detail-label">Reference Photo</span>
            <img src="${inquiry.referenceImage}" class="admin-detail-image" alt="Reference" />
          </div>
        ` : ''}
        ${inquiry.notes ? `
          <div class="admin-detail-row">
            <span class="admin-detail-label">Admin Notes</span>
            <span class="admin-detail-value">${escapeHtml(inquiry.notes)}</span>
          </div>
        ` : ''}
      </div>
      <div class="admin-modal-footer">
        <button class="admin-btn admin-btn-view" data-action="close-modal">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function showProductModal(product = null) {
  const existing = document.querySelector('.admin-modal-overlay');
  if (existing) existing.remove();

  const isEdit = !!product;
  const title = isEdit ? `Edit: ${product.name}` : 'Add New Product';

  const modal = document.createElement('div');
  modal.className = 'admin-modal-overlay';
  modal.innerHTML = `
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h3>${title}</h3>
        <button class="admin-modal-close" data-action="close-modal">✕</button>
      </div>
      <div class="admin-modal-body">
        <form id="product-modal-form">
          <input type="hidden" id="pm-id" value="${product?.id || ''}" />
          <div class="admin-form-group">
            <label class="admin-form-label">Product Name *</label>
            <input type="text" class="admin-form-input" id="pm-name" required value="${escapeHtml(product?.name || '')}" placeholder="e.g. Lavender Dream Bouquet" />
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Category *</label>
              <select class="admin-form-select" id="pm-category" required>
                <option value="bouquets" ${product?.category === 'bouquets' ? 'selected' : ''}>Bouquets</option>
                <option value="single-flowers" ${product?.category === 'single-flowers' ? 'selected' : ''}>Single Flowers</option>
                <option value="bridal" ${product?.category === 'bridal' ? 'selected' : ''}>Bridal</option>
                <option value="baskets" ${product?.category === 'baskets' ? 'selected' : ''}>Baskets</option>
                <option value="lamps" ${product?.category === 'lamps' ? 'selected' : ''}>Lamps</option>
                <option value="gift-sets" ${product?.category === 'gift-sets' ? 'selected' : ''}>Gift Sets</option>
                <option value="custom" ${product?.category === 'custom' ? 'selected' : ''}>Custom</option>
              </select>
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Price (₹) *</label>
              <input type="number" class="admin-form-input" id="pm-price" required value="${product?.price || ''}" placeholder="999" min="1" />
            </div>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Original Price (₹)</label>
              <input type="number" class="admin-form-input" id="pm-original-price" value="${product?.originalPrice || ''}" placeholder="Optional strikethrough price" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Badge</label>
              <select class="admin-form-select" id="pm-badge">
                <option value="" ${!product?.badge ? 'selected' : ''}>None</option>
                <option value="New" ${product?.badge === 'New' ? 'selected' : ''}>New</option>
                <option value="Bestseller" ${product?.badge === 'Bestseller' ? 'selected' : ''}>Bestseller</option>
                <option value="Premium" ${product?.badge === 'Premium' ? 'selected' : ''}>Premium</option>
                <option value="Sale" ${product?.badge === 'Sale' ? 'selected' : ''}>Sale</option>
              </select>
            </div>
          </div>
          <div class="admin-form-group">
            <label class="admin-form-label">Description</label>
            <textarea class="admin-form-textarea" id="pm-description" placeholder="Describe this product...">${escapeHtml(product?.description || '')}</textarea>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Image Path</label>
              <div style="display:flex; gap:0.5rem; align-items:center;">
                <input type="text" class="admin-form-input" id="pm-image" value="${product?.images?.[0] || '/images/20260429_180635(0)(1).jpg'}" placeholder="/images/filename.jpg" style="flex: 1;" />
                <label class="admin-btn admin-btn-view" style="margin: 0; padding: 0.6rem 1rem; font-size: 0.8rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 0.3rem; white-space: nowrap;">
                  📁 Browse
                  <input type="file" id="pm-image-file" accept="image/*" style="display: none;" />
                </label>
              </div>
              <div class="admin-form-hint">Path relative to public folder, or click Browse to upload</div>
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Flowers (comma separated)</label>
              <input type="text" class="admin-form-input" id="pm-flowers" value="${(product?.flowers || []).join(', ')}" placeholder="Roses, Tulips, Lilies" />
            </div>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group" style="display:flex; align-items:center; gap:0.75rem; padding-top:1.5rem;">
              <label class="admin-toggle">
                <input type="checkbox" id="pm-customizable" ${product?.customizable !== false ? 'checked' : ''} />
                <span class="admin-toggle-slider"></span>
              </label>
              <span style="font-size:0.85rem; font-weight:500;">Customizable</span>
            </div>
            <div class="admin-form-group" style="display:flex; align-items:center; gap:0.75rem; padding-top:1.5rem;">
              <label class="admin-toggle">
                <input type="checkbox" id="pm-in-stock" ${product?.inStock !== false ? 'checked' : ''} />
                <span class="admin-toggle-slider"></span>
              </label>
              <span style="font-size:0.85rem; font-weight:500;">In Stock</span>
            </div>
          </div>
        </form>
      </div>
      <div class="admin-modal-footer">
        <button class="admin-btn admin-btn-view" data-action="close-modal">Cancel</button>
        <button class="admin-btn admin-btn-primary" data-action="save-product">${isEdit ? 'Save Changes' : 'Create Product'}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// ============================================
// EVENT HANDLERS (Delegated)
// ============================================
document.addEventListener('click', (e) => {
  const action = e.target.dataset?.action;
  const target = e.target.closest('[data-action]');
  const resolvedAction = action || target?.dataset?.action;

  // Admin Logout
  if (e.target.id === 'admin-logout-btn' || e.target.id === 'admin-mobile-logout-btn' || e.target.closest('#admin-mobile-logout-btn')) {
    logoutAdmin();
    return;
  }

  // Toggle admin mobile sidebar
  const toggleBtn = e.target.closest('#admin-nav-toggle');
  if (toggleBtn) {
    const sidebar = document.getElementById('admin-sidebar');
    const overlay = document.getElementById('admin-mobile-overlay');
    if (sidebar && overlay) {
      const isOpen = sidebar.classList.toggle('open');
      toggleBtn.classList.toggle('open', isOpen);
      overlay.classList.toggle('show', isOpen);
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return;
  }

  // Click overlay to close mobile sidebar
  if (e.target.id === 'admin-mobile-overlay') {
    const sidebar = document.getElementById('admin-sidebar');
    const toggleBtn = document.getElementById('admin-nav-toggle');
    const overlay = document.getElementById('admin-mobile-overlay');
    if (sidebar && toggleBtn && overlay) {
      sidebar.classList.remove('open');
      toggleBtn.classList.remove('open');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
    return;
  }

  // Tab navigation
  const navItem = e.target.closest('.admin-nav-item');
  if (navItem && navItem.dataset.tab) {
    adminState.activeTab = navItem.dataset.tab;
    renderActiveTab();

    // Close sidebar on mobile
    const sidebar = document.getElementById('admin-sidebar');
    const toggleBtn = document.getElementById('admin-nav-toggle');
    const overlay = document.getElementById('admin-mobile-overlay');
    if (sidebar && toggleBtn && overlay) {
      sidebar.classList.remove('open');
      toggleBtn.classList.remove('open');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
    return;
  }

  // Close modal
  if (resolvedAction === 'close-modal' || e.target.classList.contains('admin-modal-overlay')) {
    const overlay = document.querySelector('.admin-modal-overlay');
    if (overlay) overlay.remove();
    return;
  }

  // Go to inquiries tab
  if (resolvedAction === 'goto-inquiries') {
    adminState.activeTab = 'inquiries';
    renderActiveTab();
    return;
  }

  // View inquiry detail
  if (resolvedAction === 'view-inquiry') {
    const id = parseInt(e.target.dataset?.id || target?.dataset?.id);
    const inquiry = adminState.inquiries.find(i => i.id === id);
    if (inquiry) showInquiryModal(inquiry);
    return;
  }

  // Add product
  if (resolvedAction === 'add-product') {
    showProductModal(null);
    return;
  }

  // Edit product
  if (resolvedAction === 'edit-product') {
    const id = parseInt(e.target.dataset?.id || target?.dataset?.id);
    const product = adminState.products.find(p => p.id === id);
    if (product) showProductModal(product);
    return;
  }

  // Delete product
  if (resolvedAction === 'delete-product') {
    const id = parseInt(e.target.dataset?.id || target?.dataset?.id);
    const product = adminState.products.find(p => p.id === id);
    if (product && confirm(`Delete "${product.name}"? This cannot be undone.`)) {
      deleteProduct(id);
    }
    return;
  }

  // Save product (from modal)
  if (resolvedAction === 'save-product') {
    saveProduct();
    return;
  }
});

// Change events
document.addEventListener('change', (e) => {
  // Status select change
  if (e.target.classList.contains('admin-status-select')) {
    const id = parseInt(e.target.dataset.inquiryId);
    const newStatus = e.target.value;
    updateInquiryStatus(id, newStatus);
    e.target.style.background = statusBg(newStatus);
  }

  // Handle local image file upload
  if (e.target.id === 'pm-image-file') {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const textInput = document.getElementById('pm-image');
        if (textInput) {
          textInput.value = event.target.result;
          showToast('Image loaded successfully from device!');
        }
      };
      reader.readAsDataURL(file);
    }
  }
});

// Form submissions
document.addEventListener('submit', (e) => {
  // Store settings form
  if (e.target.id === 'store-settings-form') {
    e.preventDefault();
    saveStoreSettings();
    return;
  }

  // Product modal form (catch Enter key)
  if (e.target.id === 'product-modal-form') {
    e.preventDefault();
    saveProduct();
    return;
  }
});

// ============================================
// LOCAL STORAGE ACTIONS
// ============================================
function deleteProduct(id) {
  try {
    adminState.products = adminState.products.filter(p => p.id !== id);
    saveProductsToStorage(adminState.products);
    showToast('Product deleted successfully');
    renderActiveTab();
  } catch (err) {
    showToast('Error deleting product');
  }
}

function saveProduct() {
  const id = document.getElementById('pm-id')?.value;
  const name = document.getElementById('pm-name')?.value;
  const category = document.getElementById('pm-category')?.value;
  const price = document.getElementById('pm-price')?.value;
  const originalPrice = document.getElementById('pm-original-price')?.value;
  const badge = document.getElementById('pm-badge')?.value;
  const description = document.getElementById('pm-description')?.value;
  const image = document.getElementById('pm-image')?.value;
  const flowers = document.getElementById('pm-flowers')?.value?.split(',').map(f => f.trim()).filter(Boolean);
  const customizable = document.getElementById('pm-customizable')?.checked;
  const inStock = document.getElementById('pm-in-stock')?.checked;

  if (!name || !category || !price) {
    showToast('Name, category, and price are required');
    return;
  }

  const updatedProduct = {
    name, category, price: Number(price), description,
    images: [image || '/images/20260429_180635(0)(1).jpg'],
    flowers: flowers?.length ? flowers : ['Mixed'],
    customizable, inStock,
    badge: badge || undefined,
    originalPrice: originalPrice ? Number(originalPrice) : undefined
  };

  try {
    if (id) {
      // Edit existing
      const pId = parseInt(id);
      const idx = adminState.products.findIndex(p => p.id === pId);
      if (idx !== -1) {
        adminState.products[idx] = { ...adminState.products[idx], ...updatedProduct, id: pId };
      }
    } else {
      // Create new
      const nextId = adminState.products.length > 0 ? Math.max(...adminState.products.map(p => p.id)) + 1 : 1;
      adminState.products.push({ ...updatedProduct, id: nextId });
    }

    saveProductsToStorage(adminState.products);
    showToast(id ? 'Product updated!' : 'Product created!');
    const overlay = document.querySelector('.admin-modal-overlay');
    if (overlay) overlay.remove();
    renderActiveTab();
  } catch (err) {
    showToast('Error saving product');
  }
}

function updateInquiryStatus(id, status) {
  try {
    const updated = updateInquiryStatusInStorage(id, status);
    if (updated) {
      const idx = adminState.inquiries.findIndex(i => i.id === id);
      if (idx !== -1) adminState.inquiries[idx] = updated;
      updatePendingBadge();
      showToast(`Status updated to "${status}"`);
    } else {
      showToast('Failed to update status');
    }
  } catch (err) {
    showToast('Error updating status');
  }
}

function saveStoreSettings() {
  const data = {
    whatsapp: document.getElementById('setting-whatsapp')?.value || '',
    email: document.getElementById('setting-email')?.value || '',
    address: document.getElementById('setting-address')?.value || '',
    instagram: document.getElementById('setting-instagram')?.value || '',
    youtube: document.getElementById('setting-youtube')?.value || ''
  };

  try {
    saveStoreSettingsToStorage(data);
    adminState.settings = data;
    showToast('Store settings saved!');
  } catch (err) {
    showToast('Error saving settings');
  }
}

// ============================================
// UTILITIES
// ============================================
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function statusClass(status) {
  if (status === 'Pending') return 'pending';
  if (status === 'In Progress') return 'progress';
  if (status === 'Completed') return 'completed';
  return 'pending';
}

function statusBg(status) {
  if (status === 'Pending') return '#F6EAD4';
  if (status === 'In Progress') return '#dde0bb';
  if (status === 'Completed') return '#e8d4d7';
  return '#F6EAD4';
}

import { logoutAdmin, state, showToast } from '../main.js';
import { products } from '../data/products.js';

export function renderAdminDashboard() {
  return `
    <div class="page-header" style="background: linear-gradient(135deg, var(--color-savory-sage), var(--color-avocado-smoothie)); color: white;">
      <div class="container" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:var(--space-md);">
        <div style="text-align:left;">
          <span class="section-subtitle" style="color:var(--color-coconut-cream);">Operational Dashboard</span>
          <h1 style="color:white;">Merchant Control Panel</h1>
          <p style="color:rgba(255,255,255,0.85); margin:0;">Logged in as: ${state.admin?.email || 'Admin'}</p>
        </div>
        <button id="admin-logout-btn" class="btn btn-secondary btn-sm" style="color:white; border-color:white;">Sign Out</button>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <!-- Stats Row -->
        <div class="grid grid-3" style="margin-bottom:var(--space-3xl);">
          <div class="admin-stat-card">
            <div class="admin-stat-value">${products.length}</div>
            <div class="admin-stat-label">Catalog Products</div>
          </div>
          <div class="admin-stat-card" style="border-left-color:var(--color-savory-sage);">
            <div class="admin-stat-value">₹12,450</div>
            <div class="admin-stat-label">Mock Sales (Today)</div>
          </div>
          <div class="admin-stat-card" style="border-left-color:var(--accent-secondary);">
            <div class="admin-stat-value">4</div>
            <div class="admin-stat-label">Pending Inquiries</div>
          </div>
        </div>

        <div class="grid" style="grid-template-columns: 2fr 1fr; gap:var(--space-2xl); align-items: start;">
          <!-- Product Inventory List -->
          <div style="background:var(--bg-card); border-radius:var(--radius-lg); padding:var(--space-xl); box-shadow:var(--shadow-sm);">
            <h3 style="margin-bottom:var(--space-lg); font-size:var(--fs-xl);">Product Inventory Management</h3>
            
            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:var(--fs-sm); text-align:left;">
                <thead>
                  <tr style="border-bottom:2px solid var(--border-color); color:var(--text-secondary);">
                    <th style="padding:10px 5px;">Product</th>
                    <th style="padding:10px 5px;">Category</th>
                    <th style="padding:10px 5px;">Price</th>
                    <th style="padding:10px 5px;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${products.map(p => `
                    <tr style="border-bottom:1px solid var(--border-light);">
                      <td style="padding:12px 5px; display:flex; align-items:center; gap:var(--space-sm);">
                        <img src="${p.images[0]}" style="width:40px; height:40px; border-radius:var(--radius-sm); object-fit:cover;" />
                        <strong>${p.name}</strong>
                      </td>
                      <td style="padding:12px 5px; text-transform:capitalize;">${p.category.replace('-', ' ')}</td>
                      <td style="padding:12px 5px;">₹${p.price.toLocaleString('en-IN')}</td>
                      <td style="padding:12px 5px;">
                        <button class="btn btn-secondary btn-sm edit-price-btn" data-id="${p.id}" style="padding:6px 12px; font-size:var(--fs-xs);">Edit Price</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Quick Add / Edit Side Panel -->
          <div style="background:var(--bg-secondary); border-radius:var(--radius-lg); padding:var(--space-xl);">
            <h3 style="margin-bottom:var(--space-lg); font-size:var(--fs-xl);">Add New Product</h3>
            <form id="admin-add-product-form">
              <div class="form-group">
                <label class="form-label">Product Name *</label>
                <input type="text" id="new-p-name" required placeholder="Lavender Arrangement" />
              </div>

              <div class="form-group">
                <label class="form-label">Category *</label>
                <select id="new-p-cat" required>
                  <option value="bouquets">Bouquets</option>
                  <option value="single-flowers">Single Flowers</option>
                  <option value="bridal">Bridal</option>
                  <option value="baskets">Baskets</option>
                  <option value="lamps">Lamps</option>
                  <option value="gift-sets">Gift Sets</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Price (₹) *</label>
                <input type="number" id="new-p-price" required placeholder="999" />
              </div>

              <div class="form-group">
                <label class="form-label">Product Description</label>
                <textarea id="new-p-desc" placeholder="Details about this handmade flower..."></textarea>
              </div>

              <button type="submit" class="btn btn-primary" style="width:100%;">Create Product Listing</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Bind admin panel interactions
document.addEventListener('click', (e) => {
  if (e.target.id === 'admin-logout-btn') {
    logoutAdmin();
  }

  // Edit price action
  if (e.target.classList.contains('edit-price-btn')) {
    const id = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === id);
    if (product) {
      const newPrice = prompt(`Enter new price for ${product.name}:`, product.price);
      if (newPrice !== null && !isNaN(newPrice)) {
        product.price = parseInt(newPrice);
        showToast(`Updated price of ${product.name} to ₹${product.price}`);
        // Force dashboard re-render
        const mainContent = document.getElementById('main-content');
        if (mainContent) mainContent.innerHTML = renderAdminDashboard();
      }
    }
  }
});

document.addEventListener('submit', (e) => {
  if (e.target.id === 'admin-add-product-form') {
    e.preventDefault();

    const name = document.getElementById('new-p-name').value;
    const category = document.getElementById('new-p-cat').value;
    const price = parseInt(document.getElementById('new-p-price').value);
    const description = document.getElementById('new-p-desc').value;

    const newId = products.length + 1;
    // Add custom mock product
    products.push({
      id: newId,
      name,
      category,
      price,
      description,
      images: ["/images/20260429_180635(0)(1).jpg"], // Default fallback image from user assets
      flowers: ["Mixed"],
      inStock: true
    });

    showToast(`Success: Created "${name}" product listing!`);
    // Reset form
    document.getElementById('admin-add-product-form').reset();
    // Re-render
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.innerHTML = renderAdminDashboard();
  }
});

// Product Detail Page
import { products } from '../data/products.js';
import { renderProductCard } from './home.js';
import { addToCart } from '../main.js';

export function renderProductDetail(productId) {
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) {
    return `
      <div class="page-header"><div class="container"><h1>Product Not Found</h1></div></div>
      <div class="section"><div class="container text-center"><a href="#shop" class="btn btn-primary">Back to Shop</a></div></div>
    `;
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return `
    <div style="margin-top: var(--nav-height); padding: var(--space-2xl) 0;">
      <div class="container">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <a href="#home">Home</a>
          <span class="separator">/</span>
          <a href="#shop">Shop</a>
          <span class="separator">/</span>
          <span>${product.name}</span>
        </div>

        <!-- Product Layout -->
        <div class="grid grid-2" style="gap: var(--space-3xl); align-items: start;">
          <!-- Image Gallery -->
          <div>
            <div style="border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-lg);">
              <img src="${product.images[0]}" alt="${product.name}" id="main-product-image"
                   style="width: 100%; aspect-ratio: 3/4; object-fit: cover;" />
            </div>
          </div>

          <!-- Product Info -->
          <div>
            ${product.badge ? `<span class="product-card-badge" style="position:static;margin-bottom:var(--space-md);display:inline-block;">${product.badge}</span>` : ''}
            <div class="product-card-category" style="margin-bottom:var(--space-xs);">${product.category.replace('-', ' ')}</div>
            <h1 style="font-size: var(--fs-3xl); margin-bottom: var(--space-md);">${product.name}</h1>
            
            <div style="font-size: var(--fs-2xl); font-weight: var(--fw-bold); color: var(--accent-primary); margin-bottom: var(--space-lg);">
              ₹${product.price.toLocaleString('en-IN')}
              ${product.originalPrice ? `<span style="text-decoration:line-through;color:var(--text-muted);font-size:var(--fs-lg);font-weight:var(--fw-regular);margin-left:var(--space-sm);">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
            </div>

            <p style="color: var(--text-secondary); line-height: var(--lh-relaxed); margin-bottom: var(--space-xl);">
              ${product.description}
            </p>

            <!-- Flowers Included -->
            <div style="margin-bottom: var(--space-xl);">
              <div class="form-label">Flowers Included</div>
              <div style="display:flex;flex-wrap:wrap;gap:var(--space-sm);">
                ${product.flowers.map(f => `
                  <span style="background:var(--bg-secondary);padding:6px 14px;border-radius:var(--radius-full);font-size:var(--fs-sm);color:var(--text-secondary);">${f}</span>
                `).join('')}
              </div>
            </div>

            <!-- Customization Options -->
            <div style="background:var(--bg-secondary);border-radius:var(--radius-lg);padding:var(--space-xl);margin-bottom:var(--space-xl);">
              <h4 style="margin-bottom:var(--space-lg);font-size:var(--fs-lg);">✨ Customize Your Order</h4>
              
              <div class="form-group">
                <label class="form-label">Color Theme</label>
                <select id="custom-color">
                  <option>Default Colors</option>
                  <option>All Pink</option>
                  <option>All White</option>
                  <option>Red & White</option>
                  <option>Pastel Mix</option>
                  <option>Purple & Lavender</option>
                  <option>Custom (specify in notes)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Add-ons</label>
                <div style="display:flex;flex-direction:column;gap:var(--space-sm);">
                  <label style="display:flex;align-items:center;gap:var(--space-sm);cursor:pointer;font-size:var(--fs-sm);">
                    <input type="checkbox" id="addon-lights" style="width:auto;" /> Fairy Lights (+₹150)
                  </label>
                  <label style="display:flex;align-items:center;gap:var(--space-sm);cursor:pointer;font-size:var(--fs-sm);">
                    <input type="checkbox" id="addon-pearls" style="width:auto;" /> Pearl Embellishments (+₹100)
                  </label>
                  <label style="display:flex;align-items:center;gap:var(--space-sm);cursor:pointer;font-size:var(--fs-sm);">
                    <input type="checkbox" id="addon-note" style="width:auto;" /> Personalized Handmade Note (+₹50)
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Special Instructions</label>
                <textarea id="custom-notes" placeholder="Any specific requests, color preferences, or notes for us..." rows="3"></textarea>
              </div>
            </div>

            <!-- Quantity & Add to Cart -->
            <div style="display:flex;align-items:center;gap:var(--space-xl);margin-bottom:var(--space-xl);flex-wrap:wrap;">
              <div class="qty-selector">
                <button class="qty-btn" id="qty-minus">−</button>
                <span class="qty-value" id="qty-value">1</span>
                <button class="qty-btn" id="qty-plus">+</button>
              </div>
              <button class="btn btn-primary btn-lg" id="add-to-cart-btn" data-product-id="${product.id}" style="flex:1;">
                🛒 Add to Cart
              </button>
            </div>

            <!-- Info Tags -->
            <div style="display:flex;flex-wrap:wrap;gap:var(--space-md);font-size:var(--fs-sm);color:var(--text-muted);">
              <span>🚚 All India Delivery</span>
              <span>⏱️ 2-4 days crafting</span>
              <span>💝 Gift packaging included</span>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        ${related.length > 0 ? `
          <div style="margin-top:var(--space-4xl);">
            <h2 class="text-center" style="margin-bottom:var(--space-2xl);">You May Also Like</h2>
            <div class="grid grid-4">
              ${related.map(p => renderProductCard(p)).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// Event bindings for product detail page
document.addEventListener('click', (e) => {
  // Qty buttons
  if (e.target.id === 'qty-minus' || e.target.id === 'qty-plus') {
    const qtyEl = document.getElementById('qty-value');
    if (qtyEl) {
      let val = parseInt(qtyEl.textContent);
      if (e.target.id === 'qty-minus') val = Math.max(1, val - 1);
      else val++;
      qtyEl.textContent = val;
    }
  }

  // Add to cart from detail
  if (e.target.id === 'add-to-cart-btn' || e.target.closest('#add-to-cart-btn')) {
    const btn = e.target.closest('#add-to-cart-btn') || e.target;
    const productId = parseInt(btn.dataset.productId);
    const product = products.find(p => p.id === productId);
    const qty = parseInt(document.getElementById('qty-value')?.textContent || '1');
    if (product) {
      const customizations = {
        color: document.getElementById('custom-color')?.value,
        lights: document.getElementById('addon-lights')?.checked,
        pearls: document.getElementById('addon-pearls')?.checked,
        note: document.getElementById('addon-note')?.checked,
        notes: document.getElementById('custom-notes')?.value
      };
      addToCart(product, qty, customizations);
    }
  }
});

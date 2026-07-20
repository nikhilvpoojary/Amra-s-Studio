// Cart Page
import { state, getCartTotal, removeFromCart, updateCartQty } from '../main.js';

export function renderCart() {
  if (state.cart.length === 0) {
    return `
      <div class="page-header">
        <div class="container">
          <h1>Your Cart</h1>
          <p>Your cart is currently empty.</p>
        </div>
      </div>
      <div class="section">
        <div class="container text-center">
          <div class="empty-state">
            <div class="empty-state-icon">🧺</div>
            <h2 class="empty-state-title">No Blooms in Your Basket</h2>
            <p class="empty-state-desc">Explore our evergreen selection to fill your cart with handcrafted beauty.</p>
            <a href="#shop" class="btn btn-primary">Start Shopping</a>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="page-header">
      <div class="container">
        <h1>Your Cart</h1>
        <p>Review your selected handcrafted everlasting creations</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="grid cart-grid" style="align-items: start;">
          <!-- Cart Items -->
          <div>
            ${state.cart.map(item => `
              <div class="cart-item" data-id="${item.id}">
                <img src="${item.images[0]}" alt="${item.name}" class="cart-item-image" />
                <div class="cart-item-info">
                  <div class="product-card-category" style="margin-bottom:0;">${item.category.replace('-', ' ')}</div>
                  <h3 class="cart-item-name">${item.name}</h3>
                  <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                  
                  <!-- Customizations display -->
                  ${renderCustomizationsText(item.customizations)}

                  <!-- Qty Adjuster -->
                  <div class="cart-quantity">
                    <button class="cart-qty-btn decrease-qty" data-id="${item.id}">−</button>
                    <span style="font-weight:600; min-width:24px; text-align:center;">${item.qty}</span>
                    <button class="cart-qty-btn increase-qty" data-id="${item.id}">+</button>
                  </div>
                </div>
                <button class="cart-remove remove-item" data-id="${item.id}" aria-label="Remove item">✕ Remove</button>
              </div>
            `).join('')}
          </div>

          <!-- Summary Panel -->
          <div style="background: var(--bg-secondary); border-radius: var(--radius-lg); padding: var(--space-xl); position: sticky; top: calc(var(--nav-height) + 20px);">
            <h3 style="margin-bottom: var(--space-lg); font-size: var(--fs-xl);">Order Summary</h3>
            
            <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-md); font-size:var(--fs-sm); color:var(--text-secondary);">
              <span>Subtotal</span>
              <span>₹${getCartTotal().toLocaleString('en-IN')}</span>
            </div>
            
            <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-md); font-size:var(--fs-sm); color:var(--text-secondary);">
              <span>Shipping</span>
              <span style="color: var(--accent-green); font-weight: 600;">FREE (Promo)</span>
            </div>

            <div style="border-top:1px solid var(--border-color); margin: var(--space-md) 0; padding-top: var(--space-md); display:flex; justify-content:space-between; font-size:var(--fs-lg); font-weight:700; color:var(--text-heading);">
              <span>Grand Total</span>
              <span>₹${getCartTotal().toLocaleString('en-IN')}</span>
            </div>

            <p style="font-size:var(--fs-xs); color:var(--text-muted); line-height:var(--lh-tight); margin-bottom:var(--space-lg);">
              ⚠️ Production requires 2-4 days. Shipping across India takes up to 1 week. Pre-payment standard via direct transfer.
            </p>

            <a href="#checkout" class="btn btn-primary" style="width:100%;">Proceed to Checkout</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCustomizationsText(custs) {
  if (!custs) return '';
  const parts = [];
  if (custs.color && custs.color !== 'Default Colors') parts.push(`Color: ${custs.color}`);
  if (custs.lights) parts.push('Fairy Lights (+₹150)');
  if (custs.pearls) parts.push('Pearls (+₹100)');
  if (custs.note) parts.push('Handwritten Note (+₹50)');
  if (custs.notes && custs.notes.trim()) parts.push(`Note: "${custs.notes}"`);

  if (parts.length === 0) return '';
  return `<div style="font-size:var(--fs-xs); color:var(--text-secondary); margin-top:var(--space-xs); background:rgba(0,0,0,0.03); padding:6px 10px; border-radius:var(--radius-sm);"><strong style="color:var(--accent-primary);">Customs:</strong> ${parts.join(' | ')}</div>`;
}

// Bind cart updates
document.addEventListener('click', (e) => {
  const btn = e.target;
  if (btn.classList.contains('increase-qty')) {
    const id = parseInt(btn.dataset.id);
    const item = state.cart.find(i => i.id === id);
    if (item) {
      updateCartQty(id, item.qty + 1);
      window.location.reload();
    }
  }

  if (btn.classList.contains('decrease-qty')) {
    const id = parseInt(btn.dataset.id);
    const item = state.cart.find(i => i.id === id);
    if (item && item.qty > 1) {
      updateCartQty(id, item.qty - 1);
      window.location.reload();
    }
  }

  if (btn.classList.contains('remove-item')) {
    const id = parseInt(btn.dataset.id);
    removeFromCart(id);
    window.location.reload();
  }
});

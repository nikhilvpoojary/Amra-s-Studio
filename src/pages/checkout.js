// Checkout Page
import { state, getCartTotal } from '../main.js';

export function renderCheckout() {
  if (state.cart.length === 0) {
    return `
      <div class="page-header"><div class="container"><h1>Checkout</h1></div></div>
      <div class="section"><div class="container text-center"><a href="#shop" class="btn btn-primary">Start Shopping</a></div></div>
    `;
  }

  return `
    <div class="page-header">
      <div class="container">
        <h1>Checkout</h1>
        <p>Complete your shipment and secure payment instructions</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="grid checkout-grid" style="align-items: start;">
          <!-- Shipping Form -->
          <div style="background: var(--bg-card); border-radius: var(--radius-lg); padding: var(--space-xl); box-shadow: var(--shadow-sm);">
            <h3 style="margin-bottom:var(--space-lg); font-size:var(--fs-xl);">Shipping Address</h3>
            
            <form id="checkout-form">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" id="chk-name" required placeholder="Enter full name of recipient" />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">WhatsApp/Phone Number *</label>
                  <input type="tel" id="chk-phone" required placeholder="10-digit mobile number" />
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address *</label>
                  <input type="email" id="chk-email" required placeholder="Recipient email address" />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Full Shipping Address *</label>
                <textarea id="chk-address" required placeholder="House No, Street, Landmark, Town/City" rows="3"></textarea>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Pincode *</label>
                  <input type="text" id="chk-pincode" required placeholder="6-digit ZIP code" pattern="[0-9]{6}" />
                </div>
                <div class="form-group">
                  <label class="form-label">State / Union Territory *</label>
                  <input type="text" id="chk-state" required placeholder="e.g. Goa" />
                </div>
              </div>

              <div style="margin-top: var(--space-2xl);">
                <button type="submit" class="btn btn-primary btn-lg" style="width:100%;">
                  Submit Order & Receive Payment Link (WhatsApp)
                </button>
              </div>
            </form>
          </div>

          <!-- Summary & Details -->
          <div style="background: var(--bg-secondary); border-radius: var(--radius-lg); padding: var(--space-xl);">
            <h3 style="margin-bottom: var(--space-lg); font-size: var(--fs-xl);">Order Summary</h3>
            
            <div style="max-height: 250px; overflow-y: auto; margin-bottom: var(--space-lg); padding-right: var(--space-sm);">
              ${state.cart.map(item => `
                <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-sm); font-size:var(--fs-sm); border-bottom:1px solid rgba(0,0,0,0.05); padding-bottom:6px;">
                  <span>${item.name} <strong>x${item.qty}</strong></span>
                  <span>₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
                </div>
              `).join('')}
            </div>

            <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-md); font-size:var(--fs-sm); color:var(--text-secondary);">
              <span>Subtotal</span>
              <span>₹${getCartTotal().toLocaleString('en-IN')}</span>
            </div>
            
            <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-md); font-size:var(--fs-sm); color:var(--text-secondary);">
              <span>Shipping</span>
              <span style="color:var(--accent-green); font-weight:600;">FREE</span>
            </div>

            <div style="border-top:1px solid var(--border-color); margin: var(--space-md) 0; padding-top: var(--space-md); display:flex; justify-content:space-between; font-size:var(--fs-lg); font-weight:700; color:var(--text-heading);">
              <span>Grand Total</span>
              <span>₹${getCartTotal().toLocaleString('en-IN')}</span>
            </div>

            <div style="background: rgba(137,57,65,0.05); padding: var(--space-md); border-radius: var(--radius-md); font-size: var(--fs-xs); color: var(--text-secondary); line-height: var(--lh-relaxed); margin-top: var(--space-lg);">
              <strong>💡 Payment Policy:</strong><br/>
              Cash on Delivery (COD) is not available. Direct pre-payment via UPI/transfer is required. 
              Submitting order redirects to owner WhatsApp chat to coordinate payment transfer.
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

document.addEventListener('submit', (e) => {
  if (e.target.id === 'checkout-form') {
    e.preventDefault();

    const name = document.getElementById('chk-name').value;
    const phone = document.getElementById('chk-phone').value;
    const email = document.getElementById('chk-email').value;
    const address = document.getElementById('chk-address').value;
    const pincode = document.getElementById('chk-pincode').value;
    const stateVal = document.getElementById('chk-state').value;

    // Compile items list
    const itemsList = state.cart.map(item => {
      let cust = '';
      if (item.customizations) {
        const parts = [];
        if (item.customizations.color && item.customizations.color !== 'Default Colors') parts.push(`Color: ${item.customizations.color}`);
        if (item.customizations.lights) parts.push('Lights');
        if (item.customizations.pearls) parts.push('Pearls');
        if (item.customizations.note) parts.push('Note');
        if (item.customizations.notes) parts.push(`Text: "${item.customizations.notes}"`);
        if (parts.length > 0) cust = ` (${parts.join(', ')})`;
      }
      return `- ${item.name} x${item.qty}${cust}`;
    }).join('\n');

    // Format WhatsApp message
    const message = `Hello Amra's Studio! I'd like to place an order.

📦 *Order Details:*
${itemsList}

💰 *Grand Total:* ₹${getCartTotal().toLocaleString('en-IN')}

🚚 *Shipping Details:*
Name: ${name}
Phone: ${phone}
Email: ${email}
Address: ${address}
Pincode: ${pincode}
State: ${stateVal}

*(Please send me payment instructions to finalize the order)*`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917387920392?text=${encoded}`; // Real WhatsApp Contact redirect API

    // Clear cart upon redirection
    state.cart = [];
    localStorage.removeItem('amras_cart');

    window.open(whatsappUrl, '_blank');
    window.location.hash = 'home';
  }
});

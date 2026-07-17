// Contact Us Page
export function renderContact() {
  return `
    <div class="page-header">
      <div class="container">
        <span class="section-subtitle">Reach Out To Us</span>
        <h1>Contact Us</h1>
        <p>We're here to assist with any questions or order inquiries</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="grid grid-2" style="gap: var(--space-3xl); align-items: start;">
          <!-- Contact Info -->
          <div>
            <h2 style="font-size: var(--fs-2xl); margin-bottom: var(--space-lg);">Get in Touch</h2>
            <p style="color: var(--text-secondary); line-height: var(--lh-relaxed); margin-bottom: var(--space-xl);">
              Have a question about our handcrafted everlasting flowers? Want to follow up on an order or 
              inquire about customized corporate/bridal bundles? Contact us via any of the channels below.
            </p>

            <div style="display:flex; flex-direction:column; gap:var(--space-lg);">
              <div style="display:flex; gap:var(--space-md); align-items:center;">
                <div style="font-size:2rem; width:50px; height:50px; background:var(--bg-secondary); border-radius:var(--radius-full); display:flex; align-items:center; justify-content:center;">📍</div>
                <div>
                  <h4 style="margin-bottom:2px;">Business Address</h4>
                  <span style="color:var(--text-secondary); font-size:var(--fs-sm);">Margao, Goa, India, 403707</span>
                </div>
              </div>

              <div style="display:flex; gap:var(--space-md); align-items:center;">
                <div style="font-size:2rem; width:50px; height:50px; background:var(--bg-secondary); border-radius:var(--radius-full); display:flex; align-items:center; justify-content:center;">✉️</div>
                <div>
                  <h4 style="margin-bottom:2px;">Email Address</h4>
                  <a href="mailto:Amrasstudio.co@gmail.com" style="color:var(--text-secondary); font-size:var(--fs-sm);">Amrasstudio.co@gmail.com</a>
                </div>
              </div>

              <div style="display:flex; gap:var(--space-md); align-items:center;">
                <div style="font-size:2rem; width:50px; height:50px; background:var(--bg-secondary); border-radius:var(--radius-full); display:flex; align-items:center; justify-content:center;">📷</div>
                <div>
                  <h4 style="margin-bottom:2px;">Instagram</h4>
                  <a href="https://instagram.com/amrasstudio.co" target="_blank" rel="noopener" style="color:var(--text-secondary); font-size:var(--fs-sm);">@amrasstudio.co</a>
                </div>
              </div>

              <div style="display:flex; gap:var(--space-md); align-items:center;">
                <div style="font-size:2rem; width:50px; height:50px; background:var(--bg-secondary); border-radius:var(--radius-full); display:flex; align-items:center; justify-content:center;">▶️</div>
                <div>
                  <h4 style="margin-bottom:2px;">YouTube Channel</h4>
                  <a href="https://youtube.com/@amrasstudio" target="_blank" rel="noopener" style="color:var(--text-secondary); font-size:var(--fs-sm);">@amrasstudio</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div style="background:var(--bg-card); border-radius:var(--radius-lg); padding:var(--space-xl); box-shadow:var(--shadow-sm);">
            <h3 style="margin-bottom:var(--space-lg); font-size:var(--fs-xl);">Send a Message</h3>
            <form id="contact-form">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" id="cnt-name" required placeholder="Enter your name" />
              </div>

              <div class="form-group">
                <label class="form-label">WhatsApp/Phone Number *</label>
                <input type="tel" id="cnt-phone" required placeholder="e.g. 9876543210" />
              </div>

              <div class="form-group">
                <label class="form-label">Your Message *</label>
                <textarea id="cnt-msg" required placeholder="Write your inquiry here..." rows="4"></textarea>
              </div>

              <button type="submit" class="btn btn-primary" style="width:100%;">Send Message (Via WhatsApp)</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

document.addEventListener('submit', (e) => {
  if (e.target.id === 'contact-form') {
    e.preventDefault();

    const name = document.getElementById('cnt-name').value;
    const phone = document.getElementById('cnt-phone').value;
    const msg = document.getElementById('cnt-msg').value;

    const message = `Hello Amra's Studio! I'd like to get in touch.

👤 *Visitor Details:*
Name: ${name}
Phone: ${phone}

💬 *Message:*
${msg}`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917387920392?text=${encoded}`; // Goa contact line redirect

    window.open(whatsappUrl, '_blank');
  }
});

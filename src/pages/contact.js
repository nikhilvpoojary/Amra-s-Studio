// Contact Us Page (LocalStorage dynamic version)
import { getStoreSettingsFromStorage } from '../main.js';

export function renderContact() {
  const s = getStoreSettingsFromStorage() || {
    whatsapp: '917387920392',
    email: 'Amrasstudio.co@gmail.com',
    address: 'Margao, Goa, India, 403707',
    instagram: 'https://instagram.com/amrasstudio.co',
    youtube: 'https://youtube.com/@amrasstudio'
  };

  const instagramUsername = s.instagram ? s.instagram.replace(/\/$/, '').split('/').pop() : 'amrasstudio.co';

  return `
    <div class="page-header">
      <div class="container">
        <span class="section-subtitle">Reach Out To Us</span>
        <h1>Contact Us</h1>
        <p>We're here to assist with any questions or order inquiries</p>
      </div>
    </div>

    <section class="section" style="padding-top: var(--space-xl);">
      <div class="container">
        <div class="grid grid-2" style="gap: var(--space-3xl); align-items: start;">
          <!-- Contact Info -->
          <div>
            <h2 style="font-size: var(--fs-2xl); margin-bottom: var(--space-lg); font-family: var(--font-heading); font-style: italic; font-weight: var(--fw-semibold);">Get in Touch</h2>
            <p style="color: var(--text-secondary); line-height: var(--lh-relaxed); margin-bottom: var(--space-xl);">
              Have a question about our handcrafted everlasting flowers? Want to follow up on an order or 
              inquire about customized corporate/bridal bundles? Contact us via any of the channels below.
            </p>

            <div style="display:flex; flex-direction:column; gap:var(--space-lg);">
              ${s.address ? `
                <div style="display:flex; gap:var(--space-md); align-items:center;">
                  <div style="width:50px; height:50px; background:var(--bg-secondary); border-radius:var(--radius-full); display:flex; align-items:center; justify-content:center; color: #CB7885; flex-shrink:0;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 style="margin-bottom:2px;">Business Address</h4>
                    <span style="color:var(--text-secondary); font-size:var(--fs-sm);">${s.address}</span>
                  </div>
                </div>
              ` : ''}

              ${s.email ? `
                <div style="display:flex; gap:var(--space-md); align-items:center;">
                  <div style="width:50px; height:50px; background:var(--bg-secondary); border-radius:var(--radius-full); display:flex; align-items:center; justify-content:center; color: #CB7885; flex-shrink:0;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 style="margin-bottom:2px;">Email Address</h4>
                    <a href="mailto:${s.email}" style="color:var(--text-secondary); font-size:var(--fs-sm);">${s.email}</a>
                  </div>
                </div>
              ` : ''}

              ${s.instagram ? `
                <div style="display:flex; gap:var(--space-md); align-items:center;">
                  <div style="width:50px; height:50px; background:var(--bg-secondary); border-radius:var(--radius-full); display:flex; align-items:center; justify-content:center; color: #CB7885; flex-shrink:0;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 style="margin-bottom:2px;">Instagram</h4>
                    <a href="${s.instagram}" target="_blank" rel="noopener" style="color:var(--text-secondary); font-size:var(--fs-sm);">@${instagramUsername}</a>
                  </div>
                </div>
              ` : ''}

              ${s.youtube ? `
                <div style="display:flex; gap:var(--space-md); align-items:center;">
                  <div style="width:50px; height:50px; background:var(--bg-secondary); border-radius:var(--radius-full); display:flex; align-items:center; justify-content:center; color: #CB7885; flex-shrink:0;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  </div>
                  <div>
                    <h4 style="margin-bottom:2px;">YouTube Channel</h4>
                    <a href="${s.youtube}" target="_blank" rel="noopener" style="color:var(--text-secondary); font-size:var(--fs-sm);">@${instagramUsername}</a>
                  </div>
                </div>
              ` : ''}
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

    const s = getStoreSettingsFromStorage() || { whatsapp: '917387920392' };
    const whatsappNum = s.whatsapp || '917387920392';

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encoded}`;

    window.open(whatsappUrl, '_blank');
  }
});

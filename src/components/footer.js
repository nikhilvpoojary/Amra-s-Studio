import { getStoreSettingsFromStorage } from '../main.js';

export function renderFooter() {
  const s = getStoreSettingsFromStorage() || {
    whatsapp: '917387920392',
    email: 'Amrasstudio.co@gmail.com',
    address: 'Margao, Goa, India, 403707',
    instagram: 'https://instagram.com/amrasstudio.co',
    youtube: 'https://youtube.com/@amrasstudio'
  };

  const instagramUsername = s.instagram ? s.instagram.replace(/\/$/, '').split('/').pop() : 'amrasstudio.co';

  return `
    <div class="footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand Column -->
          <div>
            <div style="display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-md);">
              <img src="/images/logo.png" alt="Amra's Studio Logo" style="height: 50px; width: auto; object-fit: contain;" />
              <div class="footer-brand-name" style="margin-bottom: 0;">Amra's Studio</div>
            </div>
            <p class="footer-brand-desc">
              Premium handcrafted pipe cleaner flowers, bouquets, and floral arrangements 
              designed to last forever. Based in ${s.address || 'Goa, India'}.
            </p>
            <div class="footer-social">
              ${s.instagram ? `<a href="${s.instagram}" target="_blank" rel="noopener" aria-label="Instagram" style="padding:0; border:none; background:none;">
                <svg viewBox="0 0 24 24" width="28" height="28" style="border-radius: var(--radius-md); overflow: hidden; display: block; transition: transform var(--transition-normal) ease;">
                  <defs>
                    <radialGradient id="ig-grad-footer" cx="30%" cy="107%" r="130%">
                      <stop offset="0%" stop-color="#fdf497" />
                      <stop offset="5%" stop-color="#fdf497" />
                      <stop offset="45%" stop-color="#fd5949" />
                      <stop offset="60%" stop-color="#d6249f" />
                      <stop offset="90%" stop-color="#285AEB" />
                    </radialGradient>
                  </defs>
                  <rect width="24" height="24" rx="5" fill="url(#ig-grad-footer)" />
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="white" transform="scale(0.7) translate(5, 5)"/>
                </svg>
              </a>` : ''}
              ${s.youtube ? `<a href="${s.youtube}" target="_blank" rel="noopener" aria-label="YouTube" style="padding:0; border:none; background:none;">
                <svg viewBox="0 0 24 24" width="28" height="28" style="display: block; transition: transform var(--transition-normal) ease;">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837z" fill="#FF0000"/>
                  <polygon points="9.545 15.568 15.818 12 9.545 8.432" fill="white"/>
                </svg>
              </a>` : ''}
              ${s.email ? `<a href="mailto:${s.email}" aria-label="Email" style="color: rgba(255,250,242,0.7); display:flex; align-items:center; justify-content:center; width:40px; height:40px; border:1px solid rgba(255,250,242,0.2); border-radius:50%; transition: all var(--transition-normal) ease;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>` : ''}
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <div class="footer-heading">Quick Links</div>
            <div class="footer-links">
              <a href="#home" class="footer-link">Home</a>
              <a href="#shop" class="footer-link">Shop</a>
              <a href="#custom-order" class="footer-link">Custom Order</a>
              <a href="#about" class="footer-link">About Us</a>
            </div>
          </div>

          <!-- Help -->
          <div>
            <div class="footer-heading">Help</div>
            <div class="footer-links">
              <a href="#faq" class="footer-link">FAQ</a>
              <a href="#policies" class="footer-link">Privacy Policy</a>
              <a href="#policies" class="footer-link">Terms & Conditions</a>
              <a href="#contact" class="footer-link">Contact Us</a>
            </div>
          </div>

          <!-- Contact -->
          <div>
            <div class="footer-heading">Get In Touch</div>
            <div class="footer-links">
              ${s.address ? `
                <span class="footer-link" style="display: flex; align-items: center; gap: 8px;">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #CB7885; flex-shrink: 0; display:block;">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  ${s.address}
                </span>` : ''}
              ${s.email ? `
                <a href="mailto:${s.email}" class="footer-link" style="display: flex; align-items: center; gap: 8px;">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #CB7885; flex-shrink: 0; display:block;">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  ${s.email}
                </a>` : ''}
              ${s.instagram ? `
                <a href="${s.instagram}" class="footer-link" target="_blank" rel="noopener" style="display: flex; align-items: center; gap: 8px;">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #CB7885; flex-shrink: 0; display:block;">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  @${instagramUsername}
                </a>` : ''}
            </div>
          </div>
        </div>

        <!-- Footer Bottom with hidden admin link -->
        <div class="footer-bottom">
          <p>© 2025 Amra's Studio. All rights reserved. Handcrafted with ❤️ in Goa, India.</p>
          <a href="#hidden-admin-gateway" class="footer-admin-link" title="Admin">Amra's Studio</a>
        </div>
      </div>
    </div>
  `;
}

// Footer Component — with hidden admin link per PDF spec
export function renderFooter() {
  return `
    <div class="footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand Column -->
          <div>
            <div class="footer-brand-name">Amra's Studio</div>
            <p class="footer-brand-desc">
              Premium handcrafted pipe cleaner flowers, bouquets, and floral arrangements 
              designed to last forever. Based in Margao, Goa, India.
            </p>
            <div class="footer-social">
              <a href="https://instagram.com/amrasstudio.co" target="_blank" rel="noopener" aria-label="Instagram">📷</a>
              <a href="https://youtube.com/@amrasstudio" target="_blank" rel="noopener" aria-label="YouTube">▶️</a>
              <a href="mailto:Amrasstudio.co@gmail.com" aria-label="Email">✉️</a>
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
              <span class="footer-link">📍 Margao, Goa, India, 403707</span>
              <a href="mailto:Amrasstudio.co@gmail.com" class="footer-link">✉️ Amrasstudio.co@gmail.com</a>
              <a href="https://instagram.com/amrasstudio.co" class="footer-link" target="_blank" rel="noopener">📷 @amrasstudio.co</a>
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

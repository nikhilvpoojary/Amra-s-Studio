// Navbar Component
export function renderNavbar() {
  return `
    <div class="navbar">
      <div class="navbar-inner">
        <a href="#home" class="navbar-logo">
          <div>
            <div class="navbar-logo-text">Amra's Studio</div>
            <div class="navbar-logo-sub">Since 2025</div>
          </div>
        </a>

        <div class="nav-links">
          <a href="#home" class="nav-link active">Home</a>
          <a href="#shop" class="nav-link">Shop</a>
          <a href="#custom-order" class="nav-link">Custom Order</a>
          <a href="#about" class="nav-link">About</a>
          <a href="#faq" class="nav-link">FAQ</a>
          <a href="#contact" class="nav-link">Contact</a>
        </div>

        <div style="display:flex;align-items:center;gap:var(--space-md);">
          <a href="#cart" class="nav-cart" id="nav-cart-btn">
            <span class="nav-cart-icon">🛒</span>
            <span class="nav-cart-badge" id="cart-badge">0</span>
          </a>
          <div class="nav-toggle" id="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile-overlay" id="mobile-overlay"></div>
  `;
}

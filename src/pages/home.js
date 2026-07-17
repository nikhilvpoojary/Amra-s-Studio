// Home Page
import { products, offerings } from '../data/products.js';

export function renderHome() {
  const featured = products.filter(p => p.badge).slice(0, 4);
  const bestsellers = products.slice(0, 8);

  return `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-content">
          <span class="hero-tag">✨ Handcrafted with Love</span>
          <h1 class="hero-title">
            Flowers That
            <span>Last Forever</span>
          </h1>
          <p class="hero-desc">
            Premium handcrafted pipe cleaner flowers, bouquets, and floral arrangements 
            designed to last forever. Every piece is carefully handmade from start to finish.
          </p>
          <div class="hero-actions">
            <a href="#shop" class="btn btn-primary btn-lg">Shop Collection</a>
            <a href="#custom-order" class="btn btn-secondary btn-lg">Custom Order</a>
          </div>
        </div>
        <div class="hero-image">
          <img src="/images/20260424_155841.jpg" alt="Handcrafted flower bouquet by Amra's Studio" class="hero-image-main" />
          <div class="hero-float-badge top-right">
            <div class="hero-float-number">500+</div>
            <div class="hero-float-label">Happy Customers</div>
          </div>
          <div class="hero-float-badge bottom-left">
            <div class="hero-float-number">🌸</div>
            <div class="hero-float-label">Everlasting Blooms</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Offerings -->
    <section class="section">
      <div class="container text-center">
        <span class="section-subtitle">What We Create</span>
        <h2 class="section-title">Our Offerings</h2>
        <p class="section-desc" style="margin: 0 auto var(--space-2xl);">
          From elegant single flowers to luxurious bridal bouquets and custom floral creations, 
          each design is crafted with care and creativity.
        </p>
        <div class="grid grid-4">
          ${offerings.map(o => `
            <a href="#shop" class="category-card">
              <div class="category-icon">${o.icon}</div>
              <div class="category-name">${o.name}</div>
              <div class="category-count">${o.desc}</div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section section-alt">
      <div class="container text-center">
        <span class="section-subtitle">Curated For You</span>
        <h2 class="section-title">Featured Collection</h2>
        <div class="grid grid-4" style="margin-top: var(--space-2xl);">
          ${featured.map(p => renderProductCard(p)).join('')}
        </div>
        <div style="margin-top: var(--space-2xl);">
          <a href="#shop" class="btn btn-primary">View All Products</a>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section">
      <div class="container text-center">
        <span class="section-subtitle">Why Amra's Studio</span>
        <h2 class="section-title">Crafted to Perfection</h2>
        <div class="grid grid-3" style="margin-top: var(--space-2xl);">
          <div class="category-card">
            <div class="category-icon">🎨</div>
            <div class="category-name">100% Handmade</div>
            <p style="color: var(--text-secondary); font-size: var(--fs-sm);">
              Every flower is carefully handcrafted from start to finish using premium imported materials.
            </p>
          </div>
          <div class="category-card">
            <div class="category-icon">♾️</div>
            <div class="category-name">Everlasting Beauty</div>
            <p style="color: var(--text-secondary); font-size: var(--fs-sm);">
              Unlike real flowers, our creations last for years — meaningful gifts and timeless keepsakes.
            </p>
          </div>
          <div class="category-card">
            <div class="category-icon">✨</div>
            <div class="category-name">Fully Customizable</div>
            <p style="color: var(--text-secondary); font-size: var(--fs-sm);">
              Colors, flower types, sizes, fairy lights, pearls, and personalized notes — make it yours.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bestsellers Grid -->
    <section class="section section-alt">
      <div class="container text-center">
        <span class="section-subtitle">Most Loved</span>
        <h2 class="section-title">Bestsellers</h2>
        <div class="grid grid-4" style="margin-top: var(--space-2xl);">
          ${bestsellers.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="section" style="background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); color: white; text-align: center;">
      <div class="container">
        <h2 style="color: white; font-size: var(--fs-3xl); margin-bottom: var(--space-md);">Have Something Special in Mind?</h2>
        <p style="color: rgba(255,255,255,0.85); font-size: var(--fs-md); max-width: 500px; margin: 0 auto var(--space-xl);">
          Share a reference image and we'll create our own handcrafted interpretation in our unique artistic style.
        </p>
        <a href="#custom-order" class="btn btn-lg" style="background: white; color: var(--accent-primary);">Place Custom Order</a>
      </div>
    </section>

    <!-- Delivery Info -->
    <section class="section">
      <div class="container">
        <div class="grid grid-3 text-center">
          <div>
            <div style="font-size: 2.5rem; margin-bottom: var(--space-sm);">🚚</div>
            <h4 style="margin-bottom: var(--space-xs);">All India Delivery</h4>
            <p style="color: var(--text-muted); font-size: var(--fs-sm);">We ship across India with care.</p>
          </div>
          <div>
            <div style="font-size: 2.5rem; margin-bottom: var(--space-sm);">⏱️</div>
            <h4 style="margin-bottom: var(--space-xs);">2-4 Days Crafting</h4>
            <p style="color: var(--text-muted); font-size: var(--fs-sm);">Each piece made fresh for you.</p>
          </div>
          <div>
            <div style="font-size: 2.5rem; margin-bottom: var(--space-sm);">💝</div>
            <h4 style="margin-bottom: var(--space-xs);">Gift Ready</h4>
            <p style="color: var(--text-muted); font-size: var(--fs-sm);">Beautiful packaging included.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderProductCard(product) {
  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-card-image">
        ${product.badge ? `<span class="product-card-badge">${product.badge}</span>` : ''}
        <span class="product-card-wishlist">♡</span>
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
        <div class="product-card-overlay">
          <button class="btn btn-primary btn-sm" data-add-to-cart="${product.id}">Add to Cart</button>
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-card-category">${product.category.replace('-', ' ')}</div>
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-price">
          ₹${product.price.toLocaleString('en-IN')}
          ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

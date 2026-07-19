// Home Page
import { db } from '../lib/store.js';
import { offerings } from '../data/products.js';

export function renderHome() {
  const products = db.getProducts();
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
          <img src="/images/home.png" alt="Handcrafted Tulip Bouquet" class="hero-image-bouquet" />
          <!-- Decorative floating flowers: 1 top-center, 1 left side, 1 right side -->
          <img src="/images/flower-bg2.png" class="hero-deco-flower fd-2" alt="" />
          <img src="/images/flower-bg4.png" class="hero-deco-flower fd-4" alt="" />
          <img src="/images/flower-bg1.png" class="hero-deco-flower fd-5" alt="" />
        </div>
      </div>
    </section>

    <!-- Our Offerings -->
    <section class="section">
      <div class="container text-center">
        <span class="section-subtitle">What We Create</span>
        <h2 class="section-title offerings-title" style="font-family: var(--font-heading); font-style: italic; font-size: var(--fs-4xl); font-weight: var(--fw-semibold);">Our Offerings</h2>
        <p class="section-desc" style="margin: 0 auto var(--space-2xl); font-style: italic; font-family: var(--font-subheading); font-weight: var(--fw-light);">
          From elegant single flowers to luxurious bridal bouquets and custom floral creations,
          each design is crafted with care and creativity.
        </p>
        <div class="grid grid-4">
          ${offerings.map((o, i) => {
            // Updated Gift Sets card background from #F6EAD4 to #EFD7CF to avoid blending into page background
            const bg = ['#fdffa2', '#ddd3ca', '#ffd4c4', '#d1efef', '#EFD7CF', '#DDBAAE', '#EFD7CF', '#DCD4C1'];
            return `
              <a href="#shop" class="category-card" style="background-color: ${bg[i]}; padding: var(--space-2xl);">
                <div class="category-icon">${o.icon}</div>
                <div class="category-name" style="color: #893941;">${o.name}</div>
                <div class="category-count" style="color: #893941;">${o.desc}</div>
              </a>
            `
          }).join('')}
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
          <div class="category-card" style="background-color: #EFD7CF; padding: var(--space-2xl);">
            <div class="category-icon">🎨</div>
            <div class="category-name" style="color: #893941;">100% Handmade</div>
            <p style="color: #893941; font-size: var(--fs-sm);">
              Every flower is carefully handcrafted from start to finish using premium imported materials.
            </p>
          </div>
          <div class="category-card" style="background-color: #DDBAAE; padding: var(--space-2xl);">
            <div class="category-icon">🌸</div>
            <div class="category-name" style="color: #893941;">Everlasting Beauty</div>
            <p style="color: #893941; font-size: var(--fs-sm);">
              Made from premium pipe cleaners that keep their shape and vibrant colors forever. No wilting.
            </p>
          </div>
          <div class="category-card" style="background-color: #DCD4C1; padding: var(--space-2xl);">
            <div class="category-icon">✨</div>
            <div class="category-name" style="color: #893941;">Fully Customizable</div>
            <p style="color: #893941; font-size: var(--fs-sm);">
              Select your own color palettes, wraps, lights, and embellishments to make it uniquely yours.
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
          <div style="background-color: #d1efef; padding: var(--space-2xl); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
            <div style="font-size: 2.5rem; margin-bottom: var(--space-sm);">🚚</div>
            <h4 style="margin-bottom: var(--space-xs); color: #893941;">All India Delivery</h4>
            <p style="color: #893941; font-size: var(--fs-sm);">We ship across India with care.</p>
          </div>
          <div style="background-color: #ffd4c4; padding: var(--space-2xl); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
            <div style="font-size: 2.5rem; margin-bottom: var(--space-sm);">⏱️</div>
            <h4 style="margin-bottom: var(--space-xs); color: #893941;">2-4 Days Crafting</h4>
            <p style="color: #893941; font-size: var(--fs-sm);">Each piece made fresh for you.</p>
          </div>
          <div style="background-color: #ddd3ca; padding: var(--space-2xl); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
            <div style="font-size: 2.5rem; margin-bottom: var(--space-sm);">💝</div>
            <h4 style="margin-bottom: var(--space-xs); color: #893941;">Gift Ready</h4>
            <p style="color: #893941; font-size: var(--fs-sm);">Beautiful packaging included.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderProductCard(product) {
  const isOutOfStock = !product.inStock;
  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-card-image">
        ${product.badge ? `<span class="product-card-badge">${product.badge}</span>` : ''}
        ${isOutOfStock ? `<span class="product-card-badge" style="background:#555; left:auto; right:var(--space-md);">Out of Stock</span>` : ''}
        <span class="product-card-wishlist">♡</span>
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
        <div class="product-card-overlay">
          <button class="btn btn-primary btn-sm" data-add-to-cart="${product.id}" ${isOutOfStock ? 'disabled' : ''}>
            ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <div class="product-card-body">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-xs);">
          <div class="product-card-category" style="margin-bottom:0;">${product.category.replace('-', ' ')}</div>
          ${product.customizable ? '<span class="custom-pill" style="font-size:var(--fs-xs); background:rgba(203, 120, 133, 0.1); color:var(--accent-secondary); padding:2px 8px; border-radius:var(--radius-full);">🎨 Custom Color</span>' : ''}
        </div>
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-price">
          ₹${product.price.toLocaleString('en-IN')}
          ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

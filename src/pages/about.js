// About Us Page
export function renderAbout() {
  return `
    <div class="page-header">
      <div class="container">
        <span class="section-subtitle">Our Story & Offerings</span>
        <h1>About Us</h1>
        <p>Handmade flower brand based in Margao, Goa, India</p>
      </div>
    </div>

    <!-- About Section -->
    <section class="section" style="padding-top: var(--space-xl);">
      <div class="container">
        <div class="grid grid-2" style="align-items: center; gap: var(--space-3xl);">
          <div>
            <img src="/images/20260330_093128.jpg" alt="Everlasting bouquet creation process" 
                 style="border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); width: 100%; aspect-ratio: 4/5; object-fit: cover;" />
          </div>
          <div>
            <span class="section-subtitle" style="display:block; margin-bottom:var(--space-sm);">Established September 2025</span>
            <h2 style="font-size: var(--fs-3xl); margin-bottom: var(--space-lg); font-family: var(--font-heading); font-style: italic; font-weight: var(--fw-semibold);">Crafting Everlasting Blooms</h2>
            
            <p style="color: var(--text-secondary); line-height: var(--lh-relaxed); font-size: var(--fs-md);">
              Welcome to <strong>Amra's Studio</strong>, a handmade flower brand based in Margao, Goa, India. 
              Founded in September 2025, Amra's Studio specializes in creating premium handcrafted pipe cleaner flowers, 
              bouquets, and floral arrangements designed to last forever.
            </p>
            
            <p style="color: var(--text-secondary); line-height: var(--lh-relaxed); font-size: var(--fs-md);">
              Every piece is carefully handmade from start to finish using high-quality imported materials, 
              ensuring exceptional detail, durability, and beauty. From elegant single flowers to luxurious bridal 
              bouquets and custom floral creations, each design is crafted with care and creativity.
            </p>

            <p style="color: var(--text-secondary); line-height: var(--lh-relaxed); font-size: var(--fs-md);">
              We believe flowers shouldn't fade with time, which is why our everlasting blooms make meaningful gifts 
              and keepsakes for every occasion.
            </p>

            <p style="color: var(--text-secondary); line-height: var(--lh-relaxed); font-size: var(--fs-md); font-style: italic; font-weight: var(--fw-medium);">
              Whether you have a specific design in mind or want us to recreate an inspiration photo in our own 
              artistic style, we're here to bring your vision to life.
            </p>

            <div style="margin-top: var(--space-xl);">
              <a href="#shop" class="btn btn-primary">Browse Our Catalog</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services / offerings details -->
    <section class="section section-alt">
      <div class="container text-center">
        <span class="section-subtitle">What We Excel At</span>
        <h2 style="font-family: var(--font-heading); font-style: italic; font-size: clamp(2rem, 5vw, var(--fs-4xl)); font-weight: var(--fw-semibold);">Our Offerings & Specialties</h2>
        <p class="section-desc" style="margin: 0 auto var(--space-2xl); font-style: italic; font-family: var(--font-subheading); font-weight: var(--fw-light);">
          Every creation is fully customizable to suit your color schemes, themes, sizes, and enhancements.
        </p>

        <div class="grid grid-4">
          <div class="category-card" style="background-color: #fdffa2;">
            <div class="category-icon">💐</div>
            <div class="category-name">Handmade Bouquets</div>
            <p style="color: #893941; font-size: var(--fs-sm); margin-top:var(--space-sm);">
              Elegant multi-flower arrangements beautifully wrapped.
            </p>
          </div>
          <div class="category-card" style="background-color: #ddd3ca;">
            <div class="category-icon">🌷</div>
            <div class="category-name">Single Flowers</div>
            <p style="color: #893941; font-size: var(--fs-sm); margin-top:var(--space-sm);">
              Delightful solo stems in personalized packaging.
            </p>
          </div>
          <div class="category-card" style="background-color: #ffd4c4;">
            <div class="category-icon">👰</div>
            <div class="category-name">Bridal Bouquets</div>
            <p style="color: #893941; font-size: var(--fs-sm); margin-top:var(--space-sm);">
              Unfading florals for your special wedding memories.
            </p>
          </div>
          <div class="category-card" style="background-color: #d1efef;">
            <div class="category-icon">🧺</div>
            <div class="category-name">Flower Baskets</div>
            <p style="color: #893941; font-size: var(--fs-sm); margin-top:var(--space-sm);">
              Whimsical wicker baskets filled with gorgeous blooms.
            </p>
          </div>
          <div class="category-card" style="background-color: #EFD7CF;">
            <div class="category-icon">💡</div>
            <div class="category-name">Floral Lamps</div>
            <p style="color: #893941; font-size: var(--fs-sm); margin-top:var(--space-sm);">
              Warm fairy light illuminations inside custom layouts.
            </p>
          </div>
          <div class="category-card" style="background-color: #DDBAAE;">
            <div class="category-icon">✨</div>
            <div class="category-name">Custom Arrangements</div>
            <p style="color: #893941; font-size: var(--fs-sm); margin-top:var(--space-sm);">
              Tailor-made structural variations for any space.
            </p>
          </div>
          <div class="category-card" style="background-color: #EFD7CF;">
            <div class="category-icon">🎁</div>
            <div class="category-name">Gift Sets</div>
            <p style="color: #893941; font-size: var(--fs-sm); margin-top:var(--space-sm);">
              Combined packages featuring notes and gifts.
            </p>
          </div>
          <div class="category-card" style="background-color: #DCD4C1;">
            <div class="category-icon">🧸</div>
            <div class="category-name">Plushie Add-ons</div>
            <p style="color: #893941; font-size: var(--fs-sm); margin-top:var(--space-sm);">
              Cute mini plushies woven directly into layouts.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Customization highlight -->
    <section class="section" style="background:var(--color-peach-protein); color:var(--text-heading); text-align:center;">
      <div class="container container-narrow">
        <h2 style="margin-bottom: var(--space-md);">Every Order Can Be Customized</h2>
        <p style="color:var(--text-secondary); margin-bottom: var(--space-xl);">
          Make your gift truly personal. We seamlessly adapt lights, pearls, personalized hand-written notes, 
          custom color themes, bouquet sizes, and bespoke structures to match reference images.
        </p>
        <a href="#custom-order" class="btn btn-primary"><span class="hide-mobile">Start Designing Your </span>Custom Arrangement</a>
      </div>
    </section>
  `;
}

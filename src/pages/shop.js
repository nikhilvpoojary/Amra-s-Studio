// Shop Catalog Page
import { products, categories } from '../data/products.js';
import { renderProductCard } from './home.js';
import { addToCart } from '../main.js';

export function renderShop() {
  return `
    <div class="page-header">
      <div class="container">
        <span class="section-subtitle">Explore Our Collection</span>
        <h1>Shop</h1>
        <p>Handcrafted everlasting flowers for every occasion</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <!-- Category Filters -->
        <div class="filter-tabs" id="shop-filters">
          ${categories.map(cat => `
            <button class="filter-tab ${cat.id === 'all' ? 'active' : ''}" data-filter="${cat.id}">
              ${cat.icon} ${cat.name} (${cat.count})
            </button>
          `).join('')}
        </div>

        <!-- Sort -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-xl);flex-wrap:wrap;gap:var(--space-md);">
          <p style="color:var(--text-muted);margin:0;" id="product-count">${products.length} products</p>
          <select id="shop-sort" style="width:auto;min-width:180px;">
            <option value="default">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-3" id="product-grid">
          ${products.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </section>
  `;
}

// Bind shop filter & sort events after render
document.addEventListener('click', (e) => {
  const filterTab = e.target.closest('.filter-tab');
  if (filterTab) {
    const filter = filterTab.dataset.filter;

    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    filterTab.classList.add('active');

    // Filter products
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    const grid = document.getElementById('product-grid');
    const count = document.getElementById('product-count');
    if (grid) {
      grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
      // Re-bind add-to-cart
      bindAddToCartButtons();
    }
    if (count) count.textContent = `${filtered.length} products`;
  }
});

document.addEventListener('change', (e) => {
  if (e.target.id === 'shop-sort') {
    const sortValue = e.target.value;
    const activeFilter = document.querySelector('.filter-tab.active')?.dataset.filter || 'all';
    let filtered = activeFilter === 'all' ? [...products] : products.filter(p => p.category === activeFilter);

    switch (sortValue) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    const grid = document.getElementById('product-grid');
    if (grid) {
      grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
      bindAddToCartButtons();
    }
  }
});

function bindAddToCartButtons() {
  document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.addToCart);
      const product = products.find(p => p.id === id);
      if (product) {
        addToCart(product);
      }
    });
  });

  document.querySelectorAll('[data-product-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('[data-add-to-cart]')) {
        window.location.hash = `product/${card.dataset.productId}`;
      }
    });
  });
}

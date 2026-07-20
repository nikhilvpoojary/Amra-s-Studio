import { db } from '../lib/store.js';

// Custom Order Page
export function renderCustomOrder() {
  return `
    <div class="page-header">
      <div class="container">
        <span class="section-subtitle">Bespoke Floral Arrangements</span>
        <h1>Custom Orders</h1>
        <p>Recreate reference photos in our unique handcrafted artistic style</p>
      </div>
    </div>

    <section class="section" style="padding-top: var(--space-xl);">
      <div class="container container-narrow">
        <div class="custom-order-card">
          <div style="margin-bottom: var(--space-xl); text-align: center;">
            <p style="color: var(--text-secondary);">
              Whether you have a specific design in mind or want us to recreate an inspiration photo, 
              we're here to bring your vision to life.
            </p>
          </div>

          <form id="custom-order-form">
            <!-- Contact Details -->
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input type="text" id="cust-name" required placeholder="Enter your full name" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">WhatsApp Number *</label>
                <input type="tel" id="cust-phone" required placeholder="e.g. 9876543210" />
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" id="cust-email" placeholder="e.g. example@gmail.com" />
              </div>
            </div>

            <!-- Customization Details -->
            <div class="form-group">
              <label class="form-label">Floral Variety Preference</label>
              <select id="cust-variety">
                <option value="">Select a flower type (Optional)</option>
                <option value="Roses">Roses</option>
                <option value="Lilies">Lilies</option>
                <option value="Tulips">Tulips</option>
                <option value="Hydrangeas">Hydrangeas</option>
                <option value="Sunflowers">Sunflowers</option>
                <option value="Gerbera Daisies">Gerbera Daisies</option>
                <option value="Canterbury Bells">Canterbury Bells</option>
                <option value="Orchids">Orchids</option>
                <option value="Lotus">Lotus</option>
                <option value="Hibiscus">Hibiscus</option>
                <option value="Lily of the Valley">Lily of the Valley</option>
                <option value="Poppies">Poppies</option>
                <option value="Baby's Breath">Baby's Breath</option>
                <option value="Chrysanthemums">Chrysanthemums</option>
                <option value="Lavender">Lavender</option>
                <option value="Other">Other / Multiple (Specify below)</option>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Bouquet Size / Budget</label>
                <select id="cust-budget">
                  <option value="">Select size/budget (Optional)</option>
                  <option value="Standard Size (₹500 - ₹1000)">Standard Size (₹500 - ₹1000)</option>
                  <option value="Medium Size (₹1000 - ₹2000)">Medium Size (₹1000 - ₹2000)</option>
                  <option value="Luxurious / Large (₹2000+)">Luxurious / Large (₹2000+)</option>
                  <option value="Custom Budget">Custom Budget (Specify below)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Enhancements</label>
                <div style="display: flex; gap: var(--space-md); margin-top: var(--space-xs); flex-wrap: wrap;">
                  <label style="display:flex; align-items:center; gap:var(--space-xs); font-size:var(--fs-sm); cursor:pointer;">
                    <input type="checkbox" id="cust-lights" style="width:auto;" /> Fairy Lights
                  </label>
                  <label style="display:flex; align-items:center; gap:var(--space-xs); font-size:var(--fs-sm); cursor:pointer;">
                    <input type="checkbox" id="cust-pearls" style="width:auto;" /> Pearls
                  </label>
                  <label style="display:flex; align-items:center; gap:var(--space-xs); font-size:var(--fs-sm); cursor:pointer;">
                    <input type="checkbox" id="cust-note" style="width:auto;" /> Hand Note
                  </label>
                </div>
              </div>
            </div>

            <!-- Image Upload -->
            <div class="form-group">
              <label class="form-label">Reference Image (Photo of design you want to recreate)</label>
              <div class="upload-area" id="upload-zone">
                <div class="upload-icon">📷</div>
                <div class="upload-text">Click to upload your reference image</div>
                <div class="upload-hint">JPG, PNG, JPEG allowed</div>
                <input type="file" id="cust-file" accept="image/*" style="display:none;" />
                <div id="file-preview" style="margin-top:var(--space-md); display:none;">
                  <img id="preview-img" src="" style="max-height:150px; margin:0 auto; border-radius:var(--radius-md);" />
                  <p id="file-name" style="margin-top:var(--space-sm); font-size:var(--fs-xs); color:var(--accent-primary); font-weight:bold;"></p>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Detailed Description of Customization</label>
              <textarea id="cust-desc" placeholder="Describe what color themes, layout styles, and details you want in your custom arrangement..." rows="4"></textarea>
            </div>

            <div style="margin-top: var(--space-2xl);">
              <button type="submit" class="btn btn-primary btn-lg" style="width:100%;">
                Submit Order Request (Via WhatsApp)
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;
}

// Bind custom page events
document.addEventListener('click', (e) => {
  const zone = e.target.closest('#upload-zone');
  if (zone && e.target.id !== 'cust-file') {
    document.getElementById('cust-file')?.click();
  }
});

document.addEventListener('change', (e) => {
  if (e.target.id === 'cust-file') {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const preview = document.getElementById('file-preview');
        const img = document.getElementById('preview-img');
        const name = document.getElementById('file-name');
        if (preview && img && name) {
          img.src = event.target.result;
          name.textContent = file.name;
          preview.style.display = 'block';
        }
      };
      reader.readAsDataURL(file);
    }
  }
});

document.addEventListener('submit', async (e) => {
  if (e.target.id === 'custom-order-form') {
    e.preventDefault();

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const email = document.getElementById('cust-email').value;
    const variety = document.getElementById('cust-variety').value;
    const budget = document.getElementById('cust-budget').value;
    const desc = document.getElementById('cust-desc').value;

    const lights = document.getElementById('cust-lights').checked;
    const pearls = document.getElementById('cust-pearls').checked;
    const note = document.getElementById('cust-note').checked;

    // Get reference image as base64 if uploaded
    let referenceImage = null;
    const fileInput = document.getElementById('cust-file');
    if (fileInput?.files?.[0]) {
      const previewImg = document.getElementById('preview-img');
      if (previewImg?.src) {
        referenceImage = previewImg.src; // Already a data URL from FileReader
      }
    }

    // Save inquiry to localStorage (persist for admin panel)
    try {
      db.addInquiry({
        name, phone, email, variety, budget,
        enhancements: { fairyLights: lights, pearls, handNote: note },
        description: desc,
        referenceImage
      });
    } catch (err) {
      console.warn('Could not save inquiry to local storage:', err);
    }

    // Format WhatsApp message with only filled fields
    let message = `Hello Amra's Studio! I'd like to place a Custom Order request.

📋 *Customer Details*
Name: ${name}
Phone: ${phone}`;

    if (email) {
      message += `\nEmail: ${email}`;
    }

    let specs = [];
    if (variety) specs.push(`Variety: ${variety}`);
    if (budget) specs.push(`Size/Budget: ${budget}`);

    let activeEnhancements = [];
    if (lights) activeEnhancements.push('Fairy Lights');
    if (pearls) activeEnhancements.push('Pearls');
    if (note) activeEnhancements.push('Custom Note');
    
    if (activeEnhancements.length > 0) {
      specs.push(`Enhancements: ${activeEnhancements.join(', ')}`);
    }

    if (specs.length > 0) {
      message += `\n\n🌸 *Customization Details*\n${specs.join('\n')}`;
    }

    if (desc) {
      message += `\n\n📝 *Description:*\n${desc}`;
    }

    if (referenceImage) {
      message += `\n\n*(Note: Custom order includes reference image upload)*`;
    }

    const encoded = encodeURIComponent(message);
    const settings = db.getSettings() || {};
    const rawNum = settings.whatsapp || '917387920392';
    const cleanNum = rawNum.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanNum}?text=${encoded}`;

    window.open(whatsappUrl, '_blank');
  }
});

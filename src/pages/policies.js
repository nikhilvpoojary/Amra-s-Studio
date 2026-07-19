// Policies Page
import { privacyPolicy, termsConditions } from '../data/faq.js';

export function renderPolicies() {
  return `
    <div class="page-header">
      <div class="container">
        <span class="section-subtitle">Legal & Safety</span>
        <h1>Privacy & Operations Policy</h1>
        <p>Official guidelines, terms, and conditions of Amra's Studio</p>
      </div>
    </div>

    <section class="section">
      <div class="container container-narrow">
        <!-- Privacy Policy -->
        <div style="background:var(--bg-card); padding:var(--space-2xl); border-radius:var(--radius-lg); box-shadow:var(--shadow-sm); margin-bottom:var(--space-2xl);">
          <h2 style="font-size:var(--fs-2xl); margin-bottom:var(--space-md); border-bottom:2px solid var(--color-peach-protein); padding-bottom:var(--space-xs); font-family: var(--font-heading); font-style: italic; font-weight: var(--fw-semibold);">Privacy Policy Summary</h2>
          <p style="color:var(--text-secondary); line-height:var(--lh-relaxed); font-size:var(--fs-md); margin-bottom:0;">
            ${privacyPolicy}
          </p>
        </div>

        <!-- Terms & Conditions -->
        <div style="background:var(--bg-card); padding:var(--space-2xl); border-radius:var(--radius-lg); box-shadow:var(--shadow-sm);">
          <h2 style="font-size:var(--fs-2xl); margin-bottom:var(--space-md); border-bottom:2px solid var(--color-peach-protein); padding-bottom:var(--space-xs); font-family: var(--font-heading); font-style: italic; font-weight: var(--fw-semibold);">Terms & Conditions Guidelines</h2>
          
          <ul style="display:flex; flex-direction:column; gap:var(--space-md); margin-top:var(--space-lg);">
            ${termsConditions.map(term => `
              <li style="display:flex; gap:var(--space-md); font-size:var(--fs-md); line-height:var(--lh-relaxed); color:var(--text-secondary);">
                <span style="color:var(--accent-primary); font-size:var(--fs-lg); line-height:1;">🌸</span>
                <span>${term}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </section>
  `;
}

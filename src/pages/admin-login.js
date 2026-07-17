// Admin Login Page
import { loginAdmin, isAdminLoggedIn } from '../main.js';

export function renderAdminLogin() {
  if (isAdminLoggedIn()) {
    setTimeout(() => { window.location.hash = 'admin-dashboard'; }, 100);
    return `<div class="page-header"><div class="container"><h1>Redirecting...</h1></div></div>`;
  }

  return `
    <div class="page-header">
      <div class="container">
        <span class="section-subtitle">Secure Access Control</span>
        <h1>Admin Gateway</h1>
        <p>Enter credentials to access the studio control panel</p>
      </div>
    </div>

    <section class="section">
      <div class="container container-narrow">
        <div style="background:var(--bg-card); padding:var(--space-2xl); border-radius:var(--radius-lg); box-shadow:var(--shadow-md); max-width:420px; margin: 0 auto;">
          <h3 class="text-center" style="margin-bottom:var(--space-lg); font-size:var(--fs-xl);">Merchant Login</h3>
          
          <form id="admin-login-form">
            <div class="form-group">
              <label class="form-label">Merchant Email</label>
              <input type="email" id="adm-email" required value="amrasstudio.co@gmail.com" readonly style="background:var(--bg-secondary); cursor:not-allowed;" />
            </div>

            <div class="form-group">
              <label class="form-label">Secret Password *</label>
              <input type="password" id="adm-pass" required placeholder="••••••••" />
            </div>

            <div id="login-error" style="color:#d32f2f; font-size:var(--fs-sm); font-weight:600; margin-bottom:var(--space-md); display:none; text-align:center;">
              ❌ Invalid administrator credentials. Please try again.
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%;">Authenticate & Access Portal</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

document.addEventListener('submit', (e) => {
  if (e.target.id === 'admin-login-form') {
    e.preventDefault();
    const pass = document.getElementById('adm-pass').value;
    const errorEl = document.getElementById('login-error');

    if (loginAdmin(pass)) {
      window.location.hash = 'admin-dashboard';
    } else {
      if (errorEl) errorEl.style.display = 'block';
    }
  }
});

// Admin Login & Password Reset Page
import {
  isAdminLoggedIn,
  verifyAdminWhatsAppReset,
  resetAdminPassword,
  getAdminCredentials
} from '../main.js';

let resetState = {
  email: '',
  phone: '',
  verified: false
};

export function renderAdminLogin() {
  if (isAdminLoggedIn()) {
    setTimeout(() => { window.location.hash = 'admin-dashboard'; }, 100);
    return `<div class="page-header"><div class="container"><h1>Redirecting...</h1></div></div>`;
  }

  // Check if redirected after credential update
  const credUpdated = sessionStorage.getItem('amras_cred_updated');
  if (credUpdated) {
    sessionStorage.removeItem('amras_cred_updated');
  }

  // Reset state
  resetState = { email: '', phone: '', verified: false };

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
        <div style="background:var(--bg-card); padding:var(--space-2xl); border-radius:var(--radius-lg); box-shadow:var(--shadow-md); max-width:420px; margin: 0 auto; position: relative;">
          
          <!-- LOGIN WRAPPER -->
          <div id="login-wrapper">
            <h3 class="text-center" style="margin-bottom:var(--space-lg); font-size:var(--fs-xl); font-family: 'Cormorant Garamond', serif;">Merchant Login</h3>
            
            ${credUpdated ? `
              <div class="admin-login-banner">
                ✅ Credentials updated successfully — please log in with your new credentials.
              </div>
            ` : ''}

            <form id="admin-login-form">
              <div class="form-group">
                <label class="form-label">Merchant Email</label>
                <input type="email" id="adm-email" required placeholder="Enter your admin email" />
              </div>

              <div class="form-group">
                <label class="form-label">Secret Password *</label>
                <input type="password" id="adm-pass" required placeholder="••••••••" />
              </div>

              <div id="login-error" style="color:#893941; font-size:var(--fs-sm); font-weight:600; margin-bottom:var(--space-md); display:none; text-align:center; background:rgba(203,120,133,0.1); padding:0.5rem; border-radius:6px;">
              </div>

              <div id="login-loading" style="display:none; text-align:center; margin-bottom:var(--space-md); color:var(--text-muted); font-size:var(--fs-sm);">
                Authenticating...
              </div>

              <button type="submit" class="btn btn-primary" style="width:100%;" id="login-submit-btn">Authenticate & Access Portal</button>
            </form>

            <div style="text-align: center; margin-top: var(--space-lg);">
              <a href="#" id="forgot-password-link" style="font-size: 0.8rem; color: #CB7885; text-decoration: none; font-weight: 600; transition: color 0.2s;">Forgot password?</a>
            </div>
          </div>

          <!-- PASSWORD RESET WRAPPER (INITIALLY HIDDEN) -->
          <div id="reset-wrapper" style="display: none;">
            <h3 class="text-center" style="margin-bottom:var(--space-lg); font-size:var(--fs-xl); font-family: 'Cormorant Garamond', serif;">Reset Password</h3>
            
            <div id="reset-error" style="color:#893941; font-size:var(--fs-sm); font-weight:600; margin-bottom:var(--space-md); display:none; text-align:center; background:rgba(203,120,133,0.1); padding:0.5rem; border-radius:6px;">
            </div>

            <div id="reset-success" style="color:#5E6623; font-size:var(--fs-sm); font-weight:600; margin-bottom:var(--space-md); display:none; text-align:center; background:rgba(194,195,149,0.15); padding:0.5rem; border-radius:6px;">
            </div>

            <!-- Step 1: Verify WhatsApp Number -->
            <form id="reset-step1-form">
              <div class="form-group">
                <label class="form-label">Registered WhatsApp Number</label>
                <input type="tel" id="reset-phone" required placeholder="e.g. 917387920392" />
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%;">Verify Phone Number</button>
            </form>

            <!-- Step 2: Enter New Password (Hidden initially) -->
            <form id="reset-step2-form" style="display: none;">
              <div class="form-group">
                <label class="form-label">New Password</label>
                <input type="password" id="reset-new-pass" required placeholder="Min 8 characters" minlength="8" />
              </div>
              <div class="form-group">
                <label class="form-label">Confirm New Password</label>
                <input type="password" id="reset-confirm-pass" required placeholder="Re-enter password" />
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%;">Save Password</button>
            </form>

            <div style="text-align: center; margin-top: var(--space-lg);">
              <a href="#" id="back-to-login-link" style="font-size: 0.8rem; color: #818263; text-decoration: none; font-weight: 600; transition: color 0.2s;">← Back to Login</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;
}

// Delegate events
document.addEventListener('click', (e) => {
  if (e.target.id === 'forgot-password-link') {
    e.preventDefault();
    document.getElementById('login-wrapper').style.display = 'none';
    document.getElementById('reset-wrapper').style.display = 'block';
    
    // Reset forms
    document.getElementById('reset-error').style.display = 'none';
    document.getElementById('reset-success').style.display = 'none';
    document.getElementById('reset-step1-form').style.display = 'block';
    document.getElementById('reset-step2-form').style.display = 'none';
    document.getElementById('reset-phone').value = '';
    return;
  }

  if (e.target.id === 'back-to-login-link') {
    e.preventDefault();
    document.getElementById('login-wrapper').style.display = 'block';
    document.getElementById('reset-wrapper').style.display = 'none';
    return;
  }
});

document.addEventListener('submit', async (e) => {
  // Login Form
  if (e.target.id === 'admin-login-form') {
    e.preventDefault();

    const email = document.getElementById('adm-email').value;
    const pass = document.getElementById('adm-pass').value;
    const errorEl = document.getElementById('login-error');
    const loadingEl = document.getElementById('login-loading');
    const submitBtn = document.getElementById('login-submit-btn');

    if (errorEl) errorEl.style.display = 'none';
    if (loadingEl) loadingEl.style.display = 'block';
    if (submitBtn) submitBtn.disabled = true;

    try {
      const { loginAdmin } = await import('../main.js');
      const success = await loginAdmin(email, pass);

      if (success) {
        window.location.hash = 'admin-dashboard';
      } else {
        if (errorEl) {
          errorEl.textContent = `❌ Invalid email or password. Please try again.`;
          errorEl.style.display = 'block';
        }
      }
    } catch (err) {
      if (errorEl) {
        errorEl.textContent = '❌ An unexpected error occurred. Please try again.';
        errorEl.style.display = 'block';
      }
    } finally {
      if (loadingEl) loadingEl.style.display = 'none';
      if (submitBtn) submitBtn.disabled = false;
    }
    return;
  }

  // Reset Step 1: Verification
  if (e.target.id === 'reset-step1-form') {
    e.preventDefault();
    const phone = document.getElementById('reset-phone').value;
    const errorEl = document.getElementById('reset-error');
    if (errorEl) errorEl.style.display = 'none';

    const verified = verifyAdminWhatsAppReset(phone);
    if (verified) {
      resetState.phone = phone;
      resetState.verified = true;
      
      // Update view
      document.getElementById('reset-step1-form').style.display = 'none';
      document.getElementById('reset-step2-form').style.display = 'block';
      document.getElementById('reset-new-pass').value = '';
      document.getElementById('reset-confirm-pass').value = '';
    } else {
      if (errorEl) {
        errorEl.textContent = "Phone number doesn't match our records";
        errorEl.style.display = 'block';
      }
    }
    return;
  }

  // Reset Step 2: Save Password
  if (e.target.id === 'reset-step2-form') {
    e.preventDefault();
    const errorEl = document.getElementById('reset-error');
    const successEl = document.getElementById('reset-success');
    if (errorEl) errorEl.style.display = 'none';
    if (successEl) successEl.style.display = 'none';

    const newPass = document.getElementById('reset-new-pass').value;
    const confirmPass = document.getElementById('reset-confirm-pass').value;

    if (newPass.length < 8) {
      if (errorEl) {
        errorEl.textContent = '❌ New password must be at least 8 characters long.';
        errorEl.style.display = 'block';
      }
      return;
    }

    if (newPass !== confirmPass) {
      if (errorEl) {
        errorEl.textContent = '❌ Passwords do not match.';
        errorEl.style.display = 'block';
      }
      return;
    }

    try {
      const email = getAdminCredentials().email;
      await resetAdminPassword(email, newPass);
      if (successEl) {
        successEl.textContent = '✅ Password reset successfully! Please log in.';
        successEl.style.display = 'block';
      }
      document.getElementById('reset-step2-form').style.display = 'none';
      
      // Go back to login form after 2 seconds
      setTimeout(() => {
        document.getElementById('login-wrapper').style.display = 'block';
        document.getElementById('reset-wrapper').style.display = 'none';
      }, 2000);
    } catch (err) {
      if (errorEl) {
        errorEl.textContent = `❌ ${err.message || 'Failed to reset password.'}`;
        errorEl.style.display = 'block';
      }
    }
    return;
  }
});

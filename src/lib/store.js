import { products as defaultProducts } from '../data/products.js';

// Default constants
const DEFAULT_CREDENTIALS = {
  email: 'amrasstudio.co@gmail.com',
  displayName: 'Ayesha Amra',
  passwordHash: '17b8ac59d3e9087c22b81f47c9903b2ece341d83df1c42b2231aee3f5cf3ae6f' // SHA-256 of amra2025
};

const DEFAULT_SETTINGS = {
  whatsapp: '917387920392',
  email: 'Amrasstudio.co@gmail.com',
  address: 'Margao, Goa, India, 403707',
  instagram: 'https://instagram.com/amrasstudio.co',
  youtube: 'https://youtube.com/@amrasstudio'
};
const DEFAULT_INQUIRIES = [];

// Initialize localStorage on first load
if (!localStorage.getItem('amras_products')) {
  localStorage.setItem('amras_products', JSON.stringify(defaultProducts));
}
const currentCreds = localStorage.getItem('amras_admin_credentials');
let credsValid = false;
try {
  if (currentCreds) {
    const parsed = JSON.parse(currentCreds);
    if (parsed && parsed.passwordHash && parsed.email) {
      credsValid = true;
    }
  }
} catch (e) {}

if (!credsValid) {
  localStorage.setItem('amras_admin_credentials', JSON.stringify(DEFAULT_CREDENTIALS));
}
if (!localStorage.getItem('amras_settings')) {
  localStorage.setItem('amras_settings', JSON.stringify(DEFAULT_SETTINGS));
}
if (!localStorage.getItem('amras_inquiries')) {
  localStorage.setItem('amras_inquiries', JSON.stringify([]));
} else {
  try {
    const currentInq = localStorage.getItem('amras_inquiries');
    if (currentInq) {
      const parsed = JSON.parse(currentInq);
      const filtered = parsed.filter(i => !['Nisha Rao', 'Aman Hegde', 'Diya D\'Souza', 'Karan Kamat'].includes(i.name));
      localStorage.setItem('amras_inquiries', JSON.stringify(filtered));
    }
  } catch (e) {}
}

// Database helper object
export const db = {
  // Products Catalog
  getProducts() {
    return JSON.parse(localStorage.getItem('amras_products')) || defaultProducts;
  },
  saveProducts(productsList) {
    localStorage.setItem('amras_products', JSON.stringify(productsList));
    
    // Dynamically update the in-memory array reference exported from products.js
    import('../data/products.js').then(mod => {
      if (mod.saveProductsToStorage) {
        mod.saveProductsToStorage(productsList);
      }
    });
  },

  // Inquiries Logs
  getInquiries() {
    return JSON.parse(localStorage.getItem('amras_inquiries')) || [];
  },
  saveInquiries(inquiriesList) {
    localStorage.setItem('amras_inquiries', JSON.stringify(inquiriesList));
  },
  addInquiry(inqData) {
    const inquiries = this.getInquiries();
    const newInq = {
      id: inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id)) + 1 : 1,
      date: new Date().toISOString(),
      name: inqData.name,
      phone: inqData.phone,
      email: inqData.email || '',
      variety: inqData.variety || 'Any',
      budget: inqData.budget || 'Standard',
      enhancements: inqData.enhancements || {},
      description: inqData.description,
      referenceImage: inqData.referenceImage || null,
      status: 'Pending',
      notes: ''
    };
    inquiries.unshift(newInq);
    this.saveInquiries(inquiries);
    return newInq;
  },
  updateInquiryStatus(id, status, notes) {
    const inquiries = this.getInquiries();
    const idx = inquiries.findIndex(i => i.id === id);
    if (idx !== -1) {
      if (status) inquiries[idx].status = status;
      if (notes !== undefined) inquiries[idx].notes = notes;
      this.saveInquiries(inquiries);
      return inquiries[idx];
    }
    return null;
  },

  // Store Settings
  getSettings() {
    return JSON.parse(localStorage.getItem('amras_settings')) || DEFAULT_SETTINGS;
  },
  saveSettings(settingsData) {
    localStorage.setItem('amras_settings', JSON.stringify(settingsData));
  },

  // Admin Credentials
  getAdminProfile() {
    const creds = this.getCredentials();
    return creds ? { email: creds.email, displayName: creds.displayName } : null;
  },
  getCredentials() {
    return JSON.parse(localStorage.getItem('amras_admin_credentials')) || DEFAULT_CREDENTIALS;
  },
  saveCredentials(credentialsData) {
    localStorage.setItem('amras_admin_credentials', JSON.stringify(credentialsData));
  },
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },
  async verifyLogin(email, password) {
    const creds = this.getCredentials();
    const hash = await this.hashPassword(password);
    return creds && creds.email.toLowerCase() === email.toLowerCase() && creds.passwordHash === hash;
  },
  async changeCredentials(currentPassword, newEmail, newPassword, displayName) {
    const creds = this.getCredentials();
    const currentHash = await this.hashPassword(currentPassword);
    
    if (creds.passwordHash !== currentHash) {
      throw new Error('Current password is incorrect');
    }

    if (newEmail) {
      if (!newEmail.includes('@')) throw new Error('Invalid email format');
      creds.email = newEmail;
    }
    if (displayName) {
      creds.displayName = displayName.trim();
    }
    if (newPassword) {
      if (newPassword.length < 8) throw new Error('New password must be at least 8 characters long');
      creds.passwordHash = await this.hashPassword(newPassword);
    }
    this.saveCredentials(creds);
    return true;
  },
  verifyWhatsAppReset(phone) {
    const settings = this.getSettings() || {};
    const settingsPhone = settings.whatsapp || settings.whatsappNumber || '';
    const cleanSettingsPhone = settingsPhone.replace(/\D/g, '');
    const cleanInputPhone = (phone || '').replace(/\D/g, '');
    return cleanSettingsPhone === cleanInputPhone && cleanSettingsPhone.length > 0;
  },
  async resetPassword(email, newPassword) {
    const creds = this.getCredentials();
    if (creds.email.toLowerCase() !== email.toLowerCase()) {
      throw new Error('Email does not match stored credentials');
    }
    if (newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long');
    }
    creds.passwordHash = await this.hashPassword(newPassword);
    this.saveCredentials(creds);
    return true;
  }
};

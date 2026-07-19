# Amra's Studio — Everlasting Handcrafted Blooms

A premium, highly interactive client-facing storefront and stand-alone authorized operations panel for **Amra's Studio**. The studio creates handcrafted pipe cleaner flowers, bouquets, and custom floral arrangements designed to last forever. 

This project is built using a **serverless, local-first Single Page Application (SPA)** architecture, allowing it to be hosted on any static hosting provider (e.g., Vercel, Netlify, or GitHub Pages) with zero backend setup.

---

## 🌸 Key Features

### Storefront (Client-facing)
- **Interactive Home Page**: Features an elegant floating hero illustration (`/images/home.png`), interactive category catalogs, customizable flower cards, and ambient floating rosebud/leaf animations.
- **Dynamic Shop Grid**: Reads live catalog data from browser storage, calculates category counts in real time, and supports dynamic filtering and sorting.
- **Shopping Cart & Checkout**: Allows clients to add items, customize quantities, and proceed to a structured checkout form that routes order requests.
- **Custom Orders**: Fully integrated custom design form. Users can specify variety, sizes/budgets, and enhancements (fairy lights, pearls, custom notes), upload a reference image, and submit the order request directly to the studio's WhatsApp.
- **Responsive Layout**: Designed for visual excellence and mobile-friendly tap heights on both desktop and simulated mobile viewports (375px/390px).

### Operations Panel (Authorized Merchant Dashboard)
- **Standalone Layout**: Renders independently without storefront navigation or footer offsets, occupying the full screen layout.
- **Secure Gatekeeper Login**: LocalStorage & sessionStorage auth checks utilizing SHA-256 hashed password verification.
- **WhatsApp Password Reset**: A secure 2-step forgot-password workflow. The merchant verifies access by entering their registered WhatsApp phone number; if validated, they can immediately set and save a new password.
- **Dashboard Stats Tab**: Provides real-time metrics including total inquiries, catalog items on file, out-of-stock counts, and the current contact number.
- **Product Catalog Tab**: Full CRUD support. Add new flowers, upload pictures, edit pricing/categories/customization toggles, or delete items instantly.
- **Inquiry Logs Tab**: Review customer order requests (including Custom Order reference images) and update status (Pending, Contacted, Completed) with notes.
- **Store Settings Tab**: Manage store-facing contact email, address, and social links (Instagram/YouTube), and update administrative credentials (email, password, display name) via secure current-password confirmation.

---

## 🛠️ Technology Stack & Architecture

- **Core Framework**: HTML5 + Vanilla JS SPA with hash-based routing (`src/main.js`).
- **Styling**: Pure CSS3 variables with curated pastel palettes (Rose Pink `#CB7885`, Olive Green `#5E6623`, Cream `#FFFAF2`).
- **Database Layer (`src/lib/store.js`)**: A unified local storage client-side database (`amras_db`) that handles database seeding, inquiries, store settings, credentials, and self-heals the product catalog on startup if storage format corruption is detected.
- **Assets**: 
  - Brand-branded rose vector logo (`/images/logo.png`) and transparent hero bouquet (`/images/home.png`).
  - Catalog photos compressed and rotated upright applying EXIF sensor transpositions (`PIL.ImageOps.exif_transpose`).
  - High-fidelity vector SVG icon graphics for platforms (Instagram multi-color gradient, YouTube red play, Sidebar Lucide-style menu paths).

---

## 🚀 How to Install & Run Locally

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended) to run the development environment.

### 2. Installation
Clone the repository, navigate into the project directory, and install the package dependencies:
```bash
# Clone the repository
git clone <repository-url>
cd arman-st

# Install dependencies (Vite)
npm install
```

### 3. Run the Development Server
Launch the local Vite server to run and preview the site interactively:
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:5173`** (or the port specified in your terminal output).

### 4. Build for Production
To bundle and compile optimized, static assets ready for deployment:
```bash
npm run build
```
The compiled files will be created inside the **`dist/`** directory.

### 5. Preview Production Build
To run and preview the static production output locally:
```bash
npm run preview
```

---

## 📂 Project Structure

```text
arman-st/
├── dist/                  # Compiled production files (after npm run build)
├── public/
│   └── images/            # Product images, logos, and floating flower assets
├── src/
│   ├── components/        # Shared components (Navbar, Footer)
│   ├── data/              # Static backups & default catalog data
│   ├── lib/               # Database management (store.js) and password hash helpers
│   ├── pages/             # Page view modules (Home, Shop, Admin Panel, Custom Order, etc.)
│   ├── styles/            # Styling sheets (global.css, components.css, admin.css, variables.css)
│   └── main.js            # Main router, event bindings, and app entry point
├── index.html             # Application entry point
├── package.json           # Scripts and Vite dependencies
└── README.md              # Project documentation
```

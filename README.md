# Aria Noire Scents — Showcase Website & WhatsApp Order Builder

An upscale, mobile-first luxury fragrance showcase website built for **Aria Noire Scents**, a niche perfumery based in Lavington, Nairobi, Kenya.

- **Brand Tagline**: *"Elegance In Every Note"*
- **Order Phone**: `+254 719 758 280`
- **Fulfillment**: Home Delivery & Pickup Mtaani Collection

---

## 🌟 Key Features

1. **Mobile-First Luxury Design System**: Designed ground-up for 375px mobile viewports (Instagram bio link traffic), scaling up smoothly to desktop. Deep obsidian charcoal background (`#0E0D0C`), gold foil accents (`#C9A24B`), and warm cashmere cream typography (`#F4EFE4`).
2. **Interactive Catalog & Filters**: Instant category filtering (**All / Women / Men / Unisex**) without page reloads.
3. **WhatsApp Order Selection Tray (Cart)**:
   - Tap "+ Add to Selection" to accumulate fragrances into a slide-up bottom sheet drawer.
   - Adjust quantities or remove items.
   - Tap **"Send Order via WhatsApp"** to generate a single pre-filled message sent directly to `+254 719 758 280`.
   - Tap direct WhatsApp icon on any product card for instant single-product ordering.
4. **Zero Backend Required**: Static HTML5/CSS3/JavaScript — fast loading, no database maintenance, no payment gateways.

---

## 📁 File Structure

```
aria-noire/
├── index.html              # Main HTML structure with semantic sections and meta tags
├── styles.css              # Mobile-first CSS design system and animations
├── script.js               # Dynamic catalog rendering, cart tray logic, WhatsApp formatter
├── products.js             # Product catalog data file (easy to update)
├── README.md               # Operations and client maintenance guide
└── images/                 # Image assets
    ├── logo.jpg            # Brand logo badge
    ├── products/           # Product photos (an-001.jpg - an-008.jpg)
    └── instagram/          # Instagram showcase images (insta-1.jpg - insta-4.jpg)
```

---

## 🛠️ Client Operations & Maintenance Guide

### 1. How to Add, Edit, or Remove Products

All catalog items are managed in **`products.js`**. You do not need to edit HTML code to update your products!

Open `products.js` in any text editor. You will see an array of product objects:

```js
const products = [
  {
    id: "an-001",                   // Unique ID for the product
    name: "Noire Élan",              // Product Name
    category: "women",             // "women" | "men" | "unisex"
    size: "50ml EDP",              // Bottle volume & concentration
    notes: "Black Amber · Damask Rose · Vanilla Bean", // Scent summary
    price: 6800,                   // Price in KES (numeric, no commas)
    image: "images/products/an-001.jpg", // Path to product photo
    featured: true                 // true shows "Signature Scent" badge
  },
  // ...more products
];
```

- **To change a price**: Update `price: 6800` to your new price in KES.
- **To add a new product**: Copy one of the product blocks, paste it at the end of the array, and assign a unique `id` (e.g. `"an-009"`).
- **To add product photos**: Save your high-resolution product photo inside `images/products/` (e.g. `images/products/my-new-perfume.jpg`) and update the `image` field in `products.js`.

---

### 2. How to Update the WhatsApp Order Phone Number

If you ever change your official WhatsApp business number:

1. Open **`script.js`** and locate line 7:
   ```js
   const WHATSAPP_NUMBER = '254719758280';
   ```
   Replace `'254719758280'` with your new number including the country code (without leading `+` or spaces).

2. Open **`index.html`** and search for `wa.me/254719758280`. Update the link URLs and displayed text to match your new number.

---

### 3. How to Update the "Our Story" Section Copy

Open **`index.html`** and scroll down to `<section class="about-section" id="about">`.
Update the `<p class="about-paragraph">` text and the `blockquote` quote with the founder's real brand narrative.

---

## 🚀 How to Deploy to GitHub Pages

1. **Initialize Git & Commit**:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Aria Noire Scents showcase website"
   ```

2. **Push to GitHub**:
   Create a new public repository on GitHub named `aria-noire-scents` (or similar), then run:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/aria-noire-scents.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`, then click **Save**.
   - Within 1–2 minutes, your website will be live at:
     `https://YOUR_USERNAME.github.io/aria-noire-scents/`

---

## 💡 Notes for Client / Open Items

- [ ] **Product Photos**: Replace placeholder images in `images/products/` with high-resolution studio photos of real bottles.
- [ ] **Exact Pricing**: Update `products.js` with exact per-item prices (confirmed range: KES 4,000 – KES 9,500).
- [ ] **Custom Domain**: (Optional) Connect a custom domain (e.g. `arianoirescents.com`) in GitHub Pages settings.

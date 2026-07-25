/**
 * Aria Noire Scents - Core Application Logic
 * Product Catalog Rendering, Category Filtering, Order Tray & WhatsApp Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  const WHATSAPP_NUMBER = '254746714789';
  let activeCategory = 'all';
  let orderTray = loadTrayState();

  // DOM Elements
  const productsGrid = document.getElementById('productsGrid');
  const categoryTabs = document.querySelectorAll('.category-tab');
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const cartCountBadge = document.getElementById('cartCountBadge');
  const trayOverlay = document.getElementById('trayOverlay');
  const trayCloseBtn = document.getElementById('trayCloseBtn');
  const trayBody = document.getElementById('trayBody');
  const trayTotalVal = document.getElementById('trayTotalVal');
  const traySendWhatsappBtn = document.getElementById('traySendWhatsappBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const header = document.getElementById('header');

  // Initialize UI
  renderProducts();
  updateTrayUI();
  initScrollHeader();
  initScrollReveals();
  initMobileMenu();

  /* --------------------------------------------------------------------------
     1. Product Catalog & Category Filtering
     -------------------------------------------------------------------------- */
  function renderProducts() {
    if (!productsGrid) return;
    
    // Filter products by selected category
    const filteredProducts = activeCategory === 'all' 
      ? products 
      : products.filter(p => p.category === activeCategory);

    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-dark-muted);">
          <p>No products found in this category.</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => {
      const isSelected = orderTray.some(item => item.id === product.id);
      return `
        <article class="product-card reveal" data-id="${product.id}">
          <div class="product-image-container">
            ${product.featured ? '<span class="product-badge">Signature Scent</span>' : ''}
            <img src="${product.image}" alt="${product.name} - Aria Noire Scents" loading="lazy">
          </div>
          <div class="product-info">
            <div class="product-meta">
              <span class="product-category">${product.category}</span>
              <span class="product-size">${product.size}</span>
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-notes">${product.notes}</p>
            <div class="product-price">${formatKES(product.price)}</div>
            <div class="product-actions">
              <button class="btn-add-tray ${isSelected ? 'added' : ''}" data-id="${product.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  ${isSelected 
                    ? '<path d="M20 6L9 17l-5-5"/>' 
                    : '<path d="M12 5v14M5 12h14"/>'}
                </svg>
                <span>${isSelected ? 'In Selection' : 'Add to Selection'}</span>
              </button>
              <button class="btn-direct-order" data-id="${product.id}" title="Order via WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Re-attach card button listeners
    attachCardListeners();
    initScrollReveals();
  }

  // Filter Category Tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category;
      renderProducts();
    });
  });

  function attachCardListeners() {
    // Add to Tray button
    document.querySelectorAll('.btn-add-tray').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.dataset.id;
        toggleTrayItem(id);
      });
    });

    // Single item instant WhatsApp order button
    document.querySelectorAll('.btn-direct-order').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.dataset.id;
        sendSingleWhatsAppOrder(id);
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. Order Selection Tray Management
     -------------------------------------------------------------------------- */
  function toggleTrayItem(productId) {
    const existingIndex = orderTray.findIndex(item => item.id === productId);
    const product = products.find(p => p.id === productId);

    if (!product) return;

    if (existingIndex > -1) {
      orderTray.splice(existingIndex, 1);
      showToast(`Removed "${product.name}" from your selection tray.`);
    } else {
      orderTray.push({
        id: product.id,
        name: product.name,
        size: product.size,
        price: product.price,
        image: product.image,
        qty: 1
      });
      showToast(`Added "${product.name}" to your selection tray.`);
    }

    saveTrayState();
    updateTrayUI();
    renderProducts();
  }

  function updateQty(productId, delta) {
    const item = orderTray.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      orderTray = orderTray.filter(i => i.id !== productId);
    }

    saveTrayState();
    updateTrayUI();
    renderProducts();
  }

  function updateTrayUI() {
    // Count total items
    const totalCount = orderTray.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = orderTray.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Update Badge
    if (cartCountBadge) {
      cartCountBadge.textContent = totalCount;
      if (totalCount > 0) {
        cartCountBadge.classList.add('bump');
        setTimeout(() => cartCountBadge.classList.remove('bump'), 300);
      }
    }

    // Update Total Price display
    if (trayTotalVal) {
      trayTotalVal.textContent = formatKES(totalPrice);
    }

    // Render Tray Items
    if (trayBody) {
      if (orderTray.length === 0) {
        trayBody.innerHTML = `
          <div class="tray-empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <p>Your selection tray is currently empty.</p>
            <p style="font-size: 0.8rem; margin-top: 0.5rem; color: var(--text-dark-muted);">Browse our catalog to select your favorite scents.</p>
          </div>
        `;
        if (traySendWhatsappBtn) {
          traySendWhatsappBtn.disabled = true;
          traySendWhatsappBtn.style.opacity = '0.5';
          traySendWhatsappBtn.style.cursor = 'not-allowed';
        }
      } else {
        if (traySendWhatsappBtn) {
          traySendWhatsappBtn.disabled = false;
          traySendWhatsappBtn.style.opacity = '1';
          traySendWhatsappBtn.style.cursor = 'pointer';
        }

        trayBody.innerHTML = orderTray.map(item => `
          <div class="tray-item">
            <img src="${item.image}" alt="${item.name}" class="tray-item-img">
            <div class="tray-item-details">
              <div class="tray-item-name">${item.name} (${item.size})</div>
              <div class="tray-item-price">${formatKES(item.price * item.qty)}</div>
            </div>
            <div class="tray-qty-controls">
              <button class="tray-qty-btn btn-qty-minus" data-id="${item.id}">-</button>
              <span class="tray-qty-num">${item.qty}</span>
              <button class="tray-qty-btn btn-qty-plus" data-id="${item.id}">+</button>
            </div>
            <button class="tray-item-remove" data-id="${item.id}" title="Remove item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        `).join('');

        // Attach listeners for tray controls
        document.querySelectorAll('.btn-qty-minus').forEach(b => {
          b.addEventListener('click', () => updateQty(b.dataset.id, -1));
        });
        document.querySelectorAll('.btn-qty-plus').forEach(b => {
          b.addEventListener('click', () => updateQty(b.dataset.id, 1));
        });
        document.querySelectorAll('.tray-item-remove').forEach(b => {
          b.addEventListener('click', () => {
            orderTray = orderTray.filter(i => i.id !== b.dataset.id);
            saveTrayState();
            updateTrayUI();
            renderProducts();
          });
        });
      }
    }
  }

  // Tray Overlay Open/Close
  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', () => {
      trayOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (trayCloseBtn) {
    trayCloseBtn.addEventListener('click', closeTray);
  }

  if (trayOverlay) {
    trayOverlay.addEventListener('click', (e) => {
      if (e.target === trayOverlay) closeTray();
    });
  }

  function closeTray() {
    if (trayOverlay) {
      trayOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* --------------------------------------------------------------------------
     3. WhatsApp Order Formatting
     -------------------------------------------------------------------------- */
  function sendSingleWhatsAppOrder(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const message = `Hi Aria Noire Scents, I'd like to order:\n- ${product.name} (${product.size}) - ${formatKES(product.price)}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  if (traySendWhatsappBtn) {
    traySendWhatsappBtn.addEventListener('click', () => {
      if (orderTray.length === 0) return;

      let itemsListText = orderTray.map(item => {
        const qtyText = item.qty > 1 ? ` (x${item.qty})` : '';
        return `- ${item.name} (${item.size})${qtyText} - ${formatKES(item.price * item.qty)}`;
      }).join('\n');

      const totalPrice = orderTray.reduce((sum, item) => sum + (item.price * item.qty), 0);

      const message = `Hi Aria Noire Scents, I'd like to order:\n${itemsListText}\n\nTotal: ${formatKES(totalPrice)}`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      
      window.open(url, '_blank');
      closeTray();
    });
  }

  /* --------------------------------------------------------------------------
     4. Storage Helpers
     -------------------------------------------------------------------------- */
  function saveTrayState() {
    try {
      localStorage.setItem('aria_noire_tray', JSON.stringify(orderTray));
    } catch (e) {
      console.error('LocalStorage unavailable:', e);
    }
  }

  function loadTrayState() {
    try {
      const saved = localStorage.getItem('aria_noire_tray');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  /* --------------------------------------------------------------------------
     5. Scroll & Navigation Behaviors
     -------------------------------------------------------------------------- */
  function initScrollHeader() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  function initMobileMenu() {
    if (!mobileMenuBtn || !mobileNavDrawer) return;

    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenuBtn.classList.toggle('active');
      mobileNavDrawer.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNavDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  function initScrollReveals() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     6. Toast Notification Helper
     -------------------------------------------------------------------------- */
  function showToast(message) {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
});

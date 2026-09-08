/**
 * AURA Store - Vanilla Front-End Architecture
 */

// 1. PRODUCTS DATA DATABASE (10 Premium Items)
const productsData = [
    {
        id: "p1",
        name: "غلاف الألياف الكربونية Armor",
        category: "iphone",
        categoryText: "أغلفة iPhone",
        price: 12.00,
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80",
        desc: "مصنوع من ألياف الكربون الحقيقية لمقاومة الصدمات خفيف الوزن وبملمس فاخر."
    },
    {
        id: "p2",
        name: "استكر معدني ثلاثي الأبعاد - التنين الذهبي",
        category: "sticker",
        categoryText: "استكرات معدنية",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        desc: "استكر مطلي بالذهب عيار 24 ثلاثي الأبعاد بقطر محدد بدقة الليزر."
    },
    {
        id: "p3",
        name: "غلاف التيتانيوم القاتم S24 Ultra",
        category: "samsung",
        categoryText: "أغلفة Samsung",
        price: 14.00,
        image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
        desc: "إطار من معدن التيتانيوم المعزز بحواف حماية للكاميرا وزجاج شفاف قوي."
    },
    {
        id: "p4",
        name: "غلاف الجلد الطبيعي - العنابي الفاخر",
        category: "iphone",
        categoryText: "أغلفة iPhone",
        price: 15.00,
        image: "https://images.unsplash.com/photo-1541877206-e04f05806c9a?auto=format&fit=crop&w=600&q=80",
        desc: "جلد إيطالي طبيعي لمس مريح وأناقة لا مثيل لها للاستخدام اليومي."
    },
    {
        id: "p5",
        name: "استكر معدني شعار النسر - الفضي اللامع",
        category: "sticker",
        categoryText: "استكرات معدنية",
        price: 3.50,
        image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
        desc: "شعار نسر معدني مقاوم للماء والخدش، يلتصق بقوة على أي سطح."
    },
    {
        id: "p6",
        name: "غلاف الشفاف المقوى MagSafe",
        category: "iphone",
        categoryText: "أغلفة iPhone",
        price: 10.00,
        image: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&w=600&q=80",
        desc: "شفافية كريستالية تبرز لون هاتفك مع شاحن مغناطيسي قوي مدعم."
    },
    {
        id: "p7",
        name: "غلاف حماية أسود مطفي هجين",
        category: "samsung",
        categoryText: "أغلفة Samsung",
        price: 9.50,
        image: "https://images.unsplash.com/photo-1574944985070-8f30c4397e3c?auto=format&fit=crop&w=600&q=80",
        desc: "سطح مطفي مقاوم للبصمات وحواف مرنة لامتصاص الصدمات."
    },
    {
        id: "p8",
        name: "استكر معدني الجندي الصامت - كروم",
        category: "sticker",
        categoryText: "استكرات معدنية",
        price: 4.00,
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
        desc: "مصنوع من سبائك النيكل اللامع بتفاصيل هندسية دقيقة."
    },
    {
        id: "p9",
        name: "غلاف حماية Pixel Pro المصفح",
        category: "other",
        categoryText: "أغلفة هواتف أخرى",
        price: 11.00,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
        desc: "تصميم مصفح ذكي ومسند خلفي مدمج لمشاهدة الأفلام."
    },
    {
        id: "p10",
        name: "استكر الشعار الملكي الذهبي",
        category: "sticker",
        categoryText: "استكرات معدنية",
        price: 5.00,
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
        desc: "تصميم ملكي خاص بلمعان ذهبي عالي الجودة لمظهر متألق."
    }
];

// 2. STATE MANAGEMENT & LOCAL STORAGE
let cart = JSON.parse(localStorage.getItem('AURA_CART')) || [];
let favorites = JSON.parse(localStorage.getItem('AURA_FAVS')) || [];
let currentCategory = 'all';
let searchQuery = '';
let isShowMoreActive = false;

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    updateFavUI();
    initEventListeners();
});

// 3. RENDER PRODUCTS ENGINE
function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    // Filter Logic
    let filtered = productsData.filter(p => {
        const matchesCategory = (currentCategory === 'all') || (p.category === currentCategory);
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">لا توجد منتجات تطابق بحثك.</div>`;
        return;
    }

    filtered.forEach((product, index) => {
        const isFav = favorites.includes(product.id);
        const isHidden = (!isShowMoreActive && index >= 5) ? 'hidden' : '';

        const card = document.createElement('div');
        card.className = `product-card ${isHidden}`;
        card.setAttribute('data-id', product.id);

        card.innerHTML = `
            <div class="product-thumb">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <button class="fav-toggle-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${product.id}')">
                    <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
                </button>
            </div>
            <div class="product-details">
                <span class="product-cat">${product.categoryText}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-bottom">
                    <span class="product-price">${product.price.toFixed(2)} ر.ع</span>
                    <button class="add-cart-btn" onclick="addToCart('${product.id}')" title="أضف للسلة">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 4. CART SYSTEM CONTROLLER
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    updateCartUI();
    showToast(`✅ تمت إضافة "${product.name}" إلى السلة`);
}

function updateCartQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    updateCartUI();
}

function removeFromCart(productId) {
    const item = cart.find(i => i.id === productId);
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateCartUI();
    if(item) showToast(`🗑️ تمت إزالة "${item.name}" من السلة`);
}

function saveCart() {
    localStorage.setItem('AURA_CART', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartBody = document.getElementById('cartBody');
    const cartTotalPrice = document.getElementById('cartTotalPrice');

    const totalQty = cart.reduce((acc, i) => acc + i.qty, 0);
    const totalPrice = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

    cartCount.innerText = totalQty;
    cartTotalPrice.innerText = `${totalPrice.toFixed(2)} ر.ع`;

    cartBody.innerHTML = '';

    if (cart.length === 0) {
        cartBody.innerHTML = `<p style="text-align: center; color: var(--text-secondary); margin-top: 40px;">السلة فارغة حالياً.</p>`;
        return;
    }

    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${(item.price * item.qty).toFixed(2)} ر.ع</div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
                </div>
            </div>
            <button class="delete-item-btn" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-trash"></i></button>
        `;
        cartBody.appendChild(itemEl);
    });
}

// 5. FAVORITES CONTROLLER
function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('🗑️ تم الحذف من المفضلة');
    } else {
        favorites.push(productId);
        showToast('❤️ تمت الإضافة للمفضلة');
    }
    localStorage.setItem('AURA_FAVS', JSON.stringify(favorites));
    updateFavUI();
    renderProducts();
}

function updateFavUI() {
    document.getElementById('favCount').innerText = favorites.length;
}

// 6. UI EVENT LISTENERS & INTERACTION
function initEventListeners() {
    // Mobile Navigation Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Search Toggle & Logic
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');

    searchBtn.addEventListener('click', () => searchOverlay.classList.add('active'));
    closeSearch.addEventListener('click', () => searchOverlay.classList.remove('active'));
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProducts();
    });

    // Filter Category Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            renderProducts();
        });
    });

    // Toggle Show More Products
    const toggleProductsBtn = document.getElementById('toggleProductsBtn');
    toggleProductsBtn.addEventListener('click', () => {
        isShowMoreActive = !isShowMoreActive;
        document.getElementById('toggleText').innerText = isShowMoreActive ? "عرض أقل" : "عرض المزيد من المنتجات";
        document.getElementById('toggleIcon').style.transform = isShowMoreActive ? "rotate(180deg)" : "rotate(0deg)";
        renderProducts();
    });

    // Cart Drawer Toggle
    const cartBtn = document.getElementById('cartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartBackdrop = document.getElementById('cartBackdrop');

    cartBtn.addEventListener('click', () => {
        cartDrawer.classList.add('active');
        cartBackdrop.classList.add('active');
    });

    const closeCart = () => {
        cartDrawer.classList.remove('active');
        cartBackdrop.classList.remove('active');
    };

    closeCartBtn.addEventListener('click', closeCart);
    cartBackdrop.addEventListener('click', closeCart);

    // Checkout Modal
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('⚠️ سلتك فارغة!');
            return;
        }
        closeCart();
        renderCheckoutSummary();
        checkoutModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });

    // Form Submission / Order Processing
    document.getElementById('checkoutForm').addEventListener('submit', handleOrderSubmit);
}

// 7. CHECKOUT & WHATSAPP / PAYMENT INTEGRATION ENGINE
function renderCheckoutSummary() {
    const summaryEl = document.getElementById('modalOrderSummary');
    const totalEl = document.getElementById('modalTotal');
    summaryEl.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        summaryEl.innerHTML += `
            <div class="summary-row">
                <span>${item.name} (x${item.qty})</span>
                <span>${itemTotal.toFixed(2)} ر.ع</span>
            </div>
        `;
    });
    totalEl.innerText = `${total.toFixed(2)} ر.ع`;
}

function handleOrderSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const city = document.getElementById('custCity').value;
    const address = document.getElementById('custAddress').value;
    const notes = document.getElementById('custNotes').value || 'لا يوجد.';
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    const totalPrice = cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2);

    if (paymentMethod === 'whatsapp') {
        // Build Structured WhatsApp Text Message
        let itemsList = '';
        cart.forEach(item => {
            itemsList += `\n- ${item.name}\n  الكمية: ${item.qty} | السعر: ${(item.price * item.qty).toFixed(2)} ر.ع\n`;
        });

        const waMessage = `السلام عليكم،
أرغب في تأكيد الطلب التالي:
━━━━━━━━━━━━━━
الاسم: ${name}
رقم الهاتف: ${phone}
الموقع: ${city}
العنوان: ${address}
━━━━━━━━━━━━━━
الطلبات:
${itemsList}
━━━━━━━━━━━━━━
الإجمالي: ${totalPrice} ر.ع
━━━━━━━━━━━━━━
ملاحظات:
${notes}
شكراً لكم.`;

        const waUrl = `https://wa.me/96872420073?text=${encodeURIComponent(waMessage)}`;
        
        // Clear Cart & Redirect
        cart = [];
        saveCart();
        updateCartUI();
        document.getElementById('checkoutModal').classList.remove('active');
        window.open(waUrl, '_blank');

    } else if (paymentMethod === 'online') {
        /**
         * FUTURE PAYMENT GATEWAY INTEGRATION HERE
         * (e.g., Stripe, Thawani, Tap Payments, OMT)
         * 
         * Example API Hook:
         * fetch('/api/create-checkout-session', { method: 'POST', body: JSON.stringify({ cart, user }) })
         */
        alert("سيتم تحويلك الآن إلى بوابة الدفع الإلكتروني الآمنة...\n(هذه الواجهة جاهزة للربط المستقبلي عبر الـ Backend)");
    }
}

// 8. TOAST NOTIFICATION SYSTEM
function showToast(message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

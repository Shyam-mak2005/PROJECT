import { getJSON, setJSON } from './utils/storage.js';

const KEY = 'me:cart:v2';
let subscribers = [];

function read() {
    return getJSON(KEY) ?? { items: [] };
}

function write(state) {
    setJSON(KEY, state);
    notifySubscribers();
}

function notifySubscribers() {
    const state = read();
    subscribers.forEach(callback => callback(state));
}

export function subscribe(callback) {
    subscribers.push(callback);
    callback(read()); // Initial state
    return () => {
        subscribers = subscribers.filter(cb => cb !== callback);
    };
}

export function addToCart(item) {
    const state = read();
    const existing = state.items.find(x => x.id === item.id);
    if (existing) {
        existing.qty += item.qty ?? 1;
    } else {
        state.items.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            qty: item.qty ?? 1
        });
    }
    write(state);
    
    // Show cart drawer
    const drawer = document.querySelector('.cart-drawer');
    if (drawer) {
        drawer.classList.add('active');
    }
}

export function removeFromCart(id) {
    const state = read();
    state.items = state.items.filter(x => x.id !== id);
    write(state);
}

export function setQty(id, qty) {
    const state = read();
    const item = state.items.find(x => x.id === id);
    if (item) {
        if (qty <= 0) {
            removeFromCart(id);
        } else {
            item.qty = qty;
            write(state);
        }
    }
}

export function getCart() {
    return read();
}

export function getCartTotal() {
    const { items } = read();
    return items.reduce((total, item) => total + (item.price * item.qty), 0);
}

export function initCart() {
    const drawer = document.createElement('aside');
    drawer.className = 'cart-drawer';
    drawer.setAttribute('aria-label', 'Shopping cart');
    drawer.innerHTML = `
        <header class="cart-header">
            <h2 class="h4">Shopping Cart</h2>
            <button class="btn btn--ghost" data-close-cart aria-label="Close cart">×</button>
        </header>
        <div class="cart-items"></div>
        <footer class="cart-footer">
            <div class="cart-total">
                <strong>Total:</strong>
                <span class="price">₹0</span>
            </div>
            <button class="btn btn--primary" style="width: 100%; margin-top: 12px;" onclick="alert('Checkout coming soon!')">
                Proceed to Checkout
            </button>
        </footer>
    `;
    document.body.appendChild(drawer);

    // Close button
    const closeBtn = drawer.querySelector('[data-close-cart]');
    closeBtn.addEventListener('click', () => {
        drawer.classList.remove('active');
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
        if (drawer.classList.contains('active') &&
            !drawer.contains(e.target) &&
            !e.target.closest('[data-quickview]')) {
            drawer.classList.remove('active');
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('active')) {
            drawer.classList.remove('active');
        }
    });

    // Subscribe to cart changes
    subscribe(({ items }) => {
        const itemsContainer = drawer.querySelector('.cart-items');
        const total = drawer.querySelector('.cart-total .price');
        
        // Update items
        itemsContainer.innerHTML = items.length ? items.map(item => `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item__image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item__info">
                    <h3 class="cart-item__title">${item.name}</h3>
                    <div class="cart-item__price">₹${item.price.toLocaleString('en-IN')}</div>
                    <div class="cart-item__quantity">
                        <button class="cart-item__qty-btn" data-decrease aria-label="Decrease quantity">-</button>
                        <span>${item.qty}</span>
                        <button class="cart-item__qty-btn" data-increase aria-label="Increase quantity">+</button>
                        <button class="btn btn--ghost" data-remove style="margin-left: 8px" aria-label="Remove item">×</button>
                    </div>
                </div>
            </div>
        `).join('') : '<p class="cart-empty" style="text-align: center; color: var(--muted)">Your cart is empty</p>';
        
        // Update total
        const totalAmount = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
        total.textContent = `₹${totalAmount.toLocaleString('en-IN')}`;

        // Quantity controls
        itemsContainer.querySelectorAll('.cart-item').forEach(el => {
            const id = el.dataset.itemId;
            const item = items.find(i => i.id === id);
            if (!item) return;

            el.querySelector('[data-decrease]').onclick = () => setQty(id, item.qty - 1);
            el.querySelector('[data-increase]').onclick = () => setQty(id, item.qty + 1);
            el.querySelector('[data-remove]').onclick = () => removeFromCart(id);
        });
    });
}



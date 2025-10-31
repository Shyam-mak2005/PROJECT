import { addToCart } from './cart.js';
import { products } from './data/products.js';

export function initQuickView() {
    const modal = document.getElementById('quickview');
    if (!modal) return;

    const image = modal.querySelector('#quickview-image');
    const title = modal.querySelector('#quickview-title');
    const price = modal.querySelector('#quickview-price');
    const description = modal.querySelector('#quickview-description');
    const addBtn = modal.querySelector('#quickview-add');
    let currentProduct = null;

    // Close modal if clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });

    function openModal(product) {
        currentProduct = product;
        modal.hidden = false;
        // Trigger animation
        requestAnimationFrame(() => {
            modal.classList.add('active');
            // Focus close button for accessibility
            modal.querySelector('[data-close-modal]').focus();
        });
        
        // Update content
        image.src = product.image;
        image.alt = product.name;
        title.textContent = product.name;
        price.textContent = `₹${product.price.toLocaleString('en-IN')}`;
        description.textContent = product.description;
        
        // Update add to cart button
        addBtn.onclick = () => {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                qty: 1
            });
            // Visual feedback
            addBtn.textContent = 'Added to Cart';
            addBtn.disabled = true;
            setTimeout(() => {
                addBtn.textContent = 'Add to Cart';
                addBtn.disabled = false;
            }, 1500);
        };
    }

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.hidden = true;
            currentProduct = null;
            // Reset button state
            addBtn.textContent = 'Add to Cart';
            addBtn.disabled = false;
        }, 250); // Match CSS transition duration
    }

    // Event delegation for product quickview clicks (explicit triggers only)
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-quickview]');
        if (trigger) {
            const productId = trigger.dataset.productId;
            const product = products.find(p => p.id === productId);
            if (product) {
                openModal(product);
            }
        }
        if (e.target.matches('[data-close-modal]')) {
            closeModal();
        }
    });
}



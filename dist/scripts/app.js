import { mountNavbarAndFooter } from './components/navbar.js';
import { initQuickView } from './quickview.js';
import { initCarousel } from './components/carousel.js';
import { initNavSearch } from './search.js';
import { initCart } from './cart.js';
import { ProductFilter } from './filters.js';

// Initialize shared UI
mountNavbarAndFooter();
initQuickView();
initCarousel();
initNavSearch();
initCart();

// Initialize product filtering
new ProductFilter();

// Enhanced image loading with animations
function handleImageLoad(img) {
    if ('decode' in img) {
        // Add loading state
        img.parentElement?.classList.add('image-loading');
        
        // Decode image asynchronously
        img.decode()
            .then(() => {
                requestAnimationFrame(() => {
                    img.classList.add('loaded');
                    img.parentElement?.classList.remove('image-loading');
                });
            })
            .catch(() => {
                // Fallback if decode fails
                img.classList.add('loaded');
                img.parentElement?.classList.remove('image-loading');
            });
    } else {
        // Fallback for browsers without decode
        img.classList.add('loaded');
    }
}

// Handle all images
document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        handleImageLoad(img);
    } else {
        img.addEventListener('load', () => handleImageLoad(img));
    }
});

// Floating consultation CTA
document.querySelector('[data-open-consultation]')?.addEventListener('click', () => {
  alert('We will connect you with a stylist shortly.');
});



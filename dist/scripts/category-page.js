import { products } from './data/products.js';

/**
 * Initialize category page with dynamic product rendering
 * @param {string} category - 'men', 'women', 'unisex', or 'limited'
 */
export function initCategoryPage(category) {
    const productGrid = document.querySelector('.grid--cards, [data-grid]');
    if (!productGrid) return;

    // Filter products by category
    let filteredProducts = products;
    if (category === 'men') {
        filteredProducts = products.filter(p => p.category === 'men');
    } else if (category === 'women') {
        filteredProducts = products.filter(p => p.category === 'women');
    } else if (category === 'unisex') {
        // For unisex, we can show all or filter by type
        filteredProducts = products; // Or filter by specific criteria
    } else if (category === 'limited') {
        // Limited editions - can be filtered or show all
        filteredProducts = products;
    }

    // Image base path
    const imgBase = window.location.pathname.includes('/pages/')
        ? '../assets/images/products/'
        : 'assets/images/products/';

    // Format price in INR
    const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`;

    // Render products
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted)">No products found in this category.</p>';
        return;
    }

    const productHTML = filteredProducts.map(product => {
        const imageSrc = product.image.startsWith('http') 
            ? product.image 
            : (imgBase + product.image);
        
        return `
            <article class="card" data-product-id="${product.id}" tabindex="0" role="button" aria-label="View ${product.name}">
                <div class="card__media">
                    <img src="${imageSrc}" alt="${product.name}" loading="lazy" onerror="if(!this.dataset.fallback){this.dataset.fallback='1';this.src=this.src.endsWith('.jpg')?this.src.replace('.jpg','.png'):this.src.replace('.png','.jpg');}">
                </div>
                <div class="card__body">
                    <h3 class="card__title">${product.name}</h3>
                    <div class="card__price">${formatPrice(product.price)}</div>
                    <p class="card__description">${product.description}</p>
                </div>
            </article>
        `;
    }).join('');

    productGrid.innerHTML = productHTML;

    // Add click handlers to navigate to product detail
    productGrid.querySelectorAll('.card').forEach(card => {
        const id = card.getAttribute('data-product-id');
        const go = () => { 
            const productPath = window.location.pathname.includes('/pages/')
                ? './product.html'
                : './product.html';
            window.location.href = `${productPath}?id=${encodeURIComponent(id)}`;
        };
        card.addEventListener('click', go);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                go();
            }
        });
    });
}


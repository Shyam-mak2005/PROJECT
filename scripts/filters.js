import { products } from './data/products.js';

export class ProductFilter {
    constructor() {
        this.activeFilters = {
            category: null,
            type: null,
            search: '',
            sort: 'default'
        };
        
        this.filterButtons = document.querySelectorAll('[data-filter]');
        this.searchInput = document.querySelector('[data-search]');
        this.sortSelect = document.querySelector('[data-sort]');
        this.productGrid = document.querySelector('.grid--cards');
        
        this.init();
    }
    
    init() {
        // Initialize filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterType = button.dataset.filterType;
                const filterValue = button.dataset.filter;
                
                // Toggle active state
                if (this.activeFilters[filterType] === filterValue) {
                    this.activeFilters[filterType] = null;
                    button.classList.remove('active');
                } else {
                    // Remove active class from other buttons in same group
                    document.querySelectorAll(`[data-filter-type="${filterType}"]`)
                        .forEach(btn => btn.classList.remove('active'));
                    
                    this.activeFilters[filterType] = filterValue;
                    button.classList.add('active');
                }
                
                this.updateProducts();
            });
        });
        
        // Initialize search with debounce
        let searchTimeout;
        this.searchInput?.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.activeFilters.search = e.target.value.toLowerCase();
                this.updateProducts();
            }, 300);
        });
        
        // Initialize sort
        this.sortSelect?.addEventListener('change', (e) => {
            this.activeFilters.sort = e.target.value;
            this.updateProducts();
        });
    }
    
    filterProducts(products) {
        return products.filter(product => {
            // Category filter
            if (this.activeFilters.category && product.category !== this.activeFilters.category) {
                return false;
            }
            
            // Type filter
            if (this.activeFilters.type && product.type !== this.activeFilters.type) {
                return false;
            }
            
            // Search filter
            if (this.activeFilters.search) {
                const searchText = this.activeFilters.search.toLowerCase();
                const matchName = product.name.toLowerCase().includes(searchText);
                const matchDesc = product.description.toLowerCase().includes(searchText);
                if (!matchName && !matchDesc) {
                    return false;
                }
            }
            
            return true;
        });
    }
    
    sortProducts(products) {
        const sortedProducts = [...products];
        
        switch (this.activeFilters.sort) {
            case 'price-asc':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                // Keep original order
                break;
        }
        
        return sortedProducts;
    }
    
    updateProducts() {
        let filteredProducts = this.filterProducts(products);
        filteredProducts = this.sortProducts(filteredProducts);
        
        // Animate grid update
        this.productGrid.style.opacity = '0';
        this.productGrid.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            this.renderProducts(filteredProducts);
            this.productGrid.style.opacity = '1';
            this.productGrid.style.transform = 'translateY(0)';
        }, 150);
    }
    
    renderProducts(products) {
        if (!this.productGrid) return;
        
        const productHTML = products.map(product => `
            <article class="card" data-product-id="${product.id}">
                <div class="card__media">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="card__body">
                    <h3 class="card__title">${product.name}</h3>
                    <div class="card__price">₹${product.price.toLocaleString('en-IN')}</div>
                    <p class="card__description">${product.description}</p>
                </div>
            </article>
        `).join('');
        
        this.productGrid.innerHTML = productHTML;
        
        // Re-initialize quickview if needed
        if (window.initQuickView) {
            window.initQuickView();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.productFilter = new ProductFilter();
});

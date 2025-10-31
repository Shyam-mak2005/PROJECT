import { products } from './data/products.js';
import { addToCart } from './cart.js';

function getQueryParam(name){
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function formatPriceINR(value){
  return `₹${Number(value).toLocaleString('en-IN')}`;
}

export function initProductDetail(){
  const id = getQueryParam('id');
  const product = products.find(p => p.id === id) || products[0];
  if(!product) return;

  const container = document.getElementById('product-root');
  if(!container) return;

  const imgBase = window.location.pathname.includes('/pages/')
    ? '../assets/images/products/'
    : 'assets/images/products/';
  const imageSrc = product.image.startsWith('http') ? product.image : (imgBase + product.image);

  container.innerHTML = `
    <div class="grid" style="grid-template-columns:1fr 1fr;gap:28px">
      <div>
        <figure class="card__media" style="border-radius:16px;overflow:hidden">
          <img data-zoom src="${imageSrc}" alt="${product.name}" loading="eager" style="transition:transform .2s ease" onerror="if(!this.dataset.fallback){this.dataset.fallback='1';this.src=this.src.endsWith('.jpg')?this.src.replace('.jpg','.png'):this.src.replace('.png','.jpg');}">
        </figure>
      </div>
      <div>
        <h1 class="h3">${product.name}</h1>
        <p class="price">${formatPriceINR(product.price)}</p>
        <p>${product.description}</p>
        <div style="display:grid;gap:10px;margin:14px 0">
          <button class="btn btn--primary" id="add-to-bag">Add to Cart</button>
        </div>
      </div>
    </div>`;

  // Simple zoom interaction
  const gallery = container.querySelector('[data-zoom]');
  if(gallery){
    gallery.addEventListener('mousemove', (e) => {
      const rect = gallery.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      gallery.style.transformOrigin = `${x}% ${y}%`;
      gallery.style.transform = 'scale(1.06)';
    });
    gallery.addEventListener('mouseleave', ()=>{ gallery.style.transform='scale(1)'; });
  }

  const addBtn = container.querySelector('#add-to-bag');
  if(addBtn){
    addBtn.addEventListener('click', ()=>{
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
    });
  }
}

document.addEventListener('DOMContentLoaded', initProductDetail);



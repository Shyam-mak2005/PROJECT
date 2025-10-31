import { addToCart } from './cart.js';

export function initProductPage(){
  const gallery = document.querySelector('[data-zoom]');
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

  const mono = document.getElementById('monogram');
  const preview = document.getElementById('mono-preview');
  if(mono && preview){ mono.addEventListener('input', ()=>{ preview.textContent = mono.value.toUpperCase().slice(0,3); }); }

  const add = document.getElementById('add-to-bag');
  if(add){ add.addEventListener('click', () => {
    const id = add.getAttribute('data-id') || 'p1';
    const price = Number(add.getAttribute('data-price') || 0);
    const name = document.querySelector('h1')?.textContent || 'Product';
    addToCart({ id, name, price, qty: 1 });
  }); }
}



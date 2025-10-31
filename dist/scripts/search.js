const CATALOG = [
  { id:'p1', name:'Éclat Loafer 90', url:'/pages/product.html?id=p1' },
  { id:'p2', name:'Silk Blazer Aure', url:'/pages/product.html?id=p2' },
  { id:'p3', name:'Calfskin Sneaker 70', url:'/pages/product.html?id=p3' }
];

export function initNavSearch(){
  const input = document.getElementById('nav-search');
  if(!input) return;
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if(q.length < 2) return;
    const hit = CATALOG.find(p => p.name.toLowerCase().includes(q));
    if(hit){ window.location.href = hit.url; }
  });
}



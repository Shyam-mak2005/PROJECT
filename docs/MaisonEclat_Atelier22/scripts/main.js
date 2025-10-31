// Dummy modal + form behavior for Atelier demo
document.addEventListener('click', function(e){
  if(e.target.matches('.btn-request')){
    const product = e.target.dataset.product || 'Atelier Piece';
    const modal = document.getElementById('atelierModal');
    modal.querySelector('[name="product"]').value = product;
    modal.classList.add('active');
  }
  if(e.target.matches('.modal-close') || e.target.matches('.modal-cancel')){
    document.getElementById('atelierModal').classList.remove('active');
  }
});

document.getElementById && document.getElementById('atelierForm') && document.getElementById('atelierForm').addEventListener('submit', function(ev){
  ev.preventDefault();
  const btn = ev.target.querySelector('button[type="submit"]');
  btn.textContent = 'Requested ✓';
  btn.disabled = true;
  setTimeout(function(){
    document.getElementById('atelierModal').classList.remove('active');
    btn.textContent = 'Request Invite';
    btn.disabled = false;
    ev.target.reset();
  }, 1100);
});
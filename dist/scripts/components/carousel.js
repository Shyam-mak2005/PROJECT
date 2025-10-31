export function initCarousel(){
  const track = document.querySelector('.carousel__track');
  const prev = document.querySelector('.carousel__prev');
  const next = document.querySelector('.carousel__next');
  if(!track || !prev || !next) return;
  const amount = () => track.clientWidth * 0.9;
  prev.addEventListener('click',()=> track.scrollBy({left:-amount(),behavior:'smooth'}));
  next.addEventListener('click',()=> track.scrollBy({left:amount(),behavior:'smooth'}));
}



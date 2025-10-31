export function mountNavbarAndFooter(){
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if(header){
    const base = window.location.pathname.includes('/pages/') ? '..' : '.';
    header.innerHTML = `
      <nav class="nav" role="navigation" aria-label="Main">
        <div class="nav__inner container">
          <a class="nav__brand" href="${base}/index.html" aria-label="Maison Éclat home">Maison Éclat</a>
          <div class="nav__menu" role="menubar">
            <a class="nav__link" role="menuitem" href="${base}/pages/category-men.html">Men</a>
            <a class="nav__link" role="menuitem" href="${base}/pages/category-women.html">Women</a>
            <a class="nav__link" role="menuitem" href="${base}/pages/category-unisex.html">Unisex</a>
            <a class="nav__link" role="menuitem" href="${base}/pages/category-limited.html">Limited</a>
            <a class="nav__link" role="menuitem" href="${base}/pages/lookbook.html">Lookbook</a>
          </div>
          <div class="nav__pill">
            <form role="search" aria-label="Site search">
              <label class="sr-only" for="nav-search">Search</label>
              <input id="nav-search" name="q" placeholder="Search" autocomplete="off">
            </form>
            <select aria-label="Currency switcher">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
            <a class="nav__link" href="${base}/pages/account.html" aria-label="Account">Account</a>
            <a class="nav__link" href="${base}/pages/cart.html" aria-label="Cart">Bag</a>
          </div>
        </div>
      </nav>`;

    const nav = header.querySelector('.nav');
    const onScroll = () => {
      if(window.scrollY > 24){ nav?.classList.add('nav--solid'); } else { nav?.classList.remove('nav--solid'); }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if(footer){
    footer.classList.add('footer');
    const base = window.location.pathname.includes('/pages/') ? '..' : '.';
    footer.innerHTML = `
      <div class="container footer__grid">
        <div>
          <div class="nav__brand">Maison Éclat</div>
          <p class="badge-secure" aria-label="Secure checkout">🔒 Secure checkout via Apple Pay · Google Pay · Stripe</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="${base}/pages/about.html">About</a><br>
          <a href="${base}/pages/sustainability.html">Sustainability</a><br>
          <a href="${base}/pages/contact.html">Contact</a>
        </nav>
        <div>
          <label for="subscribe">Join our journal</label>
          <input id="subscribe" type="email" placeholder="Your email">
        </div>
      </div>
      <div class="container" style="margin-top:12px;color:var(--muted);font-size:12px">© <span id="y"></span> Maison Éclat</div>`;
    const y = footer.querySelector('#y');
    if(y){ y.textContent = new Date().getFullYear().toString(); }
  }
}

export function initCarousel(){
  const track = document.querySelector('.carousel__track');
  const prev = document.querySelector('.carousel__prev');
  const next = document.querySelector('.carousel__next');
  if(!track || !prev || !next) return;
  const scrollBy = () => track.clientWidth * 0.9;
  prev.addEventListener('click',()=> track.scrollBy({left:-scrollBy(),behavior:'smooth'}));
  next.addEventListener('click',()=> track.scrollBy({left:scrollBy(),behavior:'smooth'}));
}



(() => {
  const root = document.documentElement;
  root.classList.add('js', 'lock');

  /* ---------- Cartões desenhados em código (sem imagens) ---------- */
  const CARDS = [
    { cls: 'azul',   net: 'visa', tag: 'Platinum', brand: 'Azul',       name: 'Azul Platinum',      desc: 'Acumule pontos Azul em cada compra' },
    { cls: 'latam',  net: 'visa', tag: 'Platinum', brand: 'LATAM Pass', name: 'LATAM Pass Platinum', desc: 'Pontos para viajar com a LATAM' },
    { cls: 'black',  net: 'mc',   tag: 'black',    brand: 'LATAM Pass', name: 'LATAM Pass Black',    desc: 'Benefícios premium para quem voa' },
    { cls: 'orange', net: 'mc',   tag: 'platinum', brand: '',           name: 'Itaú Platinum',       desc: 'O clássico laranja, sem complicação' },
    { cls: 'sky',    net: 'mc',   tag: 'skyline',  brand: 'Azul',       name: 'Azul Skyline',        desc: 'Mais vantagens no programa Azul' }
  ];
  const card = c => `<div class="cc cc--${c.cls}" role="img" aria-label="Cartão ${c.name}">
    <span class="net net--${c.net}">${c.net === 'visa' ? 'VISA' : '<i></i><i></i><em>mastercard</em>'}</span>
    <i class="chip"></i><i class="nfc"></i><b class="tag">${c.tag}</b>
    <span class="brand">${c.brand}</span><span class="mini">itaú</span></div>`;

  const frag = (sel, html) => document.querySelectorAll(sel).forEach(el => (el.innerHTML = html));
  const ring = document.getElementById('ring');
  ring.innerHTML = CARDS.map((c, i) => card(c).replace('class="cc', `style="--i:${i}" class="cc`)).join('');
  document.getElementById('products').innerHTML = CARDS.map(c => `
    <article class="pc" data-in>${card(c)}<h3>${c.name}</h3><p>${c.desc}</p>
    <a href="#" class="btn btn--or">Solicitar cartão</a></article>`).join('');
  frag('.mini-card', card(CARDS[3]));
  document.getElementById('stack').innerHTML = [4, 2, 1, 3, 0].map((k, n) =>
    card(CARDS[k]).replace('class="cc', `style="transform:translate(${(n - 2) * 46}px,${(n - 2) * -18}px) rotateY(-22deg) rotateZ(8deg)" class="cc`)).join('');

  /* ---------- GSAP ---------- */
  gsap.registerPlugin(ScrollTrigger);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader = document.getElementById('loader');
  const logo = loader.querySelector('.logo');
  const txt = logo.querySelector('span');

  /* Carrossel: 1,5s por cartão, girando para a direita */
  gsap.set(ring, { rotationX: -6 });
  let timer;
  const tick = () => {
    gsap.to(ring, { rotationY: '+=72', duration: 0.8, ease: 'power2.inOut' });
    timer.restart(true);
  };
  timer = gsap.delayedCall(1.5, tick).pause();
  ScrollTrigger.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top', onToggle: s => (s.isActive && !loader.isConnected ? timer.play() : timer.pause()) });

  /* Entrada dos elementos do hero */
  const heroIn = () => {
    root.classList.remove('lock');
    gsap.fromTo('[data-hero]', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' });
    gsap.from(ring, { scale: 0.6, rotationY: -140, duration: 1.3, ease: 'power3.out', onComplete: () => timer.play() });
  };

  /* Entrada fluida de cada seção ao rolar */
  const reveal = () => {
    ScrollTrigger.batch('[data-in]', {
      start: 'top 88%', once: true,
      onEnter: els => gsap.fromTo(els, { y: 56, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', overwrite: true })
    });
  };

  /* Tela de carregamento: a logo se expande até preencher a tela */
  const s = logo.offsetWidth;
  const full = (Math.hypot(innerWidth, innerHeight) / s) * 1.25;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  if (reduce) { loader.remove(); root.classList.remove('lock'); gsap.set('[data-hero],[data-in]', { opacity: 1 }); timer.play(); return; }
  tl.from(logo, { scale: 0.3, opacity: 0, duration: 0.4, ease: 'back.out(2.2)' })
    .to(txt, { opacity: 0, duration: 0.12 }, '+=0.12')
    .to(logo, { scale: full, duration: 0.7, ease: 'power3.in' }, '<')
    .to(loader, { opacity: 0, duration: 0.35, onComplete: () => loader.remove() }, '-=0.1')
    .add(heroIn, '-=0.3')
    .add(reveal);
})();

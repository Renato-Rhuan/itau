(() => {
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
})();

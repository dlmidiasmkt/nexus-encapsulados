/* Nexus — comportamento do site. Sem dependências. Tudo continua legível sem script (a classe .js só liga as entradas). */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var brl = function (n) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }); };

  /* ---- entradas: cada parte da seção sobe em sequência, uma vez ---- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' }) : null;
  $$('.rv').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });

  /* herói: frase sobe de trás da linha de base; depois o resto aparece */
  var hero = $('.hero'), h1 = $('.hero h1');
  requestAnimationFrame(function () { requestAnimationFrame(function () { h1.classList.add('in'); hero.classList.add('in'); }); });

  /* ---- chips vivos do herói ---- */
  var etapas = ['Novo contato', 'Endereço confirmado', 'Enviado', 'Entregue e pago'];
  var ie = 0;
  $('#chEtapaBt').addEventListener('click', function () { ie = (ie + 1) % etapas.length; $('#chEtapa').textContent = etapas[ie]; });
  var pagBt = $('#chPagBt');
  pagBt.addEventListener('click', function () {
    var on = pagBt.getAttribute('aria-pressed') !== 'true';
    pagBt.setAttribute('aria-pressed', on);
    $('#chPag').textContent = on ? 'Paga ao receber' : 'Paga antes de receber';
  });
  var prazos = [15, 30, 45, 60], ip = 1;
  $('#chRecBt').addEventListener('click', function () { ip = (ip + 1) % prazos.length; $('#chRec').textContent = 'em ' + prazos[ip] + ' dias'; });

  /* ---- como funciona: arrastar pelas etapas ---- */
  var rng = $('#hwRng'), fr = $$('.frag'), nomes = $$('#hwNames button');
  var etapaNome = ['Conversa', 'Pedido', 'Entrega', 'Recompra'];
  var frases = ['O robô atende e guarda as respostas.', 'O cliente escolhe e o pedido já nasce no quadro.', 'O entregador leva e cobra na porta.', 'Depois do prazo, o robô chama de volta.'];
  function etapa(i) {
    i = Math.max(0, Math.min(3, +i));
    rng.value = i;
    $('.how .fill').style.setProperty('--k', i / 3);
    $('#hwTxt').textContent = frases[i];
    rng.setAttribute('aria-valuetext', etapaNome[i]);
    fr.forEach(function (f) { f.classList.toggle('on', +f.getAttribute('data-e') === i); });
    nomes.forEach(function (b) { b.setAttribute('aria-current', +b.getAttribute('data-i') === i); });
  }
  rng.addEventListener('input', function () { etapa(rng.value); });
  nomes.forEach(function (b) { b.addEventListener('click', function () { etapa(b.getAttribute('data-i')); }); });
  etapa(0);

  /* ---- uma moldura, três distâncias (o scroll troca a distância) ---- */
  var show = $('.show'), frm = $('#frm img');
  var alvos = [[50, 50, 1], [48, 25, 2.4], [46, 24, 4.6]];
  function distancia() {
    var r = show.getBoundingClientRect(), total = r.height - window.innerHeight;
    var p = total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0;
    var st = p < 0.28 ? 0 : p < 0.62 ? 1 : 2;
    if (+show.getAttribute('data-st') !== st + 1) {
      show.setAttribute('data-st', st + 1);
      frm.style.setProperty('--ox', alvos[st][0] + '%');
      frm.style.setProperty('--oy', alvos[st][1] + '%');
      frm.style.transform = 'scale(' + alvos[st][2] + ')';
    }
  }
  var tk = false;
  window.addEventListener('scroll', function () { if (!tk) { tk = true; requestAnimationFrame(function () { distancia(); tk = false; }); } }, { passive: true });
  distancia();

  /* ---- calculadora ---- */
  var ids = { P: 'iP', T: 'iT', E: 'iE', C: 'iC', A: 'iA', F: 'iF' };
  function conta() {
    var v = {}; Object.keys(ids).forEach(function (k) { v[k] = +$('#' + ids[k]).value; });
    $('#oP').textContent = v.P + ' por dia'; $('#oT').textContent = brl(v.T); $('#oE').textContent = v.E + '%';
    $('#oC').textContent = brl(v.C); $('#oA').textContent = brl(v.A); $('#oF').textContent = brl(v.F);
    var feitos = v.P * 30, ent = Math.round(feitos * v.E / 100);
    var fat = ent * v.T, cus = ent * v.C + feitos * v.A + feitos * v.F, res = fat - cus;
    var cpa = v.E / 100 * (v.T - v.C) - v.F;
    var big = $('#rRes');
    big.textContent = (res >= 0 ? 'Sobram ' : 'Faltam ') + brl(Math.abs(res)) + ' no mês';
    big.className = 'big' + (res < 0 ? ' neg' : '');
    $('#rEnt').textContent = ent + ' de ' + feitos;
    $('#rFat').textContent = brl(fat); $('#rCus').textContent = brl(cus);
    $('#rCpa').textContent = cpa > 0 ? brl(cpa) : 'nenhum: o pedido não paga a si mesmo';
  }
  $$('#calc input').forEach(function (i) { i.addEventListener('input', conta); });
  conta();

  /* ---- candidatura: abre o WhatsApp com a mensagem pronta; nada é guardado ---- */
  var form = $('#form'), msg = $('#fMsg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = $('#fNome').value.trim(), tel = $('#fTel').value.trim(), cid = $('#fCid').value.trim();
    if (!nome) { msg.textContent = 'Diga o seu nome para continuar.'; $('#fNome').focus(); return; }
    if (!$('#fOk').checked) { msg.textContent = 'Marque o aceite para continuar.'; $('#fOk').focus(); return; }
    var cfg = window.NEXUS || {};
    var texto = 'Oi! Sou ' + nome + (cid ? ', de ' + cid : '') + (tel ? '. Meu WhatsApp: ' + tel : '') + '. Quero entrar na lista da mentoria de encapsulados da Nexus.';
    if (!cfg.whatsapp) { msg.textContent = 'O contato da Nexus ainda não foi configurado neste site.'; return; }
    msg.textContent = 'Abrindo o WhatsApp…';
    window.open('https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
  });
})();

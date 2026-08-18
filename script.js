/*
  ============================================================================
  script.js — Comportamento do site "She Is the Man in High School"
  ----------------------------------------------------------------------------
  Três funções principais:
    1. Criar as "lâmpadas" das barras de marquise (topo e rodapé).
    2. Revelar os elementos com animação ao rolar a página
       (usando IntersectionObserver, sem bibliotecas externas).
    3. Preencher o ano atual no rodapé.
  Comentários em português para estudo. Nada aqui depende de frameworks.
  ============================================================================
*/

// "DOMContentLoaded" garante que o HTML já foi lido antes de rodarmos o código.
document.addEventListener("DOMContentLoaded", function () {

  /* ──────────────────────────────────────────────────────────
     1) LÂMPADAS DA MARQUISE
     Em vez de escrever dezenas de <span> no HTML, criamos as
     bolinhas aqui por código. Cada uma recebe um pequeno atraso
     de animação, criando o efeito de "luzes correndo".
     ────────────────────────────────────────────────────────── */
  function preencherMarquee(seletor, quantidade) {
    var barra = document.querySelector(seletor);
    if (!barra) return; // se o elemento não existir, não faz nada

    for (var i = 0; i < quantidade; i++) {
      var bulb = document.createElement("span");
      bulb.className = "bulb";
      // O atraso muda conforme a posição (i), deixando as luzes fora de sincronia.
      // Usamos o resto da divisão (i % 6) para o padrão se repetir a cada 6 lâmpadas.
      bulb.style.setProperty("--delay", ((i % 6) * 0.18) + "s");
      barra.appendChild(bulb);
    }
  }

  // Criamos ~36 lâmpadas no topo e ~36 no rodapé.
  // (O CSS usa "overflow: hidden", então lâmpadas a mais somem sem quebrar o layout.)
  preencherMarquee(".marquee", 36);
  preencherMarquee(".footer__marquee", 36);


  /* ──────────────────────────────────────────────────────────
     2) ANIMAÇÃO DE REVELAR AO ROLAR (scroll reveal)
     O IntersectionObserver "observa" os elementos e avisa quando
     eles entram na área visível da tela. Aí adicionamos a classe
     .is-visible, e o CSS cuida da transição suave.
     ────────────────────────────────────────────────────────── */
  var elementos = document.querySelectorAll(".reveal");

  // Se o navegador for muito antigo e não tiver IntersectionObserver,
  // simplesmente mostramos tudo (fallback seguro).
  if (!("IntersectionObserver" in window)) {
    elementos.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observador = new IntersectionObserver(function (entradas, obs) {
    entradas.forEach(function (entrada) {
      // isIntersecting = true quando o elemento aparece na tela
      if (entrada.isIntersecting) {
        entrada.target.classList.add("is-visible");
        // Paramos de observar esse elemento: a animação só precisa rodar 1x.
        obs.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.15,          // dispara quando ~15% do elemento está visível
    rootMargin: "0px 0px -8% 0px" // começa um pouco antes de chegar ao fim da tela
  });

  // Mandamos o observador vigiar cada elemento .reveal
  elementos.forEach(function (el) { observador.observe(el); });


  /* ──────────────────────────────────────────────────────────
     3) ANO ATUAL NO RODAPÉ
     Preenche automaticamente o ano no © do rodapé.
     ────────────────────────────────────────────────────────── */
  var anoEl = document.getElementById("year");
  if (anoEl) {
    anoEl.textContent = new Date().getFullYear();
  }

});

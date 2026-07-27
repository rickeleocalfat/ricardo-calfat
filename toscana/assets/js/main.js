/* =========================================================
   Toscana Alta Gastronomia — comportamento do site
   ========================================================= */
(function () {
  'use strict';

  var WHATSAPP = '551138493484';
  var EMAIL = 'vendas@toscanagastronomia.com.br';

  /* Endpoint opcional para receber o formulário por e-mail/CRM.
     Deixe vazio para o envio seguir pelo WhatsApp.
     Ex.: 'https://formsubmit.co/ajax/vendas@toscanagastronomia.com.br' */
  var FORM_ENDPOINT = '';

  var reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header muda ao rolar ---------- */
  var header = document.querySelector('.header');
  function atualizarHeader() {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 40);
  }
  atualizarHeader();
  window.addEventListener('scroll', atualizarHeader, { passive: true });

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');

  function fecharMenu() {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var aberto = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(aberto));
      toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') fecharMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fecharMenu();
    });
  }

  /* ---------- Fotos com lazy-load ----------
     Cada .photo[data-photo] carrega a imagem só quando chega perto da tela.
     Enquanto o arquivo não existir, o placeholder [FOTO: ...] continua visível. */
  var slots = document.querySelectorAll('.photo[data-photo]');

  /* Aceita a foto em qualquer um destes formatos, na ordem: basta o arquivo
     existir em assets/fotos/ com o nome certo — a extensão não importa. */
  var EXTENSOES = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'];

  function carregarFoto(slot) {
    var src = slot.getAttribute('data-photo');
    if (!src) return;

    var semExt = src.replace(/\.[a-zA-Z]+$/, '');
    var candidatos = [src];
    EXTENSOES.forEach(function (ext) {
      var alvo = semExt + ext;
      if (candidatos.indexOf(alvo) === -1) candidatos.push(alvo);
    });

    (function tentar(i) {
      if (i >= candidatos.length) return;
      var img = new Image();
      img.onload = function () {
        /* URL absoluta: dentro do CSS o caminho relativo seria resolvido a
           partir da pasta da folha de estilo, e não do documento. */
        slot.style.setProperty('--img', 'url("' + img.src + '")');
        slot.classList.add('has-photo');
      };
      img.onerror = function () { tentar(i + 1); };
      img.src = candidatos[i];
    })(0);
  }

  if ('IntersectionObserver' in window) {
    var obsFotos = new IntersectionObserver(function (entradas, obs) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        carregarFoto(entrada.target);
        obs.unobserve(entrada.target);
      });
    }, { rootMargin: '300px 0px' });

    Array.prototype.forEach.call(slots, function (slot) { obsFotos.observe(slot); });
  } else {
    Array.prototype.forEach.call(slots, carregarFoto);
  }

  /* ---------- Revelar ao rolar ---------- */
  var reveals = document.querySelectorAll('.reveal');

  if (reduzirMovimento || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-visible'); });
  } else {
    var obsReveal = new IntersectionObserver(function (entradas, obs) {
      entradas.forEach(function (entrada, i) {
        if (!entrada.isIntersecting) return;
        var atraso = Math.min(i * 70, 280);
        setTimeout(function () { entrada.target.classList.add('is-visible'); }, atraso);
        obs.unobserve(entrada.target);
      });
    }, { rootMargin: '0px 0px -8%', threshold: 0.08 });

    Array.prototype.forEach.call(reveals, function (el) { obsReveal.observe(el); });
  }

  /* ---------- Máscara simples de WhatsApp ---------- */
  var campoWhats = document.getElementById('whatsapp');
  if (campoWhats) {
    campoWhats.addEventListener('input', function () {
      var d = campoWhats.value.replace(/\D/g, '').slice(0, 11);
      if (d.length > 6) {
        campoWhats.value = '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(-4);
      } else if (d.length > 2) {
        campoWhats.value = '(' + d.slice(0, 2) + ') ' + d.slice(2);
      } else {
        campoWhats.value = d;
      }
    });
  }

  /* ---------- Formulário de catálogo ---------- */
  var form = document.getElementById('form-catalogo');
  var status = document.getElementById('form-status');

  function mostrarErro(campo, mostrar) {
    var wrapper = campo.closest('.field');
    var erro = form.querySelector('[data-error-for="' + campo.id + '"]');
    if (wrapper) wrapper.classList.toggle('has-error', mostrar);
    if (erro) erro.hidden = !mostrar;
    campo.setAttribute('aria-invalid', mostrar ? 'true' : 'false');
  }

  function validar(campo) {
    var v = campo.value.trim();
    var ok = true;
    if (campo.id === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    else if (campo.id === 'whatsapp') ok = v.replace(/\D/g, '').length >= 10;
    else ok = v.length >= 2;
    mostrarErro(campo, !ok);
    return ok;
  }

  if (form) {
    Array.prototype.forEach.call(form.querySelectorAll('input[required]'), function (campo) {
      campo.addEventListener('blur', function () { if (campo.value.trim()) validar(campo); });
      campo.addEventListener('input', function () {
        if (campo.closest('.field').classList.contains('has-error')) validar(campo);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var obrigatorios = form.querySelectorAll('input[required]');
      var valido = true;
      var primeiroErro = null;

      Array.prototype.forEach.call(obrigatorios, function (campo) {
        if (!validar(campo)) {
          valido = false;
          if (!primeiroErro) primeiroErro = campo;
        }
      });

      if (!valido) {
        if (primeiroErro) primeiroErro.focus();
        status.hidden = false;
        status.textContent = 'Confira os campos destacados para enviarmos o catálogo.';
        return;
      }

      var dados = {
        nome: form.nome.value.trim(),
        empresa: form.empresa.value.trim(),
        email: form.email.value.trim(),
        whatsapp: form.whatsapp.value.trim(),
        mensagem: form.mensagem.value.trim()
      };

      var texto =
        'Olá! Gostaria de receber o catálogo da Toscana.\n\n' +
        'Nome: ' + dados.nome + '\n' +
        'Empresa/Restaurante: ' + dados.empresa + '\n' +
        'E-mail: ' + dados.email + '\n' +
        'WhatsApp: ' + dados.whatsapp +
        (dados.mensagem ? '\n\nMensagem: ' + dados.mensagem : '');

      function confirmar(msg) {
        status.hidden = false;
        status.textContent = msg;
        form.reset();
      }

      if (FORM_ENDPOINT) {
        var botao = form.querySelector('button[type="submit"]');
        botao.disabled = true;
        botao.textContent = 'Enviando…';

        fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(dados)
        }).then(function (r) {
          if (!r.ok) throw new Error('falha no envio');
          confirmar('Pedido recebido, ' + dados.nome.split(' ')[0] + '. Enviaremos o catálogo para ' +
            dados.email + ' em até 1 dia útil.');
        }).catch(function () {
          window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
          confirmar('Não conseguimos enviar pelo site — abrimos o WhatsApp com seus dados. ' +
            'Se preferir, escreva para ' + EMAIL + '.');
        }).then(function () {
          botao.disabled = false;
          botao.textContent = 'Solicitar catálogo';
        });
      } else {
        window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
        confirmar('Pedido pronto, ' + dados.nome.split(' ')[0] + '! Abrimos o WhatsApp com seus dados — é só enviar. ' +
          'Se preferir e-mail, escreva para ' + EMAIL + '.');
      }
    });
  }

  /* ---------- Ano do rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();

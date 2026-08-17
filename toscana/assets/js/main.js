/* =========================================================
   Toscana Alta Gastronomia — comportamento do site
   ========================================================= */
(function () {
  'use strict';

  var WHATSAPP = '551138493484';
  var EMAIL = 'vendas@toscanagastronomia.com.br';

  /* Endpoint opcional para receber o formulário por e-mail/CRM.
     Vazio: o pedido segue pelo WhatsApp já preenchido.
     Ex.: 'https://formsubmit.co/ajax/vendas@toscanagastronomia.com.br' */
  var FORM_ENDPOINT = '';

  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menu ---------- */
  var alternar = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu');

  function fecharMenu() {
    if (!menu || !alternar) return;
    menu.classList.remove('aberto');
    alternar.setAttribute('aria-expanded', 'false');
    alternar.setAttribute('aria-label', 'Abrir menu');
  }

  if (alternar && menu) {
    alternar.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      alternar.setAttribute('aria-expanded', String(aberto));
      alternar.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') fecharMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharMenu(); });
  }

  /* ---------- Barra de ação permanente ----------
     Entra depois da abertura, para não competir com o primeiro CTA. */
  var barra = document.getElementById('barra-acao');
  var abertura = document.querySelector('.abertura');

  if (barra && abertura && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entradas) {
      barra.classList.toggle('visivel', !entradas[0].isIntersecting);
    }, { threshold: 0 }).observe(abertura);
  } else if (barra) {
    barra.classList.add('visivel');
  }

  /* ---------- Trufa fresca: estado da temporada ----------
     Períodos conforme o Catálogo 2026. Para ajustar, basta editar as datas
     abaixo — [mês inicial, dia inicial, mês final, dia final], mês de 1 a 12. */
  var TEMPORADAS = {
    branca:  [[10, 1, 12, 31]],
    verao:   [[5, 1, 8, 31], [10, 1, 12, 31]],
    outono:  [[10, 1, 3, 15]],
    inverno: [[11, 15, 3, 15]]
  };
  var DIAS_DE_AVISO = 30;   /* quantos dias antes a espécie entra como "chegando" */

  function dentroDoPeriodo(hoje, faixa) {
    var ano = hoje.getFullYear();
    var inicio = new Date(ano, faixa[0] - 1, faixa[1]);
    var fim = new Date(ano, faixa[2] - 1, faixa[3], 23, 59, 59);
    if (fim < inicio) {                       /* período que vira o ano */
      return hoje >= inicio || hoje <= new Date(ano, faixa[2] - 1, faixa[3], 23, 59, 59);
    }
    return hoje >= inicio && hoje <= fim;
  }

  function diasAteComecar(hoje, faixa) {
    var ano = hoje.getFullYear();
    var inicio = new Date(ano, faixa[0] - 1, faixa[1]);
    if (inicio < hoje) inicio = new Date(ano + 1, faixa[0] - 1, faixa[1]);
    return Math.ceil((inicio - hoje) / 86400000);
  }

  function estadoDaEspecie(hoje, faixas) {
    var proximo = Infinity;
    for (var i = 0; i < faixas.length; i++) {
      if (dentroDoPeriodo(hoje, faixas[i])) return { chave: 'dentro', texto: 'Em temporada' };
      proximo = Math.min(proximo, diasAteComecar(hoje, faixas[i]));
    }
    if (proximo <= DIAS_DE_AVISO) return { chave: 'chegando', texto: 'Chegando' };
    return { chave: 'fora', texto: 'Fora de temporada' };
  }

  var lista = document.getElementById('estados-trufa');
  if (lista) {
    var hoje = new Date();
    Array.prototype.forEach.call(lista.querySelectorAll('[data-especie]'), function (item) {
      var faixas = TEMPORADAS[item.getAttribute('data-especie')];
      if (!faixas) return;
      var estado = estadoDaEspecie(hoje, faixas);
      var selo = item.querySelector('.selo');
      selo.textContent = estado.texto;
      selo.className = 'selo selo--' + estado.chave;
    });

    var aviso = document.getElementById('atualizacao-trufa');
    if (aviso) {
      aviso.textContent = 'Estado calculado pelo calendário de colheita do Catálogo 2026 · ' +
        hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) +
        '. A disponibilidade da semana é confirmada no contato.';
    }
  }

  /* ---------- Entrada dos blocos ---------- */
  var blocos = document.querySelectorAll('.surge');

  if (semMovimento || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(blocos, function (el) { el.classList.add('visto'); });
  } else {
    var observador = new IntersectionObserver(function (entradas, obs) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('visto');
        obs.unobserve(entrada.target);
      });
    }, { rootMargin: '0px 0px -6%', threshold: 0.05 });
    Array.prototype.forEach.call(blocos, function (el) { observador.observe(el); });
  }

  /* ---------- Máscaras ---------- */
  function mascarar(campo, formatar) {
    if (!campo) return;
    campo.addEventListener('input', function () { campo.value = formatar(campo.value); });
  }

  mascarar(document.getElementById('whatsapp'), function (valor) {
    var d = valor.replace(/\D/g, '').slice(0, 11);
    if (d.length > 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(-4);
    if (d.length > 2) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    return d;
  });

  mascarar(document.getElementById('cnpj'), function (valor) {
    var d = valor.replace(/\D/g, '').slice(0, 14);
    var saida = d;
    if (d.length > 2) saida = d.slice(0, 2) + '.' + d.slice(2);
    if (d.length > 5) saida = d.slice(0, 2) + '.' + d.slice(2, 5) + '.' + d.slice(5);
    if (d.length > 8) saida = d.slice(0, 2) + '.' + d.slice(2, 5) + '.' + d.slice(5, 8) + '/' + d.slice(8);
    if (d.length > 12) saida = d.slice(0, 2) + '.' + d.slice(2, 5) + '.' + d.slice(5, 8) + '/' + d.slice(8, 12) + '-' + d.slice(12);
    return saida;
  });

  /* ---------- Formulário qualificado ---------- */
  var form = document.getElementById('form-catalogo');
  var retorno = document.getElementById('retorno');

  function marcarErro(campo, mostrar) {
    var caixa = campo.closest('.campo');
    var aviso = form.querySelector('[data-erro-de="' + campo.id + '"]');
    if (caixa) caixa.classList.toggle('erro', mostrar);
    if (aviso) aviso.hidden = !mostrar;
    campo.setAttribute('aria-invalid', mostrar ? 'true' : 'false');
  }

  function validar(campo) {
    var v = campo.value.trim();
    var ok;
    if (campo.id === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    else if (campo.id === 'whatsapp') ok = v.replace(/\D/g, '').length >= 10;
    else if (campo.id === 'cnpj') ok = v.replace(/\D/g, '').length === 14;
    else ok = v.length >= 2;
    marcarErro(campo, !ok);
    return ok;
  }

  if (form) {
    var obrigatorios = form.querySelectorAll('[required]');

    Array.prototype.forEach.call(obrigatorios, function (campo) {
      campo.addEventListener('blur', function () { if (campo.value.trim()) validar(campo); });
      campo.addEventListener('input', function () {
        if (campo.closest('.campo').classList.contains('erro')) validar(campo);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valido = true, primeiro = null;
      Array.prototype.forEach.call(obrigatorios, function (campo) {
        if (!validar(campo)) { valido = false; if (!primeiro) primeiro = campo; }
      });

      if (!valido) {
        if (primeiro) primeiro.focus();
        retorno.hidden = false;
        retorno.textContent = 'Faltam dados nos campos destacados.';
        return;
      }

      var dados = {
        nome: form.nome.value.trim(),
        empresa: form.empresa.value.trim(),
        operacao: form.operacao.value,
        cnpj: form.cnpj.value.trim(),
        cidade: form.cidade.value.trim(),
        email: form.email.value.trim(),
        whatsapp: form.whatsapp.value.trim(),
        mensagem: form.mensagem.value.trim()
      };

      var texto = 'Pedido de catálogo — Toscana Alta Gastronomia\n\n' +
        'Nome: ' + dados.nome + '\n' +
        'Empresa: ' + dados.empresa + '\n' +
        'Operação: ' + dados.operacao + '\n' +
        'CNPJ: ' + dados.cnpj + '\n' +
        'Cidade: ' + dados.cidade + '\n' +
        'E-mail: ' + dados.email + '\n' +
        'WhatsApp: ' + dados.whatsapp +
        (dados.mensagem ? '\n\nMensagem: ' + dados.mensagem : '');

      function confirmar(msg) {
        retorno.hidden = false;
        retorno.textContent = msg;
        form.reset();
      }

      if (FORM_ENDPOINT) {
        var botao = form.querySelector('button[type="submit"]');
        botao.disabled = true;
        botao.textContent = 'Enviando';

        fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(dados)
        }).then(function (r) {
          if (!r.ok) throw new Error('falha no envio');
          confirmar('Pedido registrado. O catálogo será enviado para ' + dados.email + ' em até um dia útil.');
        }).catch(function () {
          window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
          confirmar('O envio pelo site falhou. O WhatsApp foi aberto com os dados preenchidos; ' +
            'o pedido também pode seguir para ' + EMAIL + '.');
        }).then(function () {
          botao.disabled = false;
          botao.textContent = 'Solicitar catálogo';
        });
      } else {
        window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
        confirmar('Pedido pronto no WhatsApp, com os dados preenchidos — basta enviar. ' +
          'Por e-mail, o endereço é ' + EMAIL + '.');
      }
    });
  }

  /* ---------- Ano do rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();

/* Microinterações do portfólio — sem dependências externas. */
(function () {
    'use strict';

    var reduzirMovimento = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Revela os elementos conforme entram na área visível.
    var seletores = [
        '.hero > div', '.hero .photo', '.section-title',
        '.grid > .card', '.two-col > *', '.section > h2',
        '.cta', '.page-head', '.cv-head', '.cv section'
    ];
    var elementos = document.querySelectorAll(seletores.join(','));

    if (!reduzirMovimento && 'IntersectionObserver' in window) {
        var observador = new IntersectionObserver(function (entradas, obs) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('is-visible');
                    obs.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

        elementos.forEach(function (elemento, indice) {
            elemento.classList.add('reveal');
            if (elemento.matches('.grid > .card')) {
                elemento.style.setProperty('--reveal-delay', (indice % 4) * 75 + 'ms');
            }
            observador.observe(elemento);
        });
    }

    // Digitação real do bloco PHP, preservando as cores de sintaxe (spans).
    var editor = document.querySelector('.typing-code');
    if (!editor) return;

    var codigo = editor.querySelector('code');
    if (!codigo) return;

    var original = Array.prototype.map.call(codigo.childNodes, function (node) {
        return node.cloneNode(true);
    });

    function mostrarCodigoCompleto() {
        codigo.replaceChildren.apply(codigo, original.map(function (node) {
            return node.cloneNode(true);
        }));
        editor.classList.add('typing-done');
    }

    if (reduzirMovimento || !('IntersectionObserver' in window)) {
        mostrarCodigoCompleto();
        return;
    }

    var iniciou = false;
    function digitar() {
        if (iniciou) return;
        iniciou = true;
        codigo.replaceChildren();

        function escreverNo(no, destino) {
            if (no.nodeType === Node.TEXT_NODE) {
                var texto = no.nodeValue;
                var indice = 0;
                return new Promise(function (resolve) {
                    function proximo() {
                        if (indice >= texto.length) return resolve();
                        destino.appendChild(document.createTextNode(texto.charAt(indice++)));
                        window.setTimeout(proximo, 13);
                    }
                    proximo();
                });
            }

            if (no.nodeType === Node.ELEMENT_NODE) {
                var elemento = document.createElement(no.tagName);
                if (no.className) elemento.className = no.className;
                destino.appendChild(elemento);
                return Array.prototype.reduce.call(no.childNodes, function (fila, filho) {
                    return fila.then(function () { return escreverNo(filho, elemento); });
                }, Promise.resolve());
            }
            return Promise.resolve();
        }

        original.reduce(function (fila, no) {
            return fila.then(function () { return escreverNo(no, codigo); });
        }, Promise.resolve()).then(function () {
            editor.classList.add('typing-done');
        });
    }

    var codeObserver = new IntersectionObserver(function (entradas, obs) {
        if (entradas.some(function (entrada) { return entrada.isIntersecting; })) {
            digitar();
            obs.disconnect();
        }
    }, { threshold: 0.25 });
    codeObserver.observe(editor);
})();

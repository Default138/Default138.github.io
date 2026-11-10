/*
 * Seletor de tema: Claro, Escuro ou Alto contraste.
 *
 * - A escolha fica salva no navegador (localStorage) e vale para todas as páginas.
 * - O tema inicial é aplicado por um script curto no <head> de cada página, antes de
 *   ela aparecer, para não "piscar" com o tema errado.
 * - Na primeira visita, segue a preferência do sistema da pessoa.
 * - Dá para abrir já num tema pelo link: ?tema=claro, ?tema=escuro ou ?tema=contraste.
 */
(function () {
    var temas = ['claro', 'escuro', 'contraste'];

    // cor da barra do navegador no celular, para combinar com cada tema
    var corDaBarra = { claro: '#f4f8f1', escuro: '#0b171c', contraste: '#000000' };

    var raiz = document.documentElement;

    function aplicar(tema, salvar) {
        if (temas.indexOf(tema) === -1) {
            return;
        }

        raiz.setAttribute('data-theme', tema);

        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', corDaBarra[tema]);
        }

        // marca qual botão está selecionado (aria-pressed também avisa leitores de tela)
        var botoes = document.querySelectorAll('[data-tema]');
        for (var i = 0; i < botoes.length; i++) {
            var ativo = botoes[i].getAttribute('data-tema') === tema;
            botoes[i].setAttribute('aria-pressed', ativo ? 'true' : 'false');
        }

        if (salvar) {
            try {
                localStorage.setItem('tema', tema);
            } catch (e) {
                // navegador sem localStorage (ex.: modo privado restrito): o tema vale só nesta página
            }
        }
    }

    aplicar(raiz.getAttribute('data-theme') || 'escuro', false);

    document.addEventListener('click', function (evento) {
        var botao = evento.target.closest ? evento.target.closest('[data-tema]') : null;
        if (botao) {
            aplicar(botao.getAttribute('data-tema'), true);
        }
    });
})();

# Portfólio - Rafael Camargo

Site pessoal feito com **HTML e CSS** (e um pouco de JavaScript só para o seletor de tema): sem biblioteca e sem internet para funcionar.
Funciona abrindo o `index.html` direto no navegador (duplo clique). No VS Code, a extensão
"Live Server" também serve para ver as mudanças ao salvar.

## Estrutura

```text
index.html       Início: apresentação, projetos em destaque e contato
sobre.html       Sobre: quem sou, habilidades, o que estou praticando e trajetória
projetos.html    Todos os projetos, com link para o GitHub
curriculo.html   Currículo (Ctrl+P salva em PDF; a impressão já sai limpa)
css/style.css    Todo o visual do site
img/foto.jpg     Foto do perfil (recortada)
img/favicon.svg  Ícone da aba do navegador
js/tema.js       Seletor de tema: Claro, Escuro e Alto contraste (a escolha fica salva no navegador)
```

## Como editar

- **Textos:** abra o `.html` e troque o texto entre as tags. Os trechos de cada seção estão separados por
  comentários como `<!-- Contato -->`.
- **Cores:** no começo do `css/style.css` ficam as variáveis (`--accent`, `--bg-1`...). Mudar ali muda o site todo.
- **Novo projeto:** em `projetos.html`, copie um bloco `<article class="card"> ... </article>` e troque título,
  descrição, tags e link.
- **Foto:** troque o arquivo `img/foto.jpg` (de preferência quadrado, uns 600x600). Depois, nos `.html`, use
  "Localizar e substituir" para trocar `foto.jpg?v=2` por `foto.jpg?v=3` (e assim por diante). Sem isso, quem
  já visitou o site continua vendo a foto antiga, guardada pelo navegador. O mesmo vale para as cores:
  ao mudar o `css/style.css`, troque `style.css?v=3` por `style.css?v=4` (e o mesmo para `tema.js?v=1` se mudar o seletor).
- **Currículo:** `curriculo.html` foi montado a partir do seu PDF do Canva. Quando mudar de emprego ou
  concluir um curso, copie um bloco `<div class="cv-item"> ... </div>` e atualize datas e textos.
- **Contatos:** e-mail, WhatsApp, GitHub e Instagram aparecem em `index.html`, `sobre.html` e `curriculo.html`.
  Use "Localizar e substituir" no editor para trocar em todos de uma vez.

## Como publicar (GitHub Pages, de graça)

1. Crie um repositório no GitHub (por exemplo `portfolio`) e envie estes arquivos para a raiz dele.
2. No repositório: **Settings > Pages > Branch: main > Save**.
3. Depois de um ou dois minutos o site abre em `https://default138.github.io/portfolio/`.

Dica: se o repositório se chamar `Default138.github.io`, o endereço fica só `https://default138.github.io/`.

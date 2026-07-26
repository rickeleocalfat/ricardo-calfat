# Toscana Alta Gastronomia — site institucional

Site estático (HTML + CSS + JS puro, sem build). Basta subir a pasta `toscana/`
para qualquer hospedagem (GoDaddy, Hostinger, Netlify, GitHub Pages…).

```
toscana/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── fotos/          ← coloque as imagens aqui
└── README.md
```

## 1. Fotos (o que falta para publicar)

Não foi possível baixar as imagens do site atual (o servidor bloqueou o acesso
automatizado), então **nenhuma foto genérica foi inventada**. Cada espaço de
imagem está marcado no site com `[FOTO: ...]`.

Para preencher: salve os arquivos em `assets/fotos/` **com exatamente estes
nomes**. Assim que o arquivo existir, a foto aparece sozinha e o aviso some —
não precisa mexer no código.

| Arquivo | Onde aparece | Formato sugerido |
|---|---|---|
| `hero-trufas.jpg` | Imagem de tela cheia do topo | horizontal, 2400×1400 |
| `og-capa.jpg` | Miniatura ao compartilhar no WhatsApp/redes | 1200×630 |
| `porque-toscana.jpg` | Seção “Por que a Toscana” | vertical, 1200×1600 |
| `cat-trufas.jpg` | Categoria Trufas | horizontal 4:3, 1200×900 |
| `cat-caviar.jpg` | Categoria Caviar | 4:3 |
| `cat-vinhos.jpg` | Categoria Vinhos | 4:3 |
| `cat-azeites.jpg` | Categoria Azeites & Acetos | 4:3 |
| `cat-massas.jpg` | Categoria Massas | 4:3 |
| `cat-trufados.jpg` | Categoria Produtos trufados | 4:3 |
| `cat-azeitonas.jpg` | Categoria Azeitonas & Conservas | 4:3 |
| `cat-molhos.jpg` | Categoria Molhos & Atomatados | 4:3 |
| `cat-arroz.jpg` | Categoria Arroz & Caldos | 4:3 |
| `marca-leonardi.jpg` | Card Leonardi | quadrada, 900×900 |
| `marca-savitar.jpg` | Card Savitar | quadrada |
| `marca-caviar-import.jpg` | Card Caviar Import | quadrada |
| `marca-frescobaldi-laudemio.jpg` | Card Frescobaldi / Laudemio | quadrada |
| `marca-cipriani.jpg` | Card Cipriani | quadrada |
| `marca-martelli.jpg` | Card Martelli | quadrada |
| `marca-dal-forno-romano.jpg` | Card Dal Forno Romano | quadrada |
| `marca-monsanto.jpg` | Card Monsanto | quadrada |
| `marca-pietroso.jpg` | Card Pietroso | quadrada |
| `marca-la-serena.jpg` | Card La Serena | quadrada |
| `marca-castello-di-bolgheri.jpg` | Card Castello di Bolgheri | quadrada |
| `marca-de-carlo.jpg` | Card De Carlo | quadrada |
| `marca-agrigenus.jpg` | Card Agrigenus | quadrada |
| `marca-bauer.jpg` | Card Bauer | quadrada |
| `marca-sinisi.jpg` | Card Sinisi | quadrada |
| `marca-fratelli-calvi.jpg` | Card Fratelli Calvi | quadrada |
| `marca-acquerello.jpg` | Card Acquerello | quadrada |

**A extensão não importa**: pode subir `.jpg`, `.png` ou `.webp` (maiúsculas
também funcionam). O que precisa bater é o nome — `cat-trufas.png` funciona
igual a `cat-trufas.jpg`. Também não é preciso subir todas de uma vez: as que
faltarem continuam mostrando o aviso `[FOTO: ...]` e o resto do site funciona.

Dica de performance: exporte com qualidade ~75 e no máximo 250 KB por imagem
(a do topo pode ir até 400 KB).

### Como subir

- **Pelo GitHub** (mais simples): abra a pasta `toscana/assets/fotos/`, clique
  em *Add file → Upload files*, arraste as imagens já renomeadas e confirme.
- **Pelo computador**: copie os arquivos para `toscana/assets/fotos/` e faça
  `git add`, `git commit` e `git push`.
- **Pela hospedagem**: se o site já estiver publicado, basta enviar as imagens
  para a pasta `assets/fotos/` do servidor por FTP ou pelo gerenciador de
  arquivos do painel.

## 2. Depoimentos

A seção “Quem cozinha com a Toscana” está com três blocos
`[DEPOIMENTO PLACEHOLDER]` no `index.html`. Substitua o texto do
`<blockquote>` e o `<figcaption>` (nome do chef · restaurante) pelos
depoimentos reais — ou remova a seção `<section id="depoimentos">` inteira
se ainda não houver depoimentos autorizados.

## 3. Formulário de catálogo

Sem back-end, o formulário valida os campos e abre o WhatsApp da Toscana já
com os dados preenchidos, mostrando a mensagem de confirmação na tela.

Para receber os pedidos por e-mail, abra `assets/js/main.js` e preencha:

```js
var FORM_ENDPOINT = 'https://formsubmit.co/ajax/vendas@toscanagastronomia.com.br';
```

(Funciona com FormSubmit, Formspree, Basin ou qualquer endpoint que aceite
`POST` em JSON. Se o envio falhar, o site cai automaticamente no WhatsApp.)

## 4. Dados usados no site

- Endereço: Rua Coronel Artur de Paula Ferreira, 59 — São Paulo/SP
- WhatsApp/telefone: 11 3849-3484 (`https://wa.me/551138493484`)
- E-mail: vendas@toscanagastronomia.com.br
- Horário de atendimento: segunda a sexta, 9h às 18h — **confirme antes de publicar**

## 5. Testar localmente

```bash
cd toscana
python3 -m http.server 8000
# abra http://localhost:8000
```

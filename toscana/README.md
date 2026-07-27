# Toscana Alta Gastronomia — site institucional

Site estático (HTML + CSS + JS puro, sem build). Basta subir a pasta `toscana/`
para qualquer hospedagem (GoDaddy, Hostinger, Netlify, GitHub Pages…).

```
toscana/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── img/logo-toscana.png     ← emblema da marca
│   └── fotos/                   ← fotos dos produtos
└── README.md
```

## 1. Fotos

Todas as imagens vieram do **catálogo Toscana Food Service 2026** (PDF), inclusive
o emblema da marca, extraído da capa. Não há nenhum espaço de foto vazio no site.

| Onde | Foto |
|---|---|
| Abertura | trufa negra fresca, recortada sobre o verde |
| Destaque do portfólio | trufa negra inteira e cortada |
| Azeites & Acetos | azeite EV Arzentu · Calvi |
| Massas | fusilli di Pisa · Martelli |
| Produtos trufados | salsa com trufa branca · Savitar |
| Azeitonas & Conservas | azeitona Leccino · Sinisi |
| Molhos & Atomatados | San Marzano D.O.P. · Rega |
| Arroz & Caldos | carnaroli · Acquerello |
| A casa | trufa branca fresca |
| Esteira da vitrine | 16 produtos, cada um com nome e marca |
| Compartilhamento (Open Graph) | composição com emblema e trufa |

**Caviar e vinhos não têm foto no catálogo.** Em vez de deixar espaços vazios,
essas duas categorias são peças tipográficas em verde, com o emblema da casa —
e a seção de marcas é um índice em texto, que não depende de imagem. Se um dia
chegarem fotos desses produtos, dá para transformar as peças em cards com foto.

### Trocar ou acrescentar uma foto

Substitua o arquivo em `assets/fotos/` mantendo o nome. A extensão pode ser
`.jpg`, `.png` ou `.webp` — o site tenta todas. Formato: fundo branco, produto
inteiro, ~900×900 px, até 250 KB.

Como subir:

- **Pelo GitHub**: abra `toscana/assets/fotos/`, clique em *Add file → Upload
  files*, arraste os arquivos e confirme.
- **Pelo computador**: copie para `toscana/assets/fotos/` e faça `git add`,
  `git commit` e `git push`.
- **Pela hospedagem**: envie por FTP para `assets/fotos/` no servidor.

## 2. Formulário de catálogo

Sem back-end, o formulário valida os campos e abre o WhatsApp da Toscana já com
os dados preenchidos, mostrando a confirmação na tela.

Para receber os pedidos por e-mail, abra `assets/js/main.js` e preencha:

```js
var FORM_ENDPOINT = 'https://formsubmit.co/ajax/vendas@toscanagastronomia.com.br';
```

(Funciona com FormSubmit, Formspree, Basin ou qualquer endpoint que aceite
`POST` em JSON. Se o envio falhar, o site cai automaticamente no WhatsApp.)

## 3. Dados usados no site

- Endereço: Rua Coronel Artur de Paula Ferreira, 59 — São Paulo/SP
- WhatsApp/telefone: 11 3849-3484 (`https://wa.me/551138493484`)
- E-mail: vendas@toscanagastronomia.com.br
- Horário de atendimento: segunda a sexta, 9h às 18h — **confirme antes de publicar**

Pontos a conferir com a empresa:

- O tomate San Marzano D.O.P. do catálogo é da marca **Rega**; o índice de
  marcas lista **Agrigenus**. Vale confirmar qual está correta hoje.
- O catálogo traz marcas que não estão no índice do site: **Barbera** (azeites
  DOP da Sicília), **Rega**, **Eurovanille**, **Olivere** e **Verdu**.

## 4. Testar localmente

```bash
cd toscana
python3 -m http.server 8000
# abra http://localhost:8000
```

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

## 1. Fotos

As imagens vieram do **catálogo Toscana Food Service** (PDF): 18 espaços já
estão preenchidos com as fotos originais dos produtos, e o emblema da marca é
o logo real, extraído da capa do catálogo.

| Onde | Foto usada |
|---|---|
| Topo (hero) | trufa negra fresca, recortada sobre o verde |
| “Por que a Toscana” | trufa branca fresca |
| Compartilhamento (Open Graph) | composição com logo + trufa |
| Trufas | trufa negra inteira e cortada |
| Azeites & Acetos | azeite Calvi Arzentu |
| Massas | fusilli Martelli |
| Produtos trufados | salsa com trufa branca Savitar |
| Azeitonas & Conservas | azeitona Leccino Sinisi |
| Molhos & Atomatados | tomate San Marzano D.O.P. |
| Arroz & Caldos | arroz Acquerello |
| Marcas com foto | Leonardi, Savitar, Frescobaldi/Laudemio, Cipriani, Martelli, De Carlo, Sinisi, Fratelli Calvi, Acquerello |

### Ainda faltam 10 fotos

O catálogo não traz imagens de caviar nem de vinhos, então estes espaços
continuam com o aviso `[FOTO: ...]` no site:

| Arquivo | Onde aparece |
|---|---|
| `cat-caviar` | Categoria Caviar |
| `cat-vinhos` | Categoria Vinhos |
| `marca-caviar-import` | Card Caviar Import |
| `marca-dal-forno-romano` | Card Dal Forno Romano |
| `marca-monsanto` | Card Monsanto |
| `marca-pietroso` | Card Pietroso |
| `marca-la-serena` | Card La Serena |
| `marca-castello-di-bolgheri` | Card Castello di Bolgheri |
| `marca-agrigenus` | Card Agrigenus |
| `marca-bauer` | Card Bauer |

Salve cada arquivo em `assets/fotos/` com o nome da tabela. **A extensão não
importa**: `.jpg`, `.png` ou `.webp` (maiúsculas também). Assim que o arquivo
existir, a foto aparece sozinha e o aviso some — sem mexer no código. Formato
sugerido: 4:3 (~1200×900) para categorias e quadrada (~900×900) para marcas.

Dica de performance: qualidade ~75 e no máximo 250 KB por imagem.

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

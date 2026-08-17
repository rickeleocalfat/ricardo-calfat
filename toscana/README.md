# Toscana Alta Gastronomia — site

Site estático (HTML, CSS e JS puro, sem build). Para publicar, o conteúdo desta
pasta vai para a raiz do servidor.

```
toscana/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── img/logo-toscana.png     ← medalhão oficial, extraído da capa do Catálogo 2026
│   └── fotos/                   ← fotos de produto (.jpg + .webp)
└── README.md
```

## Situação frente ao briefing de agosto de 2026

| Seção do briefing | Situação |
|---|---|
| 4 · Padrão visual obrigatório | **Aplicado** — paleta, três famílias tipográficas, régua de ouro, geometria, sombras, movimento e medalhão em marca d'água |
| 5 · Fotografia | **Parcial** — sete famílias com foto do Catálogo 2026; caviar e vinhos em tile creme com medalhão a 10%. Nenhum “FOTO” no ar |
| 6 · Arquitetura de informação | **Pendente** — home refeita; páginas de família, de casa, de produto e de trufa fresca ainda não existem |
| 7 · Conversão comercial | **Aplicado** — formulário qualificado, barra de ação permanente, botões no padrão. Integração de leads pendente de decisão |
| 8 · Conteúdo e voz | **Aplicado** — terceira pessoa, sem exclamação, sem emoji, léxico e Title Case preservados |
| 9 · Requisitos técnicos | **Aplicado** — responsivo, AA verificado, alt em todas as fotos, WebP, SEO local e dados estruturados de produto |
| 10 · Área do cliente (fase 2) | Fora do escopo atual |

### O que já cumpre os critérios de aceite

- Nenhum placeholder de imagem no ar.
- Cores e tipografia conferidas contra a seção 4 (uma exceção documentada abaixo).
- Contraste AA verificado em 191 amostras de texto renderizado: nenhuma falha.
- Formulário testado ponta a ponta, com validação, máscara de CNPJ e WhatsApp.

### Desvio da seção 4, para aprovação por escrito

O ouro **#B8943F** em texto pequeno rende 2,65:1 sobre papel — abaixo do mínimo
AA de 4,5:1 exigido pela seção 9. Para cumprir as duas regras, o ouro da paleta
segue **intacto em réguas, losangos, selos e bordas**, e os rótulos de texto usam
duas variações do mesmo ouro:

| Uso | Valor | Contraste |
|---|---|---|
| Réguas, losangos, selos, bordas | `#B8943F` (paleta) | não se aplica |
| Rótulos sobre papel e creme | `#8A6A1F` | 4,7:1 |
| Rótulos sobre verde | `#D9B863` | 4,5:1 |

Se a Toscana preferir o ouro único, a alternativa é aumentar o corpo dos rótulos
— o mínimo cai para 3:1 acima de 24px.

## Trufa fresca: o estado da semana

O bloco da temporada calcula sozinho, pela data do dia, se cada espécie está
**em temporada**, **chegando** (30 dias antes) ou **fora de temporada**. Os
períodos vieram do Catálogo 2026 e ficam no alto de `assets/js/main.js`:

```js
var TEMPORADAS = {
  branca:  [[10, 1, 12, 31]],                  // outubro a dezembro
  verao:   [[5, 1, 8, 31], [10, 1, 12, 31]],   // maio a agosto e outubro a dezembro
  outono:  [[10, 1, 3, 15]],                   // outubro a 15 de março
  inverno: [[11, 15, 3, 15]]                   // 15 de novembro a 15 de março
};
```

Cada faixa é `[mês inicial, dia inicial, mês final, dia final]`. Editar essas
linhas é suficiente — nada mais precisa mudar.

## Fotos

Todas vieram do Catálogo Toscana Food Service 2026, inclusive o medalhão da capa.
O tile é creme e a foto entra por contenção, com `mix-blend-mode: multiply`, de
modo que o campo branco do estúdio funde com o creme e o produto nunca é cortado.

Para trocar: substitua o arquivo em `assets/fotos/` mantendo o nome, e gere o
`.webp` ao lado (mesmo nome, extensão diferente). Padrão: produto centralizado
sobre campo branco ou creme, luz uniforme, sem props, ~900×900 px.

**Sem foto no catálogo:** caviar e vinhos. Enquanto a produção não sai, as duas
famílias aparecem em tile creme com o medalhão a 10%, conforme a seção 5.

## Formulário

Sem back-end, o formulário valida os sete campos obrigatórios e abre o WhatsApp
com os dados já formatados, mostrando a confirmação na tela. Para enviar por
e-mail ou CRM, preencha no alto de `assets/js/main.js`:

```js
var FORM_ENDPOINT = 'https://formsubmit.co/ajax/vendas@toscanagastronomia.com.br';
```

Aceita FormSubmit, Formspree, Basin ou qualquer endpoint que receba `POST` em
JSON. Se o envio falhar, o site cai automaticamente no WhatsApp.

## Pendências da Toscana

Todas bloqueiam algum item do briefing.

1. **Data de fundação.** O site diz 2000; a capa do Catálogo 2026 diz
   *“Pioneiros no Brasil desde 2002”*. As duas podem conviver — fundação em 2000
   e pioneirismo em trufa em 2002 —, mas o critério de aceite pede data única.
   Hoje o site usa 2000 em título, abertura, rodapé e metadados.
2. ~~**Preço no site.**~~ **Decidido:** sem preço no site. As fichas de produto
   mostrarão “Consultar”, e os valores seguem apenas na tabela enviada por
   e-mail.
3. **Destino dos leads.** E-mail, planilha ou CRM.
4. **Ano de fundação das casas.** Só duas estão documentadas: Acetaia Leonardi
   (1871, no rótulo) e Martelli (1926). As outras quinze fichas estão sem o ano
   — nenhum foi estimado.
5. **Atendimento por região.** A seção 6 pede o dado no contato comercial; não há
   informação disponível.
6. **Fontes licenciadas.** Estão em uso as substitutas do Google Fonts indicadas
   no briefing: Cinzel, Cormorant Garamond e Mulish.
7. **Marcas fora do índice.** O catálogo traz **Barbera** e **Rega**, que já
   entraram nas fichas, e ainda **Eurovanille**, **Olivere** e **Verdu**, que não
   entraram. O tomate San Marzano do catálogo é da Rega, não da Agrigenus, que
   por isso saiu da lista.

## Testar localmente

```bash
cd toscana
python3 -m http.server 8000
# abra http://localhost:8000
```

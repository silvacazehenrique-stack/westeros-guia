# Westeros — Guia da 1ª Temporada

App web (PWA) que funciona offline e instala na tela de início do iPhone.
Todos os arquivos desta pasta são estáticos: não há servidor nem build.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | A página. É o ponto de entrada. |
| `app.js` | O app inteiro empacotado (React + mapa + dados + retratos). |
| `sw.js` | Service worker: guarda o app para abrir sem internet. |
| `manifest.webmanifest` | Diz ao celular o nome, o ícone e que abre em tela cheia. |
| `icone-*.png`, `apple-touch-icon.png`, `icone.svg` | Ícones. |

## Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (ex.: `westeros-guia`). Pode ser **privado**.
2. Envie **o conteúdo desta pasta** para a raiz do repositório — `index.html` precisa
   ficar na raiz, não dentro de uma subpasta.
3. No repositório: **Settings → Pages**.
4. Em *Source*, escolha **Deploy from a branch**; em *Branch*, `main` e pasta `/ (root)`. Salve.
5. Aguarde um ou dois minutos. O endereço será:
   `https://SEU-USUARIO.github.io/westeros-guia/`

Os caminhos são todos relativos (`./app.js`), então funciona em subpasta sem ajuste.

### Alternativa: Vercel

Arraste a pasta em `vercel.com/new` e publique. Não precisa configurar nada.

## Instalar no iPhone

1. Abra o endereço no **Safari** (precisa ser o Safari; no Chrome do iPhone não instala).
2. Toque em **Compartilhar** (o quadrado com a flecha para cima).
3. **Adicionar à Tela de Início** → *Adicionar*.

Pronto: o ícone fica junto dos outros apps, abre em tela cheia, sem barra de endereço,
e funciona no modo avião.

## Fotos e progresso

Ficam guardados no **IndexedDB do aparelho** — não sobem para a internet, não vão
para o repositório.

Consequência: **cada aparelho tem suas próprias fotos.** Para levar de um para outro,
use **Elenco → Backup deste aparelho → exportar**, mande o arquivo `.json` para você
mesmo (AirDrop, e-mail, Arquivos) e use **importar** no outro aparelho.

Vale um aviso: se o repositório for público, não adicione fotos de atores nos arquivos
do projeto — seria republicar material protegido. Enviando pelo app, elas ficam só
no seu aparelho, o que é uso pessoal.

## Publicar uma atualização

Ao trocar o `app.js`, abra o `sw.js` e mude a versão:

```js
const VERSAO = "westeros-v2";
```

Sem isso, o celular continua servindo a versão guardada em cache. Depois de atualizar,
feche e reabra o app (ou espere alguns segundos e recarregue duas vezes).

## Se algo der errado

- **Tela em branco:** confirme que `app.js` está na mesma pasta do `index.html`.
- **Não aparece "Adicionar à Tela de Início":** você não está no Safari.
- **Alterações não aparecem:** cache do service worker. Mude a `VERSAO` no `sw.js`.
- **Fotos desapareceram:** o iOS pode limpar dados de sites não usados por semanas.
  O backup exportado é a proteção contra isso.

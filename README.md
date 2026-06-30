# Declaração de Conteúdo — Emissor de Documentos

Aplicativo web para emissão e impressão de **Declarações de Conteúdo** no formato padrão dos Correios. Preencha os dados na tela, visualize o documento e imprima em PDF ou diretamente em uma impressora.

## Funcionalidades

- **Formulário completo** com campos de Remetente, Destinatário, Itens do Conteúdo e Dados Complementares.
- **Linhas dinâmicas**: começa com 4 linhas e permite adicionar até 12. Apenas as linhas preenchidas aparecem no documento final.
- **Campos opcionais**: deixe campos em branco para preenchimento manual (à caneta) ou preencha tudo pelo sistema.
- **Pré-visualização** do documento antes de imprimir.
- **Layout fiel** ao modelo oficial, com linhas e organização visual idênticas.
- **Formato A4 retrato**: o documento ocupa inicialmente meia folha (1/2 A4) e se estende até uma folha inteira conforme o conteúdo.
- **Cálculo automático** de totais (quantidade e valor) e peso total.
- **Texto padrão** da declaração legal já incluído, com opção de personalizar a observação.

## Como usar

1. Preencha os dados do **Remetente** e **Destinatário**.
2. Adicione os **Itens do Conteúdo** (conteúdo, quantidade e valor). Use o botão **Adicionar linha** para incluir mais itens (até 12).
3. Informe o **Peso Total**, o **Local** e a **Data** (dia/mês/ano) da declaração.
4. (Opcional) Edite a **Observação** — se deixar em branco, o texto padrão sobre crime contra a ordem tributária será usado.
5. Clique em **Visualizar** para conferir o documento.
6. Clique em **Imprimir** para gerar o documento e enviar à impressora (ou salvar como PDF).

## Dicas de impressão

- Na caixa de diálogo de impressão do navegador, selecione **A4** e **Orientação: Retrato**.
- Desative cabeçalho e rodapé do navegador para um resultado limpo.
- As margens já estão configuradas (10mm superior/inferior, 12mm laterais).

## Campos em branco

Qualquer campo não preenchido aparece no documento final como uma **linha em branco** (sublinhado), pronta para preenchimento manual à caneta. Isso inclui nome, endereço, cidade, UF, CEP, documento, data e assinatura.

## Tecnologias

- React + TypeScript
- Vite
- Tailwind CSS
- Lucide React (ícones)

## Publicar no GitHub Pages (acesso via link)

Para que qualquer pessoa acesse o sistema pelo navegador, sem instalar nada:

1. Suba o código para um repositório no GitHub.
2. Instale o pacote de deploy (uma vez):
   ```bash
   npm install --save-dev gh-pages
   ```
3. Edite o `package.json` e ajuste a URL em `"deploy"` se necessário (o script já está incluído).
4. Rode:
   ```bash
   npm run deploy
   ```
5. No GitHub, vá em **Settings → Pages** e confirme que a branch `gh-pages` está selecionada como fonte.
6. O sistema ficará disponível em:
   ```
   https://SEU_USUARIO.github.io/NOME_DO_REPO/
   ```

Depois de publicado, basta compartilhar esse link — o usuário abre no navegador e usa o sistema direto, sem instalar Node.js nem clonar o repositório.

## Executando localmente

```bash
npm install
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Estrutura do projeto

```
src/
├── App.tsx            # Formulário e controle de estado
├── PrintDocument.tsx  # Layout do documento impresso
├── types.ts           # Tipos TypeScript
└── index.css          # Estilos e regras de impressão (@media print)
```

## Observações

- Os dados não são salvos — ao recarregar a página, o formulário é reiniciado.
- O documento segue o modelo padrão de Declaração de Conteúdo dos Correios, incluindo o texto legal sobre dispensa de emissão de nota fiscal e a referência à lista de proibições e restrições.

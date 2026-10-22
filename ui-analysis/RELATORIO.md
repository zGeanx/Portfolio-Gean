# Relatório de Análise UI/UX e Front-End — Portfólio Gean Luca

Data da análise: Outubro de 2026  
Ambiente analisado: Local (`http://localhost:8082`) sob TanStack Start, React 19, Vite 8 e Tailwind CSS v4  
Especialista: Antigravity UI/UX & Front-End Engineering Agent

---

## 1. Resumo Executivo (Máx. 10 linhas)

O portfólio de Gean Luca apresenta uma base técnica sólida e moderna (TanStack Start, React 19, TypeScript, Tailwind v4 e suporte a i18n/tema claro-escuro), transmitindo sobriedade e organização com sua estética dark esmeralda/menta. Contudo, a interface sofre com sobrecarga de chamadas de ação no Hero (4 botões competindo), hierarquia mobile invertida (foto consumindo a primeira dobra antes da proposta de valor) e atritos de experiência críticos como o menu mobile flutuante improvisado e um formulário de contato falso que apenas aciona links `mailto:`. Além disso, há dezenas de dependências Radix/shadcn instaladas no `package.json` que foram deixadas de lado em prol de implementações manuais menos acessíveis. Os três maiores ganhos possíveis são:

1. **Redesenho da Primeira Dobra e Hierarquia de Ações**: Reduzir os 4 botões do Hero para 2 e reorganizar o layout mobile para que a proposta de valor e o nome do desenvolvedor apareçam imediatamente na primeira dobra.
2. **Substituição do Menu Mobile por um Drawer Moderno e Acessível**: Trocar o dropdown flutuante atual por um Sheet/Drawer completo via `vaul` ou Radix Dialog, garantindo alvos de toque adequados (≥ 48px).
3. **Transformação do Formulário de Contato em um Fluxo Real com Feedback**: Conectar o envio a uma API serverless funcional (com estados de carregamento, sucesso e erro) em vez de redirecionar para cliente desktop de e-mail.

---

## 2. Tabela de Problemas de Interface

Ordenada por prioridade e severidade decrescente.

| ID        | Tela / Resolução                  | Screenshot Referenciada                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Problema Identificado                                                                                                                                                                                                                              | Categoria                             | Severidade | Arquivo / Componente                                                                             | Correção Sugerida                                                                                                                                                                           | Esforço |
| :-------- | :-------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------ | :--------- | :----------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-----: |
| **UI-01** | Mobile (390px)                    | [`hero-mobile.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/hero-mobile.png), [`home-mobile.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/home-mobile.png)                                                                                                                                                                                                                                                           | **Primeira dobra mobile invertida:** A foto do perfil tem `order-1` e altura excessiva (~300px), empurrando nome, cargo e proposta de valor para fora do primeiro viewport do smartphone.                                                          | Responsividade / Hierarquia           | **Alta**   | `src/components/portfolio/Hero.tsx` (linhas 47 e 89)                                             | Inverter para `order-1` no bloco de texto no mobile ou utilizar um avatar compacto com layout integrado, garantindo que nome, papel técnico e CTA principal apareçam sem rolagem.           |  **P**  |
| **UI-02** | Desktop (1440px) e Mobile (390px) | [`hero-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/hero-desktop.png), [`hero-mobile.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/hero-mobile.png)                                                                                                                                                                                                                                                         | **Sobrecarga de CTAs concorrentes:** O Hero exibe 4 botões lado a lado com peso quase idêntico ("Ver projetos", "Fale comigo", "GitHub", "Baixar CV"), gerando grade 2x2 desajeitada no mobile e diluição da conversão.                            | Consistência / Carga Cognitiva        | **Alta**   | `src/components/portfolio/Hero.tsx` (linhas 73–86)                                               | Adotar hierarquia estrita: 1 CTA Primário ("Ver projetos"), 1 CTA Secundário ("Entrar em contato" ou "Baixar CV") e converter GitHub/LinkedIn em links de apoio com ícones discretos.       |  **P**  |
| **UI-03** | Mobile (390px)                    | [`mobile-menu-open.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/mobile-menu-open.png)                                                                                                                                                                                                                                                                                                                                                              | **Menu mobile flutuante desconexo:** Em telas móveis, o menu abre como um pequeno popover flutuante no topo direito que tapa parte do rosto do Gean, com botões de tema e idioma espremidos e alvos de toque reduzidos.                            | Navegação / Acessibilidade            | **Alta**   | `src/components/portfolio/Header.tsx` (linhas 238–285)                                           | Substituir o popover por um Drawer nativo (usando `vaul` já presente no `package.json`) ou Sheet full-width com alvos de toque confortáveis (mín. 48px), trap de foco e tipografia legível. |  **M**  |
| **UI-04** | Desktop e Mobile (Contato)        | [`contato-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/contato-desktop.png), [`form-validation-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/form-validation-desktop.png)                                                                                                                                                                                                                           | **Anti-pattern de envio via `mailto:`:** O formulário possui campos completos de Nome, E-mail e Mensagem, mas seu submit apenas dispara um link `mailto:`, falhando silenciosamente para usuários de webmail sem cliente configurado.              | Estados de Interface / UX             | **Alta**   | `src/components/portfolio/Contact.tsx` (linhas 24–34, 126–182)                                   | Integrar com endpoint real (Resend, Web3Forms, Formspree ou Cloudflare Worker) com estados de loading (spinner no botão), mensagem de sucesso inline e tratamento de erro de rede.          |  **M**  |
| **UI-05** | Desktop e Mobile (Contato)        | [`form-validation-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/form-validation-desktop.png), [`input-focus-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/input-focus-desktop.png)                                                                                                                                                                                                                   | **Validação nativa sem feedback visual acessível:** O formulário confia 100% no tooltip padrão do browser para validação de campos obrigatórios (`required`), sem estados de erro inline, sem borda de aviso nem atributos `aria-invalid`.         | Estados de Interface / Acessibilidade | **Média**  | `src/components/portfolio/Contact.tsx` (linhas 134–163)                                          | Implementar validação com `react-hook-form` e `zod` (já instalados), exibindo textos de erro inline abaixo de cada campo com `aria-live="polite"` e realce visual na borda.                 |  **M**  |
| **UI-06** | Desktop e Mobile (Geral)          | [`hero-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/hero-desktop.png), [`sobre-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/sobre-desktop.png), [`tecnologias-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/tecnologias-desktop.png), [`projetos-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/projetos-desktop.png) | **Repetição de Eyebrows estilo terminal:** Todas as seções iniciam com o padrão idêntico: ícone + barra `/` + texto mono verde (`/ sobre`, `/ stack`, `/ trabalhos`, `/ contato`), criando monotonia visual de template automático.                | Hierarquia / Estilo                   | **Média**  | `About.tsx` (l. 56), `Technologies.tsx` (l. 115), `Projects.tsx` (l. 125), `Contact.tsx` (l. 71) | Reduzir a frequência de eyebrows (regra de no máximo 1 a cada 3 seções) e diferenciar as seções por ritmo tipográfico, numeração de seção (`01`, `02`) ou badges funcionais.                |  **P**  |
| **UI-07** | Desktop e Mobile (Tecnologias)    | [`tecnologias-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/tecnologias-desktop.png), [`tecnologias-mobile.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/tecnologias-mobile.png)                                                                                                                                                                                                                             | **Falta de hierarquia de relevância nas tecnologias:** 24 tecnologias são dispostas com o mesmo tamanho e peso visual, misturando o core front-end (React, TS) com ferramentas periféricas (Flask, SQLite, Vinext).                                | Hierarquia / Informação               | **Média**  | `Technologies.tsx` (linhas 88–100), `portfolio.ts` (linhas 52–87)                                | Criar categoria "Core Stack" com maior destaque visual para as competências principais de Front-end e agrupar ferramentas complementares de apoio com menor densidade.                      |  **P**  |
| **UI-08** | Desktop (1440px)                  | [`projetos-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/projetos-desktop.png), [`home-full-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/home-full-desktop.png)                                                                                                                                                                                                                                     | **Grid uniforme 2x2 sem projeto em destaque:** Os 4 projetos dividem igualmente o espaço. Dois projetos são do mesmo ecossistema ("Pulso TV" e "API Pulso"), diluindo a sensação de variedade e impacto para recrutadores.                         | Hierarquia / Grid                     | **Média**  | `Projects.tsx` (linhas 178–189)                                                                  | Implementar layout Bento Grid ou destacar o projeto mais completo (Flagship Featured Card em largura total) com métricas de resultado, arquitetura e preview interativo ampliado.           |  **M**  |
| **UI-09** | Mobile (390px)                    | [`projetos-mobile.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/projetos-mobile.png), [`home-full-mobile.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/home-full-mobile.png)                                                                                                                                                                                                                                         | **Carrossel mobile sem indicadores de paginação:** A lista horizontal de projetos no smartphone não possui indicadores visuais de progresso (pontos/dots ou `1 de 4`), deixando o usuário sem noção de quantos itens existem.                      | Navegação / UX Mobile                 | **Média**  | `Projects.tsx` (linhas 132–179)                                                                  | Adicionar barra de paginação ou dots interativos que atualizam conforme o scroll snap, além de manter uma prévia visível (peek de 16px) do próximo card à direita.                          |  **P**  |
| **UI-10** | Desktop e Mobile (Tema Claro)     | [`light-theme-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/light-theme-desktop.png), [`light-theme-full-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/light-theme-full-desktop.png)                                                                                                                                                                                                                 | **Foto do Hero com moldura escura e sem fusão no Tema Claro:** A foto de perfil mantém fundo escuro e borda de alto contraste esverdeada, gerando um bloco pesado e desconectado sobre o fundo luminoso do site.                                   | Cores / Consistência                  | **Média**  | `Hero.tsx` (linhas 89–109)                                                                       | Tratar a foto com recorte de fundo suave ou aplicar máscara com gradiente de fusão e sombra suave adaptada a ambos os temas (light/dark).                                                   |  **P**  |
| **UI-11** | Tema Claro (Geral)                | [`light-theme-full-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/light-theme-full-desktop.png), [`light-theme-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/light-theme-desktop.png)                                                                                                                                                                                                                 | **Contraste no limite da WCAG AA em textos secundários claros:** `--muted-foreground: oklch(0.44 0.03 165)` em fontes de 12px (chips de tags, fatos secundários e rodapé) atinge proporção próxima de 4.3:1 sobre `--background`.                  | Cores e Contraste                     | **Média**  | `src/styles.css` (linhas 48–52)                                                                  | Escurecer `--muted-foreground` no tema claro para `oklch(0.38 0.03 165)` ou valor que garanta contraste estrito ≥ 4.8:1 conforme WCAG AA para textos menores que 18px.                      |  **P**  |
| **UI-12** | Código-fonte (Global)             | N/A (Código)                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **Dependências instaladas não utilizadas vs. componentes caseiros:** O `package.json` possui 25+ primitivas Radix e `vaul`, mas o `Header.tsx` e `Contact.tsx` usam lógica manual de `useState` e listeners globais com acessibilidade incompleta. | Arquitetura / Consistência            | **Média**  | `package.json`, `Header.tsx`, `components/ui/`                                                   | Aproveitar os componentes shadcn/Radix já instalados (Menu, Dialog, Select, Tooltip) para garantir navegação por teclado e leitor de tela sem reinventar a roda.                            |  **M**  |
| **UI-13** | Código-fonte (Global)             | N/A (Código)                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **Duplicação de dados e lógica de clipboard:** A rotina de cópia de e-mail com timer de 2s e Sonner toast está duplicada integralmente em `Contact.tsx` e `Footer.tsx`. As tecnologias estão repetidas em `portfolio.ts` e `LanguageProvider.tsx`. | Código / Manutenibilidade             | **Baixa**  | `Contact.tsx` (l. 43–62), `Footer.tsx` (l. 22–41), `portfolio.ts` vs. `LanguageProvider.tsx`     | Criar hook customizado `useCopyEmail()` ou componente reutilizável `<EmailCopyAction />`, e unificar a fonte única de verdade dos dados técnicos.                                           |  **P**  |
| **UI-14** | Rodapé (Desktop e Mobile)         | [`footer-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/footer-desktop.png), [`footer-mobile.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/footer-mobile.png)                                                                                                                                                                                                                                                 | **Ausência de atalho "Voltar ao topo" e botões sociais sem label visível:** Em página com scroll extenso, não há facilitador para retornar ao início. Os links de redes no rodapé são pequenos quadrados de 44px sem rótulo de texto.              | Navegação / Acessibilidade            | **Baixa**  | `src/components/portfolio/Footer.tsx` (linhas 55–95)                                             | Adicionar botão discreto "Voltar ao topo" com ícone de seta para cima e adicionar tooltips acessíveis nos botões de ícones sociais do rodapé.                                               |  **P**  |
| **UI-15** | Global                            | [`home-full-desktop.png`](file:///c:/Users/Gean/Downloads/Portfolio-Gean/ui-analysis/screenshots/home-full-desktop.png)                                                                                                                                                                                                                                                                                                                                                            | **Risco de conteúdo invisível em rolagem veloz ou impressão:** O hook `useReveal` inicia elementos com `opacity: 0`. Em impressões ou renders estáticos sem rolagem gradual, o IntersectionObserver pode não disparar.                             | Estados / Resiliência                 | **Baixa**  | `src/hooks/useReveal.ts` (linhas 24–34), `styles.css` (l. 174–177)                               | Adicionar regra `@media print { .reveal-target { opacity: 1 !important; transform: none !important; } }` e timeout de salvaguarda de 1.5s para revelar o DOM automaticamente.               |  **P**  |

---

## 3. Quick Wins (Baixo Esforço, Alto Impacto)

Melhorias que podem ser aplicadas em poucas linhas de código com grande retorno estético e de conversão:

1. **Reordenação e Limpeza da Primeira Dobra no Mobile (`Hero.tsx`)**:
   - Mudar `order-2` para `order-1` no bloco de texto no mobile, permitindo que quem entra no site pelo celular veja imediatamente "Gean Luca", "Desenvolvedor Front-end" e a proposta de valor, reduzindo a taxa de rejeição.
2. **Hierarquização dos CTAs do Hero (`Hero.tsx`)**:
   - Deixar apenas 2 botões de ação principais no Hero: `[ → Ver projetos ]` (primário em destaque) e `[ Baixar CV ]` (secundário). Transformar GitHub e Fale Comigo em links com ícones minimalistas na mesma linha ou no header.
3. **Correção de Contraste no Tema Claro (`styles.css`)**:
   - Ajustar a variável `--muted-foreground` de `oklch(0.44 0.03 165)` para `oklch(0.36 0.03 165)` no tema claro, garantindo 100% de conformidade com WCAG AA para todos os textos secundários.
4. **Adição de Indicadores de Scroll no Carrossel Mobile (`Projects.tsx`)**:
   - Inserir um conjunto simples de dots ou numeração `[ 1 / 4 ]` sincronizado com o evento `scroll` do carrossel mobile, orientando o recrutador sobre o conteúdo total.
5. **Deduplicação da Ação de Copiar E-mail**:
   - Extrair a função repetida de `Contact.tsx` e `Footer.tsx` para uma função auxiliar ou hook simples `useClipboardCopy`, mantendo a consistência do toast do Sonner.
6. **Remoção de Eyebrows Repetitivos**:
   - Eliminar os eyebrows em 2 das 4 seções (ex.: em "Sobre" e "Tecnologias"), deixando apenas o título direto para quebrar o efeito "gerado por template".

---

## 4. Melhorias Estruturais (Design Tokens, Componentes e Layout)

Mudanças arquiteturais para elevar o portfólio a um patamar sênior:

### A. Adoção de um Drawer Mobile Nativo com `vaul` / Radix Dialog

- **Problema atual**: O menu mobile flutua como uma caixa de diálogo no canto direito, com botões minúsculos de idioma e tema.
- **Solução proposta**: Implementar um Drawer de slide-up (ou menu full-width deslizante lateral) utilizando `vaul` (que já está instalado no projeto).
- **Ganhos**: Animação com física natural de arrasto para fechar (swipe down), alvos de toque de 56px de altura, foco preso acessível (focus-trap) e integração espaçosa dos controles de idioma e tema claro/escuro.

### B. Integração Real do Formulário de Contato com API Serverless

- **Problema atual**: O formulário é uma ilusão que depende de `mailto:`, frustrando qualquer visitante corporativo ou recrutador que não use clientes locais de e-mail.
- **Solução proposta**:
  1. Conectar o formulário a uma rota serverless da Cloudflare (já utilizada no deploy) ou serviço como Resend / Formspree.
  2. Implementar `react-hook-form` com validação de schema `zod`.
  3. Adicionar 3 estados explícitos de interface:
     - **Estado de envio (Loading)**: Botão com spinner animado e campos desabilitados.
     - **Estado de sucesso**: Card de agradecimento inline com botão de enviar outra mensagem.
     - **Estado de erro**: Mensagem descritiva com opção de copiar o e-mail diretamente como contingência.

### C. Redesenho da Apresentação de Projetos (Bento Grid com Flagship)

- **Problema atual**: 4 cards de mesmo tamanho em grade 2x2 parecem uma listagem simples sem narrativa.
- **Solução proposta**:
  - Transformar o projeto mais completo (ex.: _Sistema de Folgas_ ou _Pulso TV_) em um **Featured Flagship Project** ocupando largura total, com screenshot ampliada em moldura de navegador realista, lista de desafios superados, métricas técnicas e tags de arquitetura.
  - Exibir os demais projetos em cards de 2 colunas abaixo, criando hierarquia de relevância e ritmo visual variado.

### D. Limpeza e Consistência do Design System de Dependências

- **Problema atual**: O `package.json` possui 25+ pacotes Radix nunca importados, enquanto componentes essenciais foram codificados à mão sem garantias completas de WAI-ARIA.
- **Solução proposta**:
  - Ou adotar oficialmente os componentes correspondentes (`@radix-ui/react-dropdown-menu` para o seletor de idiomas, `@radix-ui/react-tooltip` para ícones do footer/hero);
  - Ou realizar uma faxina de dependências para manter o bundle e o repositório estritamente enxutos.

---

## 5. Plano de Execução Sugerido

Ordem de implementação recomendada para maximizar impacto e minimizar riscos:

### Fase 1: Ajustes Imediatos de Usabilidade e Mobile (1 a 2 dias)

1. **Passo 1.1**: Inverter a ordem do Hero no mobile (`order-1` no texto e `order-2` na foto) em `Hero.tsx`.
2. **Passo 1.2**: Racionalizar os botões do Hero: manter 1 primário, 1 secundário e links com ícones minimalistas.
3. **Passo 1.3**: Corrigir as variáveis de cor de contraste do tema claro em `styles.css`.
4. **Passo 1.4**: Variar/remover os eyebrows repetidos em `About.tsx` e `Technologies.tsx`.
5. **Passo 1.5**: Adicionar indicadores de dots/passos no carrossel de projetos mobile em `Projects.tsx`.

### Fase 2: Navegação e Componentes Acessíveis (2 a 3 dias)

1. **Passo 2.1**: Substituir o dropdown mobile por um Drawer acessível com `vaul` em `Header.tsx`.
2. **Passo 2.2**: Refatorar o seletor de idiomas para usar `@radix-ui/react-dropdown-menu`, eliminando listeners manuais de eventos no window.
3. **Passo 2.3**: Unificar a lógica de copiar e-mail entre `Contact.tsx` e `Footer.tsx` em um hook compartilhado.
4. **Passo 2.4**: Adicionar botão de "Voltar ao topo" e tooltips acessíveis no `Footer.tsx`.

### Fase 3: Comunicação e Formulário de Contato Real (2 a 3 dias)

1. **Passo 3.1**: Configurar endpoint de envio de e-mail (Resend ou Cloudflare Worker).
2. **Passo 3.2**: Refatorar `Contact.tsx` com `react-hook-form` e schema de validação `zod`.
3. **Passo 3.3**: Criar estados de carregamento (spinner), tela de sucesso e tratamento de erros inline.

### Fase 4: Polimento Visual e Bento Grid de Projetos (3 a 4 dias)

1. **Passo 4.1**: Reestruturar a seção `Projects.tsx` para layout Bento Grid com destaque ao projeto principal.
2. **Passo 4.2**: Refinar o tratamento visual da foto de perfil (máscara orgânica com transição suave nos dois temas).
3. **Passo 4.3**: Executar limpeza de pacotes não utilizados no `package.json` e validação com `npm run build`.

---

## 6. O Que Foi Analisado e O Que Ficou de Fora

- **O que foi analisado**:
  - Código-fonte completo de todos os componentes da aplicação (`Header`, `Hero`, `About`, `Technologies`, `Projects`, `Contact`, `Footer`).
  - Configurações de tema (`ThemeProvider.tsx`), internacionalização (`LanguageProvider.tsx`), dados (`portfolio.ts`), rotas (`index.tsx`, `__root.tsx`) e estilos (`styles.css`).
  - Capturas de tela reais executadas via navegador Chrome Headless em 3 larguras (Desktop 1440px, Tablet 768px e Mobile 390px).
  - Primeira dobra em todas as larguras, menu mobile expandido, alternância completa entre temas escuro e claro, e validação de formulário.
  - Conformidade de contraste WCAG AA, alvos de toque, estados de foco e heurísticas modernas de UX para portfólios de tecnologia.

- **O que ficou de fora desta etapa**:
  - Alterações diretas no código-fonte dos componentes da aplicação (conforme expressamente instruído pelo usuário).
  - Testes em dispositivos físicos específicos com telas dobráveis ou navegadores legados (Safari iOS antigo / Firefox mobile).
  - Métricas de Core Web Vitals em ambiente de produção sob CDN Cloudflare (avaliado em servidor de desenvolvimento local).

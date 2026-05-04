# FORGEE — Design System

> Sistema de design completo para a plataforma FORGEE
> Versão: 1.0 · 2026

---

## 1. Conceito e Identidade

### Visão Geral
Sistema construído em torno da ideia de **transformação através da disciplina** — cru, poderoso e direto. A linguagem visual combina cultura de alta performance com sensibilidade editorial cinematográfica. Cada elemento comunica tensão, movimento e poder conquistado.

**Palavras-chave:** `dark-cinematic` · `gold-kinetic` · `high-contrast` · `editorial-bold` · `transformation` · `premium-athletic`

### Princípio Central
> **"Gold is not given. It is forged."**

O ouro aqui não é ornamental — é a marca do que foi forjado. Quando em dúvida, reduza. Quando poder é necessário, ative através de cor, escala e contraste. Nunca através de complexidade.

---

## 2. Sistema de Cores

### Paleta Base

#### Neutral Scale (Escala de Cinzas)
```css
--neutral-950: #0A0A0A  /* Fundo mais profundo */
--neutral-900: #111111  /* Fundo primário, base da página */
--neutral-800: #1A1A1A  /* Cards, superfícies elevadas */
--neutral-700: #2A2A2A  /* Bordas, divisores, containers sutis */
--neutral-600: #3D3D3D  /* Estados desabilitados, elementos inativos */
--neutral-400: #6B6B6B  /* Texto desenfatizado, metadados */
--neutral-200: #C2C2C2  /* Texto secundário, legendas */
--neutral-100: #E0E0E0  /* Texto em superfícies escuras */
--neutral-50:  #F5F5F5  /* Branco adjacente, texto de máximo contraste */
```

#### Gold Variants (Variações de Dourado)
```css
--gold-core:   #FFD700  /* Dourado primário — ponto de ignição da marca */
--gold-bright: #FFE340  /* Variante brilhante, momentos de alta energia */
--gold-deep:   #D4A800  /* Variante escura, hovers e overlays cinematográficos */
--gold-muted:  #B8960A  /* Tom suavizado para bordas e acentos sutis */
--gold-glow:   rgba(255, 215, 0, 0.12)  /* Brilho ambiente em baixa opacidade */
```

#### Cores de Suporte
```css
--steel-muted: #5A7080  /* Contraponto frio — usado para contraste, nunca dominante */
--success:     #3DAA6E  /* Confirmações positivas — usar com moderação */
--error:       #D93025  /* Feedback do sistema apenas */
--absolute-white: #FFFFFF  /* Texto knockout puro, lockup de logo */
--absolute-black: #000000  /* Pontos de âncora mais escuros, texto em botões dourados */
```

### Cores Semânticas

| Função | Token | Hex | Uso |
|--------|-------|-----|-----|
| **Primary** | `gold-core` | `#FFD700` | Cor ativadora dominante — botões, destaques, texto-chave |
| **Primary Hover** | `gold-deep` | `#D4A800` | Estados pressionados e hover em elementos primários |
| **Secondary** | `neutral-800` | `#1A1A1A` | Fundos de cards, superfícies secundárias |
| **Accent** | `gold-bright` | `#FFE340` | Destaques interativos, anéis de foco |
| **Text Primary** | `absolute-white` | `#FFFFFF` | Todos os títulos principais e corpo em fundos escuros |
| **Text Muted** | `neutral-200` | `#C2C2C2` | Texto de suporte, metadados, legendas |
| **Background Base** | `neutral-900` | `#111111` | Fundo padrão da página |
| **Surface Elevated** | `neutral-800` | `#1A1A1A` | Cards, painéis, gavetas |
| **Border Subtle** | `neutral-700` | `#2A2A2A` | Linhas estruturais |
| **Border Accent** | `gold-muted` | `#B8960A` | Containers destacados e estados ativos |

### Lógica de Cor

- **Superfícies escuras são sempre dominantes.** Dourado é usado como sinal — concentrado, proposital, nunca decorativo.
- `gold-core` (#FFD700) marca o que importa. É diretivo, não estético.
- Texto branco é a superfície primária de leitura em todos os fundos escuros.
- Brilhos usam `gold-glow` (#FFD70020) a 8–20% de opacidade para criar profundidade cinematográfica sem ruído visual.
- Dourado carrega uma conotação premium inerente e de alto risco — lê-se como conquistado, não dado.

---

## 3. Tipografia

### Fontes

```css
/* Importação */
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

**Oswald** — Display e títulos (condensado, impacto)  
**Inter** — Corpo, UI e interface (humanista sans, legibilidade)

### Hierarquia Tipográfica

| Nível | Estilo | Peso | Tamanho | Case | Tracking |
|-------|--------|------|---------|------|----------|
| **Display / Hero** | Oswald Condensed | Black / 900 | 64px – 120px+ | UPPERCASE | -0.02em a 0 |
| **H1** | Oswald | Bold / 700–800 | 40px – 64px | UPPERCASE | -0.01em |
| **H2** | Oswald | Bold / 700 | 28px – 40px | Mixed / Upper | 0 |
| **H3 / Label** | Inter | SemiBold / 600 | 12px – 16px | UPPERCASE | 0.08em – 0.15em |
| **Body** | Inter | Regular / 400 | 14px – 16px | Sentence | 0.01em |
| **Caption / Micro** | Inter | Regular / 400 | 10px – 12px | UPPERCASE | 0.1em |

### Distribuição de Peso

- **80% do peso tipográfico é Heavy ou Black** — este sistema lidera com força.
- Corpo de texto é o único elemento de peso regular, sempre subordinado.
- **Itálico não faz parte deste sistema.** Ênfase é alcançada através de `gold-core` e mudança de peso, não de ângulo.

### Padrão de Contraste de Palavra-Chave

Um motivo recorrente: **uma palavra ou frase em `gold-core`** dentro de um título branco. Isso cria um ponto quente composicional que guia a atenção sem decoração.

```
SEM MÁGICA
SEM ATALHOS
SEM [DESCULPAS]  ← gold-core (#FFD700)
```

### Tendências de Espaçamento

- **Display type:** leading apertado (1.0–1.1), zero ou letter-spacing negativo
- **Corpo de texto:** leading balanceado (1.5–1.65), tracking levemente aberto
- **Texto de label:** tracking amplo (0.08–0.15em) para compensar tamanho pequeno

---

## 4. Espaçamento e Layout

### Escala de Espaçamento (base 8pt)

```css
--space-1: 4px    /* Gaps micro, padding de ícones */
--space-2: 8px    /* Espaçamento inline, internos de componentes apertados */
--space-3: 16px   /* Padding padrão de componentes */
--space-4: 24px   /* Internos de seção, padding de cards */
--space-5: 32px   /* Separação de componentes */
--space-6: 48px   /* Gaps de seção, quebras rítmicas principais */
--space-7: 64px   /* Gaps grandes de layout */
--space-8: 96px   /* Espaço de respiração de hero, headers de seção */
--space-9: 128px+ /* Separadores de seção full-bleed */
```

### Densidade de Layout

**Balanceado a Espaçoso.** Conteúdo nunca é apertado — espaço de respiração é intencional. Seções alternam entre zonas cinematográficas full-bleed e painéis informativos contidos.

### Sistema de Grid

- **Desktop:** 12 colunas, gutters 24px, margens horizontais 80–120px
- **Tablet:** 8 colunas, gutters 20px
- **Mobile:** 4 colunas, gutters 16px
- **Base de alinhamento:** grid 8pt — todo dimensionamento e espaçamento divisível por 8

### Lógica de Layout

- **Seções hero** são full-viewport, dominadas por imagem, com texto em camadas sobre overlays escuros
- **Seções de informação** usam divisões assimétricas (40/60 ou 50/50)
- **Alinhamento à esquerda domina.** Centro é reservado apenas para momentos hero e pull quotes
- **Mobile-first:** sempre priorizar experiência mobile, expandir para desktop

---

## 5. Formas e Linguagem de UI

### Border Radius

| Contexto | Radius |
|----------|--------|
| Botões (primários) | 0px – 4px (sharp a quase-sharp) |
| Cards / Painéis | 8px – 12px |
| Containers de imagem | 8px – 16px |
| Pills / Tags | 999px — usar com moderação |
| Ícones / Badges | 4px ou circular |

**Princípio:** O sistema tende ao afiado. Elementos arredondados são a exceção. Elementos hero e estruturais permanecem com bordas duras.

### Uso de Bordas

- Bordas são raras e sempre sutis (`neutral-700`, 1px)
- Botões preenchidos são preferidos sobre variantes delineadas
- Botões ghost/outline usam stroke de `gold-core` 1px com preenchimento transparente — CTAs secundários apenas
- Divisores de acento usam `gold-core` ou `gold-muted` a 1–2px

### Estilo de Componentes

- **Flat com elevação seletiva** — profundidade através de contraste de cor, não sombras
- **Linhas de accordion:** largura total, separadas por mudança sutil de fundo, indicadores de seta
- **Navegação:** minimal, horizontal — estados ativos usam `gold-core`, não sublinhados
- **CTAs primários:** retangular, preenchimento `gold-core` + texto `#000000` (preto), largura total em mobile

> **Crítico:** Como `gold-core` (#FFD700) é uma cor clara, todos os labels de botões em fundos dourados devem usar `#000000` (preto) para atender aos requisitos de contraste WCAG AA.

---

## 6. Detalhes Visuais

### Sombras

- **Sem box shadows genéricas** em cards ou botões de UI
- **Brilho ambiente:** gradiente radial de `gold-glow` (#FFD70020) a 10–20% de opacidade, posicionado direcionalmente
- **Faixas de luz:** linhas de movimento diagonais ou radiais em `gold-core` a 20–40% de opacidade — para fundos de campanha e hero apenas
- **Brilho de texto:** drop-shadow `gold-core` com offset 0, blur 12–20px — reservado apenas para momentos display/hero

### Bordas

- **Bordas estruturais:** invisíveis por padrão
- **Quando visíveis:** `neutral-700`, 1px — apenas quando contraste com fundo é insuficiente
- **Bordas de acento:** `gold-core` ou `gold-muted`, 2–3px — tratamento de borda esquerda em blocos destacados e itens ativos

### Decorações

| Elemento | Estilo |
|----------|--------|
| **Textura de fundo** | Grid de pontos halftone a 4–8% de opacidade em `gold-core` em campos escuros |
| **Light sweep / raios** | Faixas radiais ou diagonais em `gold-glow` — zonas hero e campanha |
| **Overlay de ruído** | Grão de filme (filtro SVG ou CSS) a 3–6% de opacidade em fundos escuros |
| **Linhas de movimento** | Faixas de desfoque de velocidade em `gold-core` a 20–40% — uso editorial apenas, não UI |
| **Ghost type** | Texto superdimensionado a 4–8% de opacidade como camada de textura de fundo atrás de fotografia |
| **Dot matrix** | Padrão de pontos pixel em `gold-core` em baixa opacidade — identificador do sistema, referência tech |

**Princípio:** Decoração amplifica energia. Ela nunca preenche espaço. Todo tratamento de fundo responde ao humano em quadro.

---

## 7. Contraste e Acessibilidade

### Nível de Contraste

**Alto contraste por padrão.** Branco (#FFFFFF) em escuro (#111111) excede WCAG AA a ~18:1.

### Abordagem de Legibilidade

| Pareamento | Ratio de Contraste | Padrão |
|------------|-------------------|--------|
| `#FFFFFF` em `#111111` | ~18:1 | AAA ✓ |
| `#000000` em `#FFD700` | ~13.4:1 | AAA ✓ |
| `gold-core` (#FFD700) em `#111111` | ~11.2:1 | AAA ✓ (texto grande) |
| `neutral-200` (#C2C2C2) em `#111111` | ~8:1 | AA ✓ |

- **Corpo de texto:** sempre branco ou quase-branco em escuro — nunca dourado para texto de leitura
- `gold-core` é usado para títulos, palavras de acento e ativação de UI apenas
- Nunca use dourado como fundo para texto de comprimento de corpo

### Cor como Hierarquia

- **Branco** — informação primária, importância máxima
- **`gold-core`** — ponto de ativação, a palavra ou elemento que muda tudo
- **`neutral-200`** — suporte, contextual, subordinado
- **`neutral-400`** — desenfatizado, apenas metadados

### Considerações Inclusivas

- Nunca confie apenas em cor para transmitir significado — use indicadores de seta, posição e tamanho para reforçar estados
- **Target touch mínimo:** 44×44px
- **Estados de foco:** outline `gold-core`, 2px, em todos os elementos interativos

---

## 8. Componentes-Chave

### Botões

#### Primário
```css
background: #FFD700
color: #000000
padding: 12px 48px
font: Inter SemiBold
text-transform: uppercase
letter-spacing: 0.05em
border-radius: 0-4px
hover: background #D4A800
```

#### Secundário (Texto apenas)
```css
background: transparent
color: #FFD700
padding: 12px 48px
font: Inter SemiBold
text-transform: uppercase
letter-spacing: 0.05em
hover: color #FFE340
```

### Header / Navegação

```css
position: fixed
top: 0
z-index: 50
transition: all 500ms

/* No topo da página */
background: transparent

/* Após scroll > 100px */
background: rgba(17, 17, 17, 0.9)
backdrop-filter: blur(16px)
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3)
```

### Cards

```css
background: #1A1A1A
border: 1px solid #2A2A2A
border-radius: 8px-12px
padding: 32px
hover: border-color #FFD700
transition: all 300ms
```

### Accordions

```css
width: 100%
border-bottom: 1px solid #2A2A2A
padding: 24px 0

button:
  display: flex
  justify-content: space-between
  color: #FFD700
  font: Oswald Bold
  
icon:
  rotate: 0deg (fechado) | 180deg (aberto)
  transition: 300ms
```

---

## 9. Animações

### Princípios

- **Sutis e intencionais** — animações servem ao conteúdo, não distraem
- **Duração padrão:** 300ms–600ms
- **Easing:** ease-out para entradas, ease-in-out para transições
- **Stagger:** 0.1s entre elementos em listas

### Animações-Chave

```javascript
// Fade In Up
fadeInUp: {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

// Stagger Container
staggerContainer: {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}
```

### Interações

- **Hover em botões:** mudança de cor suave (300ms)
- **Scroll reveal:** fade in up com stagger
- **Accordions:** height auto com opacity (300ms)
- **Header scroll:** background e blur transition (500ms)

---

## 10. Imagens e Mídia

### Tratamento de Imagens

```css
/* Imagens hero e principais */
object-fit: cover
object-position: 70%-80% center /* Ajustar conforme composição */

/* Overlay padrão para legibilidade */
background: linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.7), rgba(0,0,0,0.6))
background: linear-gradient(to top, rgba(0,0,0,0.8), transparent)
```

### Efeito Grayscale

```css
filter: grayscale(100%)
mix-blend-mode: saturation (com overlay branco)
```

### Aspect Ratios Comuns

- **Hero:** 16:9 ou viewport height
- **Cards de equipe/depoimentos:** 1:1 (quadrado)
- **Imagens de galeria:** 3:4 (retrato)
- **Equipamentos:** 4:3 (paisagem)

---

## 11. Responsividade

### Breakpoints

```css
/* Mobile First */
mobile: < 768px
tablet: 768px - 1024px
desktop: > 1024px
large: > 1440px
```

### Abordagem

- **Mobile-first sempre**
- Conteúdo empilhado verticalmente em mobile
- Grids expandem de 1 coluna → 2 colunas → 3-4 colunas
- Padding reduzido em mobile (16px vs 32px+ desktop)
- Tamanhos de fonte escalados (4xl mobile → 6xl tablet → 8xl desktop)

### Otimizações Mobile

- Full-width buttons em mobile
- Navegação simplificada (hamburger menu se necessário)
- Touch targets mínimo 44x44px
- Espaçamento generoso entre elementos interativos

---

## 12. Boas Práticas

### Deve Fazer ✓

- Usar `gold-core` com propósito — marca o que importa
- Manter alto contraste em todo texto
- Respeitar a escala de espaçamento 8pt
- Priorizar mobile-first
- Usar Oswald para impacto, Inter para legibilidade
- Testar acessibilidade (contraste, keyboard navigation)
- Manter animações sutis e performáticas

### Não Fazer ✗

- Usar dourado como decoração
- Criar fundos dourados para texto longo
- Adicionar bordas desnecessárias
- Usar mais de 2 níveis de hierarquia tipográfica por seção
- Centralizar texto fora de momentos hero
- Usar itálico para ênfase
- Adicionar sombras genéricas de box-shadow
- Ignorar estados de hover/focus
- Quebrar a escala de espaçamento

---

## 13. Checklist de Consistência

Antes de implementar novos componentes ou seções:

- [ ] Cores vêm da paleta definida?
- [ ] Tipografia usa Oswald (display) ou Inter (UI/corpo)?
- [ ] Espaçamento segue escala 8pt?
- [ ] Contraste de texto atende WCAG AA (mínimo)?
- [ ] Botões primários usam dourado + texto preto?
- [ ] Animações são sutis e intencionais?
- [ ] Design funciona em mobile?
- [ ] Estados interativos (hover, focus) estão definidos?
- [ ] Imagens têm overlays para legibilidade?

---

## 14. Recursos e Referências

### Arquivos-Chave

- `/src/styles/theme.css` — Tokens CSS e variáveis
- `/src/styles/fonts.css` — Importações de fontes
- `/src/app/App.tsx` — Implementação de componentes
- `DESIGN-SYSTEM.md` — Este documento

### Ferramentas Recomendadas

- **Contrast Checker:** [WebAIM](https://webaim.org/resources/contrastchecker/)
- **Fontes:** [Google Fonts](https://fonts.google.com)
- **Animações:** Motion/React (Framer Motion)
- **Ícones:** Lucide React (se necessário)

---

## Notas Finais

Este sistema não decora — ele **energiza**. A paleta é elementar: ouro fundido contra escuridão profunda. A tipografia é física e direta. O espaço é conquistado. Dourado aqui não é ornamental — é a marca do que foi forjado.

Quando em dúvida, reduza. Quando poder é necessário, ative através de cor, escala e contraste. Nunca através de complexidade.

---

**FORGEE DESIGN SYSTEM © 2026**  
*Beyond Limits Known™*

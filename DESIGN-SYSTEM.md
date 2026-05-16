# FORGEE — Design System

Documento de referência para **consistência visual** em todo o projeto: site público, dashboard e novos módulos.  
Sempre consulte este arquivo antes de criar telas, componentes ou estilos.

**Fonte da verdade no código:** `src/styles/theme.css`, `src/styles/fonts.css`, `src/lib/animations/`.

---

## 1. Identidade

| Item | Valor |
|------|--------|
| **Marca** | FORGEE — academia premium, tom direto e intenso |
| **Tagline** | Além dos limites conhecidos™ |
| **Mood** | Escuro, atlético, preciso; ouro como energia e destaque (não decoração excessiva) |
| **Idioma da UI** | Português (BR), textos de interface em caixa alta quando forem rótulos curtos ou CTAs |

---

## 2. Cores

### 2.1 Tokens semânticos (preferir no código)

Use classes Tailwind ligadas ao tema (`theme.css`). **Não invente hex novos** se existir token equivalente.

| Token | CSS variable | Uso |
|-------|----------------|-----|
| `background` | `--background` | Fundo principal (`#111111`) |
| `foreground` | `--foreground` | Texto principal |
| `primary` | `--primary` | Ouro FORGEE — CTAs, destaques, ícones ativos |
| `primary-foreground` | `--primary-foreground` | Texto sobre ouro (preto) |
| `card` | `--card` | Cards, blocos elevados (`#1a1a1a`) |
| `muted` | `--muted` | Fundos suaves, bordas internas |
| `muted-foreground` | `--muted-foreground` | Texto secundário legível |
| `border` | `--border` | Bordas padrão (`#2a2a2a`) |
| `destructive` | `--destructive` | Erros, exclusão |
| `ring` | `--ring` | Focus visível (ouro) |

**Exemplos Tailwind:** `bg-background`, `text-foreground`, `bg-primary`, `text-primary`, `border-border`, `text-muted-foreground`.

### 2.2 Escala de ouro

| Nome | Hex | Variable | Uso |
|------|-----|----------|-----|
| Gold core | `#ffd700` | `--gold-core` | Destaque principal, igual a `primary` |
| Gold bright | `#ffe340` | `--gold-bright` | Hover em links dourados |
| Gold deep | `#d4a800` | `--gold-deep` | Hover em botões sólidos |
| Gold muted | `#b8960a` | `--gold-muted` | Estados desabilitados / secundário |
| Gold glow | `rgba(255,215,0,0.12)` | `--gold-glow` | Overlays, gradientes sutis |

### 2.3 Neutros

| Nome | Hex | Variable | Uso |
|------|-----|----------|-----|
| 950 | `#0a0a0a` | `--neutral-950` | Seções alternadas, fundo mais profundo |
| 900 | `#111111` | `--neutral-900` | Fundo base do site |
| 800 | `#1a1a1a` | `--neutral-800` | Cards, inputs |
| 700 | `#2a2a2a` | `--neutral-700` | Bordas, divisores |
| 600 | `#3d3d3d` | `--neutral-600` | Bordas hover discretas |
| 400 | `#6b6b6b` | `--neutral-400` | Legendas, metadados, footer |
| 200 | `#c2c2c2` | `--neutral-200` | Texto de apoio no marketing |
| 100 | `#e0e0e0` | `--neutral-100` | Texto claro secundário |
| 50 | `#f5f5f5` | `--neutral-50` | Raramente no dark mode |

### 2.4 Hex legados no site (migrar gradualmente)

O marketing ainda usa hex diretos. **Novos trechos devem usar tokens.** Equivalências:

| Hex no site | Preferir |
|-------------|----------|
| `#111111` | `bg-background` ou `neutral-900` |
| `#0a0a0a` | `bg-[var(--neutral-950)]` ou seção `bg-[#0a0a0a]` → token 950 |
| `#1a1a1a` / `#2a2a2a` | `card` / `border` |
| `#ffd700` | `text-primary` / `bg-primary` |
| `#ffffff` / `text-white` | `text-foreground` |
| `#c2c2c2` | `text-muted-foreground` ou `neutral-200` |
| `#6b6b6b` | `text-[var(--neutral-400)]` |
| `#b0b0b0` | Corpo secundário — alinhar a `muted-foreground` |

### 2.5 Regras de contraste

- Texto principal: branco (`foreground`) sobre fundos 900–950.
- Ouro em títulos: sempre com peso bold (Oswald).
- Botão primário: fundo `primary` + texto `primary-foreground` (preto).
- Não usar ouro em parágrafos longos (cansa a leitura).

---

## 3. Tipografia

### 3.1 Famílias

| Família | Papel | Classes |
|---------|--------|---------|
| **Oswald** | Display — títulos, números de impacto, navegação de marca | `font-['Oswald']` |
| **Inter** | UI — corpo, labels, botões, formulários | `font-['Inter']` |

Carregamento: `src/styles/fonts.css` (Google Fonts: Oswald 400–900, Inter 400–700).

### 3.2 Hierarquia — marketing (site)

| Elemento | Estilo | Exemplo de classes |
|----------|--------|-------------------|
| **Hero H1** | Oswald bold, uppercase, tracking apertado | `font-['Oswald'] font-bold uppercase tracking-[-0.03em] leading-[0.95]` |
| **Linha de destaque (ouro)** | Mesmo H1, cor primary | `text-primary` ou `text-[#ffd700]` |
| **H2 de seção** | Oswald bold, uppercase, escala responsiva | `text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase` |
| **Palavra-chave no H2** | Linha em ouro | segunda `motion.div` / `span` com `text-primary` |
| **Rótulo de seção** | Inter medium, xs, tracking largo, ouro | `text-primary text-xs tracking-[1.44px] uppercase font-['Inter'] font-medium` |
| **Linha decorativa** | Barra antes do rótulo | `h-px w-8 bg-primary` + flex `gap-4` |
| **Corpo** | Inter, sm–base, neutro claro | `font-['Inter'] text-sm md:text-base text-muted-foreground` |
| **Corpo ênfase** | Inter italic ouro (uso pontual) | `font-['Inter'] italic text-primary` |
| **Lista / passo (01 ·)** | Oswald bold, ouro | `font-['Oswald'] font-bold uppercase text-primary` |
| **Footer / legal** | Inter xs, neutral-400 | `text-xs text-[var(--neutral-400)]` |

### 3.3 Hierarquia — dashboard

| Elemento | Estilo |
|----------|--------|
| Título de página | `font-['Oswald'] text-3xl md:text-4xl font-bold uppercase` |
| Subtítulo / descrição | `text-sm text-muted-foreground` |
| Rótulo de contexto | `text-xs uppercase tracking-wider text-primary` |
| Métricas (KPI) | Oswald `text-3xl font-bold` em cards |
| Labels de card | `text-xs uppercase tracking-wide text-muted-foreground` |

### 3.4 Base HTML

`theme.css` define `html { font-size: 16px }`. Pesos padrão: medium 600, normal 400.

---

## 4. Espaçamento e layout

### 4.1 Seções (marketing)

| Padrão | Valor |
|--------|--------|
| Padding horizontal | `px-4 md:px-8 lg:px-16` |
| Padding vertical de seção | `py-16 md:py-24` |
| Largura máxima conteúdo | `max-w-7xl mx-auto` (padrão) · `max-w-4xl` (FAQ, CTA estreito) |
| Grid 2 colunas | `grid grid-cols-1 lg:grid-cols-2 gap-12` |

### 4.2 Dashboard

| Padrão | Valor |
|--------|--------|
| Área principal | `p-4 md:p-6` dentro de `SidebarInset` |
| Cards em grid | `gap-4 sm:grid-cols-2 xl:grid-cols-4` |
| Sidebar | tokens `--sidebar-*` em `theme.css` |

### 4.3 Raio de borda

| Token | Valor |
|-------|--------|
| `--radius` | `0.5rem` (8px) |
| `rounded-lg` | cards, mapas, blocos médios |
| `rounded-md` | botões shadcn padrão |
| `rounded-xl` | destaques pontuais |

---

## 5. Componentes

### 5.1 Botões

**Primário (CTA)** — marketing:

```html
<button class="bg-primary text-primary-foreground px-8 py-3 font-['Inter'] font-semibold uppercase tracking-wide hover:bg-[#d4a800] transition-all">
```

Preferir componente: `<Button>` de `@/app/components/ui/button` com `variant="default"`.

**Secundário / ghost** — texto ouro, sem fundo:

```html
<button class="text-primary px-8 py-3 font-['Inter'] font-semibold uppercase tracking-wide hover:text-[#ffe340] transition-all">
```

**Links de navegação:** `text-[#c2c2c2] hover:text-primary transition-colors uppercase text-xs`.

**Regras:** CTAs sempre `uppercase`; `cursor-pointer` em elementos clicáveis; hover com transição `transition-all` ou `transition-colors` (150–300ms).

### 5.2 Cards

```html
<div class="bg-card border border-border rounded-lg ...">
```

Marketing: `bg-[#0a0a0a]` + `border-[#2a2a2a]` → migrar para `bg-card` / `border-border`.  
Hover em cards interativos: `hover:border-primary/40` (dashboard).

### 5.3 Rótulo de seção (padrão obrigatório)

```html
<div class="flex items-center gap-4 mb-8">
  <motion.div class="h-px w-8 bg-primary" />
  <span class="text-primary text-xs tracking-[1.44px] uppercase font-['Inter'] font-medium">
    Nome da seção
  </span>
</div>
```

### 5.4 Accordion / FAQ

- Botão pergunta: `w-full py-6 flex justify-between hover:bg-background transition-colors text-left cursor-pointer`
- Título pergunta: Oswald bold `text-xl md:text-2xl uppercase text-white`
- Ícone chevron: stroke `#FFD700` (primary)
- Resposta: Inter `text-muted-foreground leading-relaxed`

### 5.5 Imagens

- Fotos de treino: frequentemente `grayscale` com hover `grayscale-0` em grupos.
- Overlays: gradientes escuros + toque `primary/10–20` — não competir com o texto.
- Hero: classe `.hero-section` + gradiente em `theme.css` (`::after`).

### 5.6 Formulários (dashboard)

Usar componentes em `src/app/components/ui/` (`Input`, `Label`, `Select`, etc.) com tokens `input`, `ring`, `border`.

---

## 6. Motion e animação

Biblioteca: **Motion** (`motion/react`). Presets em `src/lib/animations/variants.ts`.

### 6.1 Quando usar

| Situação | Preset / componente |
|----------|---------------------|
| Bloco ao entrar na viewport | `fadeInUp` + `AnimatedSection` ou `whileInView` |
| Lista de itens | `staggerContainer` + `staggerItem` ou `StaggerList` |
| Troca de rota (dashboard) | `PageTransition` + `pageVariants` |
| Fade simples | `fadeIn` / `FadeIn` |
| Entrada lateral | `slideInLeft` / `slideInRight` |

### 6.2 Parâmetros padrão

| Parâmetro | Valor |
|-----------|--------|
| Viewport | `once: true`, `amount: 0.2`, `margin: "0px 0px -48px 0px"` |
| Transição suave | `duration: 0.55`, ease `[0.22, 1, 0.36, 1]` |
| Transição de página | `duration: 0.35`, mesmo ease |
| Spring (uso pontual) | `stiffness: 280`, `damping: 26` |

### 6.3 Regras

- Preferir **opacity + translate** leve; evitar animações longas (>0.7s).
- Não animar `opacity: 0` em conteúdo crítico sem fallback visível (mapas, formulários).
- Respeitar `prefers-reduced-motion` em novos componentes (a implementar globalmente quando necessário).
- Importar variants de `@/lib/animations`, não duplicar objetos de animação.

---

## 7. Ícones

- Biblioteca: **Lucide React** (`lucide-react`).
- Tamanho padrão em UI: `size-4` (16px); em cards KPI: `size-4 text-primary`.
- Cor: `text-primary` para ícones de destaque; `text-muted-foreground` para neutros.

---

## 8. Gráficos (dashboard)

Tokens em `theme.css`: `--chart-1` … `--chart-5` (família ouro + neutro azulado).  
Usar componente `Chart` em `@/app/components/ui/chart` para manter cores alinhadas.

---

## 9. Estrutura do projeto

```
src/
├── styles/theme.css      # tokens e tema Tailwind
├── styles/fonts.css      # Oswald + Inter
├── lib/animations/       # variants Motion
├── components/motion/    # AnimatedSection, PageTransition, …
├── app/components/ui/    # shadcn/Radix (Button, Card, Sidebar, …)
├── pages/site/           # marketing
├── pages/dashboard/      # painel administrativo
└── layouts/              # DashboardLayout, etc.
```

Rotas: `src/config/routes.ts`.

---

## 10. Checklist para novas telas

- [ ] Fundo `background` ou `neutral-950` em seções alternadas
- [ ] Títulos em **Oswald** uppercase; corpo em **Inter**
- [ ] Destaques em `primary` (ouro), não em amarelo aleatório
- [ ] Bordas `border-border` (`#2a2a2a`)
- [ ] Rótulo de seção com barra + tracking `1.44px` (marketing)
- [ ] Botões e links com hover definido e `cursor-pointer`
- [ ] Animações via `@/lib/animations` ou `@/components/motion`
- [ ] Componentes UI reutilizados de `@/app/components/ui/`
- [ ] Dashboard e site compartilham os mesmos tokens (`theme.css`)

---

## 11. O que evitar

- Cores fora da paleta (azuis, verdes) sem aprovação explícita
- Fontes diferentes de Oswald/Inter
- Títulos em sentence case no marketing (usar **UPPERCASE** em headlines)
- Bordas claras (#fff) em fundo escuro
- Sombras pesadas estilo “material claro”
- Copiar hex do Figma sem mapear para token
- `motion.div` com `opacity: 0` inicial em conteúdo essencial sem `whileInView` confiável
- Remover scrollbar global sem alternativa de acessibilidade em novas áreas scrolláveis internas

---

## 12. Atualização deste documento

Ao alterar `theme.css`, padrões de tipo ou animações, **atualize este arquivo na mesma PR/commit**.  
Este design system é a referência para humanos e para assistentes de código no repositório.

**Versão:** 1.0 · **Projeto:** projetoworkshop / FORGEE · **Stack:** React, Vite, Tailwind CSS v4, Motion.

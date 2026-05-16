# 🗄️ Schema do Banco de Dados — FORGEE Academy

> **Revisão:** Schema validado e corrigido contra todas as telas do frontend (Figma Make).
> Cada campo, tabela e enum foi cruzado com os componentes React correspondentes.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Correções Aplicadas](#correções-aplicadas)
3. [Modelos e Mapeamento com o Frontend](#modelos-e-mapeamento-com-o-frontend)
4. [Relacionamentos](#relacionamentos)
5. [Enums](#enums)
6. [Configuração Supabase](#configuração-supabase)

---

## Visão Geral

O banco de dados cobre **7 módulos principais**:

| Módulo | Tabelas | Telas Frontend |
|---|---|---|
| Alunos & Cadastro | `alunos`, `dados_saude`, `parq`, `objetivos`, `dados_fisicos`, `termos_responsabilidade` | `NovoAluno.tsx`, `Alunos.tsx` |
| Planos & Pagamentos | `planos`, `planos_alunos`, `pagamentos` | `Configuracoes.tsx` (TabPlanos), `NovoAluno.tsx`, `Alunos.tsx` |
| Check-ins | `checkins` | `CheckIns.tsx`, `ModoRecepcao.tsx` |
| Administração | `usuarios` | `Configuracoes.tsx` (TabPerfil), `LoginAdmin.tsx` |
| Configurações | `configuracoes_academia` | `Configuracoes.tsx` (TabGeral + TabSistema) |
| Notificações | `notificacoes` | Sistema geral |
| Auditoria | `logs_auditoria` | Sistema geral |

---

## Correções Aplicadas

As seguintes divergências foram encontradas e corrigidas no `schema.prisma`:

### 1. `Plano` — Campo `destaque` ausente
- **Tela:** `Configuracoes.tsx` → TabPlanos → `PlanCard` (toggle "Destacar") e `CriarPlanoModal` (checkbox)
- **Problema:** O frontend usa `plan.featured` / `destaque` para marcar planos em destaque com borda laranja e badge. O campo não existia no schema.
- **Correção:** Adicionado `destaque Boolean @default(false)` ao model `Plano`

### 2. `Usuario` — Campo `telefone` ausente
- **Tela:** `Configuracoes.tsx` → TabPerfil → campo "Telefone"
- **Problema:** O formulário de edição do perfil admin tem campo de telefone, mas o model `Usuario` não tinha esse campo.
- **Correção:** Adicionado `telefone String?` ao model `Usuario`

### 3. `ConfiguracaoAcademia` — 4 campos ausentes do TabSistema
- **Tela:** `Configuracoes.tsx` → TabSistema
- **Problemas:**
  - `horarioAbertura` / `horarioFechamento`: inputs `type="time"` para horário de funcionamento (padrão "06:00" / "22:00")
  - `diasSemCheckinRisco`: "Dias sem check-in para risco" (padrão 10) → usado no Dashboard para "Turistas"
  - `diasAlertaVencimento`: "Dias antes do vencimento para alertar" (padrão 5) → define status "Vencendo"
- **Correção:** Adicionados todos os campos com seus valores padrão

### 4. `ConfiguracaoAcademia` — Campo `pinRecepcao` ausente
- **Tela:** `ModoRecepcao.tsx` → `PasswordModal` (PIN de 4 dígitos para sair do modo recepção)
- **Problema:** O PIN estava hardcoded como `"1234"` no frontend. Para permitir configuração pelo admin, o campo precisa estar no banco.
- **Correção:** Adicionado `pinRecepcao String @default("1234")`

### 5. `Aluno` — Campo `qrCodeToken` ausente
- **Tela:** `ModoRecepcao.tsx` → QR Code display e scanner
- **Problema:** O modo recepção exibe/lê QR codes. O valor do QR code precisa ser único por aluno e armazenado. O campo `matricula` serve como base mas um token separado permite rotação sem alterar a matrícula.
- **Correção:** Adicionado `qrCodeToken String? @unique`

### 6. `TermoResponsabilidade` — Typo no campo `dataAssintura`
- **Problema:** Campo nomeado `dataAssintura` (faltava o 'a' em "assinatura").
- **Correção:** Renomeado para `dataAssinatura`

### 7. `Notificacao` — Relação com `Aluno` não declarada
- **Problema:** O campo `alunoId String?` existia mas sem a diretiva `@relation`, tornando a relação inválida no Prisma.
- **Correção:** Adicionada relação `aluno Aluno? @relation(...)` com `onDelete: SetNull`

### 8. `LogAuditoria` — Relação com `Usuario` não declarada
- **Problema:** Mesmo problema do item 7 — `usuarioId` sem `@relation`.
- **Correção:** Adicionada relação `usuario Usuario? @relation(...)` e campo `logs` no model `Usuario`

### 9. `CheckIn` — Campo `identificador` ausente
- **Tela:** `ModoRecepcao.tsx` → input "código" ou "email" para check-in manual
- **Problema:** Quando o check-in é feito via input (não QR Code), o valor digitado (email ou matrícula) não tinha onde ser armazenado para auditoria.
- **Correção:** Adicionado `identificador String?` (usado quando `tipo = AUTO`)

---

## Modelos e Mapeamento com o Frontend

### 👤 `Aluno` → `alunos`

| Campo DB | Campo Frontend | Tela | Observação |
|---|---|---|---|
| `nome` | `nome` | NovoAluno § 1 | Nome completo |
| `dataNasc` | `dataNasc` | NovoAluno § 1 | `type="date"` |
| `cpf` | `cpf` | NovoAluno § 1 | Único, formato "000.000.000-00" |
| `rg` | `rg` | NovoAluno § 1 | |
| `sexo` | `sexo` | NovoAluno § 1 | "Feminino" \| "Masculino" \| "Outro" |
| `estadoCivil` | `estadoCivil` | NovoAluno § 1 | 5 opções no DSSelect |
| `profissao` | `profissao` | NovoAluno § 1 | |
| `telefone` | `telefone` | NovoAluno § 1 | WhatsApp |
| `email` | `email` | NovoAluno § 1 | Único |
| `endereco` | `endereco` | NovoAluno § 1 | Campo único completo |
| `contatoEmerg` | `contatoEmerg` | NovoAluno § 1 | |
| `telEmerg` | `telEmerg` | NovoAluno § 1 | |
| `fotoUrl` | `fotoAluno` (File) | NovoAluno § 1 | Upload → Supabase Storage |
| `status` | computado | Alunos.tsx | `AlunoStatus` enum |
| `matricula` | `student.id` | Alunos.tsx | Ex: `#5678` → base do QR Code |
| `qrCodeToken` | valor QR Code | ModoRecepcao | Token único para scanner |

**Status financeiro** (calculado, não armazenado):
- `"Em dia"` → PlanoAluno ATIVO + vencimento > `diasAlertaVencimento` dias
- `"Vencendo"` → PlanoAluno ATIVO + vencimento ≤ `diasAlertaVencimento` dias
- `"Em atraso"` → PlanoAluno VENCIDO ou pagamento ATRASADO

---

### 🩺 `DadosSaude` → `dados_saude`

| Campo DB | Pergunta no Frontend |
|---|---|
| `doenca` | "Possui alguma doença diagnosticada?" |
| `cardiaco` | "Problemas cardíacos?" |
| `pressao` | "Pressão alta ou baixa?" (opções: NÃO/ALTA/BAIXA) |
| `diabetes` | "Possui diabetes?" |
| `desmaios` | "Desmaios ou tonturas frequentes?" |
| `respiratorio` | "Problemas respiratórios?" |
| `articular` | "Problemas articulares?" |
| `cirurgia` | "Já realizou cirurgia?" |
| `medicacao` | "Faz uso de medicação contínua?" |
| `gestante` | "Está gestante?" (opções: SIM/NÃO/N/A) |
| `limitacao` | "Possui limitação física?" |
| `recomendacaoMedica` | "Possui recomendação médica para prática de exercícios?" |

---

### ❓ `ParQ` → `parq`

| Campo DB | Pergunta no Frontend |
|---|---|
| `q1` | "Algum médico já disse que você possui problema cardíaco?" |
| `q2` | "Sente dor no peito ao realizar atividade física?" |
| `q3` | "Sentiu dor no peito no último mês?" |
| `q4` | "Perde o equilíbrio por tontura ou já perdeu a consciência?" |
| `q5` | "Possui problema ósseo ou articular que pode piorar com exercício?" |
| `q6` | "Seu médico já recomendou restrição de atividade física?" |
| `possuiRestricao` | `hasParqWarning` — exibe alerta laranja se algum "SIM" |

---

### 🎯 `Objetivos` → `objetivos`

| Campo DB | Tipo/Opções no Frontend |
|---|---|
| `objetivo` | ObjectiveButton: "Emagrecimento" \| "Hipertrofia" \| "Condicionamento Físico" \| "Reabilitação" \| "Saúde Geral" \| "Outro" |
| `treinouAntes` | DSSelect: "Sim, regularmente" \| "Sim, esporadicamente" \| "Nunca treinei" |
| `tempoPratica` | Texto livre (ex: "6 meses") |
| `vezesSemana` | DSSelect: "1x" \| "2x" \| "3x" \| "4x" \| "5x ou mais" |
| `horarioPref` | Texto livre (ex: "manhã") |

---

### 💪 `DadosFisicos` → `dados_fisicos`

| Campo DB | Hint/Unidade | Observação |
|---|---|---|
| `peso` | KG | Float |
| `altura` | CM | Float |
| `imc` | Calculado | `peso / (altura/100)²` — calculado no frontend via `useEffect` |
| `gordura` | % | Percentual |
| `medidas` | texto | Circunferências livres |

---

### 📋 `Plano` → `planos`

| Campo DB | Campo Frontend | Observação |
|---|---|---|
| `nome` | `plan.name` | Uppercase: "BASIC", "PREMIUM", "ELITE" |
| `subtitulo` | `plan.subtitle` | Ex: "Plano mais popular" |
| `preco` | `plan.price` | Input `type="number"` |
| `beneficios` | `plan.benefits` | JSON array de strings (editável no PlanCard) |
| `destaque` | `plan.featured` | Toggle no PlanCard, checkbox no CriarPlanoModal |

---

### 🔗 `PlanoAluno` → `planos_alunos`

Criado ao cadastrar novo aluno (NovoAluno.tsx — Seção 6):

| Campo DB | Campo Frontend | Observação |
|---|---|---|
| `planoId` | `tipoPlano` | Referência ao Plano selecionado |
| `valor` | `valorPlano` | Valor negociado |
| `dataInicio` | `dataInicio` | `type="date"` |
| `dataVenc` | `dataVenc` | `type="date"` |
| `formaPgto` | `formaPgto` | "PIX" \| "Cartão" \| "Boleto" \| "Débito Automático" |

---

### 💳 `Pagamento` → `pagamentos`

Exibido em `Alunos.tsx` → `StudentProfile` → "HISTÓRICO DE PAGAMENTOS":

| Campo DB | Frontend | Observação |
|---|---|---|
| `valor` | `payment.amount` | Exibido como `R$ 89,90` |
| `dataPagamento` | `payment.date` | Exibido como `dd/mm/aaaa` |
| `formaPgto` | `payment.method` | "PIX", "Boleto", "Cartão", "Débito Automático" |
| `status` | `payment.status` | "Pago" \| "Atrasado" \| "Pendente" |

---

### ✅ `CheckIn` → `checkins`

Exibido em `CheckIns.tsx` e registrado via `ModoRecepcao.tsx`:

| Campo DB | Frontend | Observação |
|---|---|---|
| `entrada` | `checkIn.time` + `checkIn.date` | DateTime do check-in |
| `tipo` | — | MANUAL \| AUTO \| QR_CODE |
| `identificador` | `inputValue` | Email ou código digitado no Modo Recepção |

**Métricas do CheckIns.tsx** (calculadas via query):
- "HOJE" → `COUNT` onde `DATE(entrada) = CURRENT_DATE`
- "SEMANA" → `COUNT` nos últimos 7 dias
- "MÊS" → `COUNT` no mês atual
- "PICO" → Agrupamento por hora, `MAX(count)`

**Dashboard "Turistas"** → Alunos com `MAX(entrada) < NOW() - INTERVAL '${diasSemCheckinRisco} days'`

---

### ⚙️ `ConfiguracaoAcademia` → `configuracoes_academia`

| Campo DB | Tab Frontend | Observação |
|---|---|---|
| `nome` | TabGeral | "Nome da Academia" |
| `cnpj` | TabGeral | Único |
| `telefone` | TabGeral | |
| `email` | TabGeral | |
| `endereco` | TabGeral | |
| `cidade` | TabGeral | |
| `estado` | TabGeral | |
| `cep` | TabGeral | |
| `horarioAbertura` | TabSistema | Input `type="time"`, padrão "06:00" |
| `horarioFechamento` | TabSistema | Input `type="time"`, padrão "22:00" |
| `diasSemCheckinRisco` | TabSistema | "Dias sem check-in para risco", padrão 10 |
| `diasAlertaVencimento` | TabSistema | "Dias antes do vencimento para alertar", padrão 5 |
| `pinRecepcao` | ModoRecepcao | PIN de 4 dígitos para sair do Modo Recepção, padrão "1234" |

---

### 👥 `Usuario` → `usuarios`

| Campo DB | Tab Frontend | Observação |
|---|---|---|
| `nome` | TabPerfil | "Nome Completo" |
| `email` | TabPerfil | |
| `telefone` | TabPerfil | **Adicionado** — existia no form mas faltava no schema |
| `senha` | TabPerfil | Hash bcrypt — campos "Senha Atual" e "Nova Senha" |
| `cargo` | — | "Administrador", "Recepção", "Instrutor" |

---

## Relacionamentos

```
Aluno
  ├── DadosSaude (1:1)
  ├── ParQ (1:1)
  ├── Objetivos (1:1)
  ├── DadosFisicos (1:N) — múltiplas avaliações
  ├── PlanoAluno (1:N) — histórico de planos
  │     ├── Plano (N:1)
  │     └── Pagamento (1:N)
  ├── CheckIn (1:N)
  ├── Pagamento (1:N) — acesso direto para queries
  ├── TermoResponsabilidade (1:1)
  └── Notificacao (1:N)

Usuario
  └── LogAuditoria (1:N)
```

---

## Enums

| Enum | Valores | Uso |
|---|---|---|
| `AlunoStatus` | `ATIVO`, `INATIVO`, `INADIMPLENTE`, `SUSPENSO` | Status do cadastro do aluno |
| `StatusPlanoAluno` | `ATIVO`, `VENCIDO`, `CANCELADO`, `SUSPENSO` | Status do contrato do plano |
| `StatusPagamento` | `PENDENTE`, `PAGO`, `ATRASADO`, `CANCELADO` | Status da cobrança |
| `TipoCheckIn` | `MANUAL`, `AUTO`, `QR_CODE` | Como o check-in foi registrado |
| `TipoNotificacao` | `INFO`, `AVISO`, `URGENTE`, `PAGAMENTO`, `VENCIMENTO` | Categoria da notificação |

---

## Configuração Supabase

```bash
# 1. Instalar dependências
npm install prisma @prisma/client

# 2. Configurar variável de ambiente
# No Supabase: Settings → Database → Connection String (URI mode)
DATABASE_URL="postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:5432/postgres"

# 3. Gerar o schema no banco
npx prisma migrate dev --name init

# 4. Gerar o Prisma Client
npx prisma generate

# 5. Seed inicial (criar ConfiguracaoAcademia e Usuario admin)
npx prisma db seed
```

### Supabase Storage Buckets

| Bucket | Uso |
|---|---|
| `fotos-alunos` | Upload de foto no NovoAluno.tsx — `Aluno.fotoUrl` |
| `comprovantes` | Comprovantes de pagamento — `Pagamento.comprovante` |
| `assinaturas` | Assinaturas digitais — `TermoResponsabilidade.assinatura` |
| `logo-academia` | Logo da academia — `ConfiguracaoAcademia.logoUrl` |

### Row Level Security (RLS) recomendado

```sql
-- Apenas usuários autenticados (admin/recepção) acessam os dados
ALTER TABLE alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;
-- Aplicar policy para authenticated role em todas as tabelas
```

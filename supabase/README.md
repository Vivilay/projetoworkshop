# Supabase — FORGEE

## MCP / CLI

Este workspace **neste Cursor** pode não ter o servidor MCP **Supabase** habilitado. Se aparecer erro ou lista de MCP sem Supabase:

1. Em **Cursor ▸ Settings ▸ Tools & MCP**, ative/login no plugin oficial da Supabase.
2. Ou aplique migrations manualmente: **Dashboard Supabase ▸ SQL Editor** (função equivale ao `postgres` — ignora RLS ao executar DDL).

---

## Ordem das migrations

1. [`migrations/20260524143000_forgee_initial_visit_and_members.sql`](./migrations/20260524143000_forgee_initial_visit_and_members.sql) — formulário público **Agende visita** (`visit_bookings`) + legado opcional (`members`).
2. [`migrations/20260525174500_forgee_academy_dashboard_schema.sql`](./migrations/20260525174500_forgee_academy_dashboard_schema.sql) — schema completo segundo [`docs/DATABASE_SCHEMA.md`](../docs/DATABASE_SCHEMA.md) (Enums, tabelas, triggers, Storage, RLS, perfis Admin).

**Nunca** rode apenas o passo 2 em projeto vazio de visitas: ele assume que `visit_bookings` (e opcionalmente `members`) já existem.

---

## Depois das migrations

### 1. Primeiro usuário admin (staff)

Fluxo esperado pela migration:

1. Cadastre o usuário em **Authentication** (mail/senha).
2. Na **SQL Editor** (painel Postgres), associe ao perfil equipa:

```sql
INSERT INTO public.usuarios (id, nome, email, cargo)
SELECT id,
       COALESCE(raw_user_meta_data->>'nome'::text, 'Administrador'::text),
       email,
       'Administrador'::text
FROM auth.users
WHERE email = 'seu-admin@dominio.com'
LIMIT 1
ON CONFLICT (id) DO NOTHING;
```

Enquanto **não** existir linha em `usuarios` para o JWT, políticas como `forgee_staff_exists(auth.uid())` bloqueiam o dashboard contra o papel `authenticated`.

### 2. Frontend (Vite)

`.env`:

```bash
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=...
```

Landing: apenas `anon` faz **INSERT** em `visit_bookings`. Dashboard usa sessão **`authenticated`** (mesmo UUID que `auth.users.id` ≡ `usuarios.id`).

### 3. Colunas físicas × documento camelCase

O SQL usa **snake_case** Postgres (`data_nasc`, `foto_url`, etc.). Mantenha o mapa contra o doc em [`docs/DATABASE_SCHEMA.md`](../docs/DATABASE_SCHEMA.md) nos componentes ou use camada mapper / Prisma `@map`.

### 4. Divergências intencionais do doc

| Doc | Postgres |
|-----|----------|
| `Usuario.senha` (bcrypt) | **Não há coluna** — senhas só Supabase Auth. |
| `TermoResponsabilidade.assinatura` | `assinatura_url` (+ Storage bucket `assinaturas`). |

### 5. Políticas (resumo)

| Área | Regra |
|------|--------|
| `visit_bookings` | **anon**: INSERT apenas. **authenticated** com perfil staff: todas as operações. |
| Maioria das tabelas operacionais | Equipe (`usuarios`): CRUD quando `forgee_staff_exists`. |
| `logs_auditoria` SELECT | Somente **`Administrador`**. INSERT: qualquer staff. |
| `usuarios` | INSERT / UPDATE outros / DELETE apenas **Administrador**; cada um atualiza própria linha. |
| `configuracoes_academia` | Leitura staff; escrita apenas **Administrador**. |
| Storage privado | fotos/comprovantes/assinaturas: staff genérico. Logo: leitura pública bucket; gestão apenas admin. |

### 6. Troubleshooting rápido

- **Unauthorized / bloqueado no PostgREST** — JWT não logado, ou falta linha em `usuarios`.
- **`visit_bookings` falhou após migração 2** — Garantiu `GRANT INSERT ... TO anon` (está na migration)? Verifique projeto correto.

---

## Prisma (opcional)

O documento sugere URL `DATABASE_URL` + `prisma migrate`. Esta pasta prioriza migrations SQL versionadas compatíveis com Supabase Hosted. Para Prisma espelhar o Postgres: `pnpm prisma db pull` após DDL aplicado, ou gere `schema.prisma` manualmente usando os tipos `@map` aos nomes físicos snake_case.

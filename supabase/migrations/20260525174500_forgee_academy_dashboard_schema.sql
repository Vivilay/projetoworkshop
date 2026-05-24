-- ============================================================================
-- FORGEE Academy — schema completo (docs/DATABASE_SCHEMA.md + Supabase Auth)
--
-- Ordem recomendada: execute DEPOIS de 20260524143000_* (landing visit_bookings + members).
--
-- onboarding staff (primeira vez sem linha em usuarios):
-- 1. Crie o usuário em Authentication (Supabase).
-- 2. Rode COM service_role ou SQL direto ao DB (dashboard SQL ignora RLS):
-- INSERT INTO usuarios (id,nome,email,cargo)
-- SELECT id, COALESCE(raw_user_meta_data->>'nome','Administrador'), email, 'Administrador'
-- FROM auth.users WHERE email = 'seu-admin@email.com' LIMIT 1
-- ON CONFLICT (id) DO NOTHING;

-- ── ENUMS ─────────────────────────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'aluno_status') THEN
    CREATE TYPE public.aluno_status AS ENUM ('ATIVO','INATIVO','INADIMPLENTE','SUSPENSO');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_plano_aluno') THEN
    CREATE TYPE public.status_plano_aluno AS ENUM ('ATIVO','VENCIDO','CANCELADO','SUSPENSO');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_pagamento') THEN
    CREATE TYPE public.status_pagamento AS ENUM ('PENDENTE','PAGO','ATRASADO','CANCELADO');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_checkin') THEN
    CREATE TYPE public.tipo_checkin AS ENUM ('MANUAL','AUTO','QR_CODE');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_notificacao') THEN
    CREATE TYPE public.tipo_notificacao AS ENUM ('INFO','AVISO','URGENTE','PAGAMENTO','VENCIMENTO');
  END IF;
END $$;

-- ── TRIGGERS updated_at ─────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.forgee_touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at := timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.forgee_touch_atualizado_em()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  NEW.atualizado_em := timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

-- ── SECURITY DEFINER helpers (consultam usuarios sem ciclo infinito de RLS)
CREATE OR REPLACE FUNCTION public.forgee_staff_exists(p_uid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.usuarios u
    WHERE u.id = p_uid
    LIMIT 1
  );
$$;

CREATE OR REPLACE FUNCTION public.forgee_is_administrator(p_uid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.usuarios u
    WHERE u.id = p_uid
      AND u.cargo = 'Administrador'
    LIMIT 1
  );
$$;

REVOKE ALL ON FUNCTION public.forgee_staff_exists(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.forgee_is_administrator(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.forgee_staff_exists(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.forgee_is_administrator(uuid) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.forgee_touch_updated_at() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.forgee_touch_atualizado_em() FROM PUBLIC;

-- ── Equipe ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.usuarios (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  nome text NOT NULL,
  email text NOT NULL UNIQUE,
  telefone text,
  cargo text NOT NULL CHECK (cargo IN ('Administrador','Recepção','Instrutor')),
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.usuarios IS 'Equipe do dashboard — senhas via Supabase Auth (sem coluna bcrypt).';

DROP TRIGGER IF EXISTS trg_usuarios_updated ON public.usuarios;
CREATE TRIGGER trg_usuarios_updated
BEFORE UPDATE ON public.usuarios
FOR EACH ROW
EXECUTE FUNCTION public.forgee_touch_updated_at();

-- ── Configurações (singleton id=1) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.configuracoes_academia (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  nome text NOT NULL DEFAULT 'FORGEE Academy',
  cnpj text NOT NULL UNIQUE,
  telefone text,
  email text,
  endereco text,
  cidade text,
  estado text,
  cep text,
  horario_abertura time NOT NULL DEFAULT time '06:00',
  horario_fechamento time NOT NULL DEFAULT time '22:00',
  dias_sem_checkin_risco integer NOT NULL DEFAULT 10 CHECK (dias_sem_checkin_risco > 0),
  dias_alerta_vencimento integer NOT NULL DEFAULT 5 CHECK (dias_alerta_vencimento > 0),
  pin_recepcao text NOT NULL DEFAULT '1234' CHECK (char_length(pin_recepcao) BETWEEN 4 AND 8),
  logo_url text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

INSERT INTO public.configuracoes_academia (id, nome, cnpj)
VALUES (1, 'FORGEE Academy', '00000000000000')
ON CONFLICT (id) DO NOTHING;

COMMENT ON COLUMN public.configuracoes_academia.pin_recepcao IS 'ModoRecepcao — substitua o placeholder "1234" em produção.';

DROP TRIGGER IF EXISTS trg_conf_academy_updated ON public.configuracoes_academia;
CREATE TRIGGER trg_conf_academy_updated
BEFORE UPDATE ON public.configuracoes_academia
FOR EACH ROW
EXECUTE FUNCTION public.forgee_touch_updated_at();

-- ── Planos ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.planos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL UNIQUE,
  subtitulo text,
  preco numeric(12,2) NOT NULL DEFAULT 0,
  beneficios jsonb NOT NULL DEFAULT '[]'::jsonb,
  destaque boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

DROP TRIGGER IF EXISTS trg_planos_updated ON public.planos;
CREATE TRIGGER trg_planos_updated
BEFORE UPDATE ON public.planos
FOR EACH ROW
EXECUTE FUNCTION public.forgee_touch_updated_at();

-- ── Alunos ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.alunos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  data_nasc date NOT NULL,
  cpf text NOT NULL UNIQUE,
  rg text,
  sexo text NOT NULL CHECK (sexo IN ('Feminino','Masculino','Outro')),
  estado_civil text NOT NULL,
  profissao text,
  telefone text,
  email text NOT NULL UNIQUE,
  endereco text,
  contato_emerg text,
  tel_emerg text,
  foto_url text,
  status public.aluno_status NOT NULL DEFAULT 'ATIVO',
  matricula text NOT NULL UNIQUE,
  qr_code_token text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_alunos_status ON public.alunos (status);

DROP TRIGGER IF EXISTS trg_alunos_updated ON public.alunos;
CREATE TRIGGER trg_alunos_updated
BEFORE UPDATE ON public.alunos
FOR EACH ROW
EXECUTE FUNCTION public.forgee_touch_updated_at();

-- ── 1:1 subsistemas ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.dados_saude (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id uuid NOT NULL UNIQUE REFERENCES public.alunos (id) ON DELETE CASCADE,
  doenca text,
  cardiaco text,
  pressao text,
  diabetes text,
  desmaios text,
  respiratorio text,
  articular text,
  cirurgia text,
  medicacao text,
  gestante text,
  limitacao text,
  recomendacao_medica text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

DROP TRIGGER IF EXISTS trg_dados_saude_updated ON public.dados_saude;
CREATE TRIGGER trg_dados_saude_updated
BEFORE UPDATE ON public.dados_saude
FOR EACH ROW
EXECUTE FUNCTION public.forgee_touch_updated_at();

CREATE TABLE IF NOT EXISTS public.parq (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id uuid NOT NULL UNIQUE REFERENCES public.alunos (id) ON DELETE CASCADE,
  q1 boolean NOT NULL DEFAULT false,
  q2 boolean NOT NULL DEFAULT false,
  q3 boolean NOT NULL DEFAULT false,
  q4 boolean NOT NULL DEFAULT false,
  q5 boolean NOT NULL DEFAULT false,
  q6 boolean NOT NULL DEFAULT false,
  possui_restricao boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

DROP TRIGGER IF EXISTS trg_parq_updated ON public.parq;
CREATE TRIGGER trg_parq_updated
BEFORE UPDATE ON public.parq
FOR EACH ROW
EXECUTE FUNCTION public.forgee_touch_updated_at();

CREATE TABLE IF NOT EXISTS public.objetivos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id uuid NOT NULL UNIQUE REFERENCES public.alunos (id) ON DELETE CASCADE,
  objetivo text NOT NULL,
  treinou_antes text,
  tempo_pratica text,
  vezes_semana text,
  horario_pref text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

DROP TRIGGER IF EXISTS trg_objetivos_updated ON public.objetivos;
CREATE TRIGGER trg_objetivos_updated
BEFORE UPDATE ON public.objetivos
FOR EACH ROW
EXECUTE FUNCTION public.forgee_touch_updated_at();

CREATE TABLE IF NOT EXISTS public.dados_fisicos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id uuid NOT NULL REFERENCES public.alunos (id) ON DELETE CASCADE,
  peso double precision,
  altura double precision,
  imc double precision,
  gordura double precision,
  medidas text,
  criado_em timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  atualizado_em timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

DROP TRIGGER IF EXISTS trg_dados_fisicos_updated ON public.dados_fisicos;
CREATE TRIGGER trg_dados_fisicos_updated
BEFORE UPDATE ON public.dados_fisicos
FOR EACH ROW
EXECUTE FUNCTION public.forgee_touch_atualizado_em();

CREATE TABLE IF NOT EXISTS public.planos_alunos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id uuid NOT NULL REFERENCES public.alunos (id) ON DELETE CASCADE,
  plano_id uuid NOT NULL REFERENCES public.planos (id) ON DELETE RESTRICT,
  valor numeric(12,2) NOT NULL DEFAULT 0,
  data_inicio date NOT NULL,
  data_venc date NOT NULL,
  forma_pgto text NOT NULL CHECK (forma_pgto IN ('PIX','Cartão','Boleto','Débito Automático')),
  status public.status_plano_aluno NOT NULL DEFAULT 'ATIVO',
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_planos_alunos_aluno ON public.planos_alunos (aluno_id);
CREATE INDEX IF NOT EXISTS idx_planos_alunos_status ON public.planos_alunos (status);

DROP TRIGGER IF EXISTS trg_planos_alunos_updated ON public.planos_alunos;
CREATE TRIGGER trg_planos_alunos_updated
BEFORE UPDATE ON public.planos_alunos
FOR EACH ROW
EXECUTE FUNCTION public.forgee_touch_updated_at();

CREATE TABLE IF NOT EXISTS public.pagamentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id uuid NOT NULL REFERENCES public.alunos (id) ON DELETE CASCADE,
  plano_aluno_id uuid REFERENCES public.planos_alunos (id) ON DELETE SET NULL,
  valor numeric(12,2) NOT NULL,
  data_pagamento date NOT NULL DEFAULT (timezone('utc'::text, now()))::date,
  forma_pgto text NOT NULL CHECK (forma_pgto IN ('PIX','Cartão','Boleto','Débito Automático')),
  status public.status_pagamento NOT NULL DEFAULT 'PENDENTE',
  comprovante_url text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_pagamentos_aluno ON public.pagamentos (aluno_id);

DROP TRIGGER IF EXISTS trg_pagamentos_updated ON public.pagamentos;
CREATE TRIGGER trg_pagamentos_updated
BEFORE UPDATE ON public.pagamentos
FOR EACH ROW
EXECUTE FUNCTION public.forgee_touch_updated_at();

CREATE TABLE IF NOT EXISTS public.checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id uuid NOT NULL REFERENCES public.alunos (id) ON DELETE CASCADE,
  entrada timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  tipo public.tipo_checkin NOT NULL DEFAULT 'AUTO',
  identificador text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_checkins_aluno_entrada ON public.checkins (aluno_id, entrada DESC);
CREATE INDEX IF NOT EXISTS idx_checkins_entrada ON public.checkins (entrada DESC);

CREATE TABLE IF NOT EXISTS public.termos_responsabilidade (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id uuid NOT NULL UNIQUE REFERENCES public.alunos (id) ON DELETE CASCADE,
  assinatura_url text NOT NULL DEFAULT '',
  data_assinatura timestamptz,
  criado_em timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  atualizado_em timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON COLUMN public.termos_responsabilidade.data_assinatura IS 'Correção do typo dataAssintura do doc.';

DROP TRIGGER IF EXISTS trg_termos_updated ON public.termos_responsabilidade;
CREATE TRIGGER trg_termos_updated
BEFORE UPDATE ON public.termos_responsabilidade
FOR EACH ROW
EXECUTE FUNCTION public.forgee_touch_atualizado_em();

CREATE TABLE IF NOT EXISTS public.notificacoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL DEFAULT 'Notificação',
  mensagem text NOT NULL DEFAULT '',
  tipo public.tipo_notificacao NOT NULL DEFAULT 'INFO',
  lida boolean NOT NULL DEFAULT false,
  aluno_id uuid REFERENCES public.alunos (id) ON DELETE SET NULL,
  criado_em timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  atualizado_em timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_notif_aluno ON public.notificacoes (aluno_id);

DROP TRIGGER IF EXISTS trg_notifs_updated ON public.notificacoes;
CREATE TRIGGER trg_notifs_updated
BEFORE UPDATE ON public.notificacoes
FOR EACH ROW
EXECUTE FUNCTION public.forgee_touch_atualizado_em();

CREATE TABLE IF NOT EXISTS public.logs_auditoria (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuario_id uuid REFERENCES public.usuarios (id) ON DELETE SET NULL,
  acao text NOT NULL,
  recurso text,
  detalhes jsonb,
  ip text,
  criado_em timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_logs_usuario ON public.logs_auditoria (usuario_id);
CREATE INDEX IF NOT EXISTS idx_logs_criado ON public.logs_auditoria (criado_em DESC);

-- ── STORAGE buckets (DOCUMENT § Storage) ───────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('fotos-alunos', 'fotos-alunos', false),
  ('comprovantes', 'comprovantes', false),
  ('assinaturas', 'assinaturas', false),
  ('logo-academia', 'logo-academia', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS storage_staff_fotos_sel ON storage.objects;
DROP POLICY IF EXISTS storage_staff_fotos_ins ON storage.objects;
DROP POLICY IF EXISTS storage_staff_fotos_upd ON storage.objects;
DROP POLICY IF EXISTS storage_staff_compr_sel ON storage.objects;
DROP POLICY IF EXISTS storage_staff_compr_ins ON storage.objects;
DROP POLICY IF EXISTS storage_staff_compr_upd ON storage.objects;
DROP POLICY IF EXISTS storage_staff_ass_sel ON storage.objects;
DROP POLICY IF EXISTS storage_staff_ass_ins ON storage.objects;
DROP POLICY IF EXISTS storage_staff_ass_upd ON storage.objects;
DROP POLICY IF EXISTS logo_public ON storage.objects;
DROP POLICY IF EXISTS logo_staff_manage ON storage.objects;
DROP POLICY IF EXISTS logo_staff_manage_up ON storage.objects;
DROP POLICY IF EXISTS logo_staff_manage_del ON storage.objects;

CREATE POLICY storage_staff_fotos_sel ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'fotos-alunos' AND public.forgee_staff_exists(auth.uid()));

CREATE POLICY storage_staff_fotos_ins ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'fotos-alunos' AND public.forgee_staff_exists(auth.uid()));

CREATE POLICY storage_staff_fotos_upd ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'fotos-alunos' AND public.forgee_staff_exists(auth.uid()))
WITH CHECK (bucket_id = 'fotos-alunos' AND public.forgee_staff_exists(auth.uid()));

CREATE POLICY storage_staff_compr_sel ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'comprovantes' AND public.forgee_staff_exists(auth.uid()));

CREATE POLICY storage_staff_compr_ins ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'comprovantes' AND public.forgee_staff_exists(auth.uid()));

CREATE POLICY storage_staff_compr_upd ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'comprovantes' AND public.forgee_staff_exists(auth.uid()))
WITH CHECK (bucket_id = 'comprovantes' AND public.forgee_staff_exists(auth.uid()));

CREATE POLICY storage_staff_ass_sel ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'assinaturas' AND public.forgee_staff_exists(auth.uid()));

CREATE POLICY storage_staff_ass_ins ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'assinaturas' AND public.forgee_staff_exists(auth.uid()));

CREATE POLICY storage_staff_ass_upd ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'assinaturas' AND public.forgee_staff_exists(auth.uid()))
WITH CHECK (bucket_id = 'assinaturas' AND public.forgee_staff_exists(auth.uid()));

CREATE POLICY logo_public ON storage.objects
FOR SELECT TO anon, authenticated
USING (bucket_id = 'logo-academia');

CREATE POLICY logo_staff_manage ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'logo-academia'
  AND public.forgee_is_administrator(auth.uid())
);

CREATE POLICY logo_staff_manage_up ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'logo-academia' AND public.forgee_is_administrator(auth.uid()))
WITH CHECK (bucket_id = 'logo-academia' AND public.forgee_is_administrator(auth.uid()));

CREATE POLICY logo_staff_manage_del ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'logo-academia' AND public.forgee_is_administrator(auth.uid()));

-- ============================================================================
-- RLS (tabelas + visit_bookings ajustados)
-- ============================================================================

DROP POLICY IF EXISTS members_allow_all_pref_auth ON public.members;
DROP POLICY IF EXISTS visit_bookings_allow_all_pref_auth ON public.visit_bookings;

ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracoes_academia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dados_saude ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parq ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.objetivos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dados_fisicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planos_alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pagamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.termos_responsabilidade ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notificacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs_auditoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visit_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Limpar políticas órfãs de re-exec (nomes estáveis FORGEE v1)

DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN (
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND policyname LIKE 'forgee_%'
  ) LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- --- visit_bookings: anon insert + staff ---
CREATE POLICY forgee_visit_bookings_anon_insert ON public.visit_bookings FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY forgee_visit_bookings_staff ON public.visit_bookings FOR ALL TO authenticated
USING (public.forgee_staff_exists(auth.uid()))
WITH CHECK (public.forgee_staff_exists(auth.uid()));

-- --- Membros (legado pré-alunos.ts) ---
CREATE POLICY forgee_members_staff ON public.members FOR ALL TO authenticated
USING (public.forgee_staff_exists(auth.uid()))
WITH CHECK (public.forgee_staff_exists(auth.uid()));

-- --- Operational tables (Recepção/Instrutor/Admin) ---
CREATE POLICY forgee_alunos ON public.alunos FOR ALL TO authenticated
USING (public.forgee_staff_exists(auth.uid())) WITH CHECK (public.forgee_staff_exists(auth.uid()));

CREATE POLICY forgee_ds ON public.dados_saude FOR ALL TO authenticated
USING (public.forgee_staff_exists(auth.uid())) WITH CHECK (public.forgee_staff_exists(auth.uid()));

CREATE POLICY forgee_parq ON public.parq FOR ALL TO authenticated
USING (public.forgee_staff_exists(auth.uid())) WITH CHECK (public.forgee_staff_exists(auth.uid()));

CREATE POLICY forgee_obj ON public.objetivos FOR ALL TO authenticated
USING (public.forgee_staff_exists(auth.uid())) WITH CHECK (public.forgee_staff_exists(auth.uid()));

CREATE POLICY forgee_df ON public.dados_fisicos FOR ALL TO authenticated
USING (public.forgee_staff_exists(auth.uid())) WITH CHECK (public.forgee_staff_exists(auth.uid()));

CREATE POLICY forgee_plan ON public.planos FOR ALL TO authenticated
USING (public.forgee_staff_exists(auth.uid())) WITH CHECK (public.forgee_staff_exists(auth.uid()));

CREATE POLICY forgee_pa ON public.planos_alunos FOR ALL TO authenticated
USING (public.forgee_staff_exists(auth.uid())) WITH CHECK (public.forgee_staff_exists(auth.uid()));

CREATE POLICY forgee_pag ON public.pagamentos FOR ALL TO authenticated
USING (public.forgee_staff_exists(auth.uid())) WITH CHECK (public.forgee_staff_exists(auth.uid()));

CREATE POLICY forgee_ck ON public.checkins FOR ALL TO authenticated
USING (public.forgee_staff_exists(auth.uid())) WITH CHECK (public.forgee_staff_exists(auth.uid()));

CREATE POLICY forgee_tr ON public.termos_responsabilidade FOR ALL TO authenticated
USING (public.forgee_staff_exists(auth.uid())) WITH CHECK (public.forgee_staff_exists(auth.uid()));

CREATE POLICY forgee_nf ON public.notificacoes FOR ALL TO authenticated
USING (public.forgee_staff_exists(auth.uid())) WITH CHECK (public.forgee_staff_exists(auth.uid()));

-- Logs: apenas admin lê ; staff registra auditoria ao agir pelo app

CREATE POLICY forgee_audit_ins ON public.logs_auditoria FOR INSERT TO authenticated
WITH CHECK (public.forgee_staff_exists(auth.uid()));

CREATE POLICY forgee_audit_sel ON public.logs_auditoria FOR SELECT TO authenticated
USING (public.forgee_is_administrator(auth.uid()));

-- ── Perfis ─────────────────────────────────────────────────────────────────
CREATE POLICY forgee_staff_dir ON public.usuarios FOR SELECT TO authenticated
USING (public.forgee_staff_exists(auth.uid()));

CREATE POLICY forgee_staff_self_up ON public.usuarios FOR UPDATE TO authenticated
USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE POLICY forgee_admin_staff_ins ON public.usuarios FOR INSERT TO authenticated
WITH CHECK (public.forgee_is_administrator(auth.uid()));

CREATE POLICY forgee_admin_staff_up ON public.usuarios FOR UPDATE TO authenticated
USING (public.forgee_is_administrator(auth.uid()))
WITH CHECK (public.forgee_is_administrator(auth.uid()));

CREATE POLICY forgee_admin_staff_del ON public.usuarios FOR DELETE TO authenticated
USING (public.forgee_is_administrator(auth.uid()));

-- ── Academia ─────────────────────────────────────────────────────────────────
CREATE POLICY forgee_conf_read ON public.configuracoes_academia FOR SELECT TO authenticated
USING (public.forgee_staff_exists(auth.uid()));

CREATE POLICY forgee_conf_admin ON public.configuracoes_academia FOR INSERT TO authenticated
WITH CHECK (public.forgee_is_administrator(auth.uid()));

CREATE POLICY forgee_conf_admin_up ON public.configuracoes_academia FOR UPDATE TO authenticated
USING (public.forgee_is_administrator(auth.uid()))
WITH CHECK (public.forgee_is_administrator(auth.uid()));

CREATE POLICY forgee_conf_admin_del ON public.configuracoes_academia FOR DELETE TO authenticated
USING (public.forgee_is_administrator(auth.uid()));

-- ── Grants básicos PostgREST ─────────────────────────────────────────────────
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT INSERT ON TABLE public.visit_bookings TO anon;

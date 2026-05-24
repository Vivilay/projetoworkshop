import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { cn } from "@/app/components/ui/utils";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";

type VisitBookingFormValues = {
  full_name: string;
  email: string;
  phone: string;
  preferred_at: string;
  notes: string;
};

export type VisitBookingSectionProps = {
  className?: string;
};

/** Form da CTA «Agende uma visita» — campos espelham `visit_bookings` no Supabase. */
export function VisitBookingSection({ className }: VisitBookingSectionProps) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<VisitBookingFormValues>({
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      preferred_at: "",
      notes: ""
    }
  });

  const configured = isSupabaseConfigured();

  const onSubmit = handleSubmit(async (data) => {
    if (!configured) {
      toast.error(
        "Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env (veja supabase/README.md)."
      );
      return;
    }
    setSubmitting(true);
    const client = getSupabaseBrowserClient();
    const preferredAt =
      data.preferred_at.trim() !== "" ? new Date(data.preferred_at).toISOString() : null;

    const { error } = await client.from("visit_bookings").insert({
      full_name: data.full_name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim() === "" ? null : data.phone.trim(),
      preferred_at: preferredAt,
      notes: data.notes.trim() === "" ? null : data.notes.trim(),
      source: "site_cta_visita_gratuita"
    });

    setSubmitting(false);

    if (error) {
      console.error("[visit_bookings]", error);
      toast.error(error.message ?? "Não foi possível enviar o pedido. Tente novamente.");
      return;
    }

    toast.success("Pedido enviado! Entraremos em contato em breve.");
    reset();
  });

  return (
    <section className={cn("w-full max-w-xl mx-auto text-left mt-12", className)}>
      {!configured ? (
        <p className="mb-6 rounded-lg border border-destructive/40 bg-card px-4 py-3 text-sm text-muted-foreground">
          Supabase ainda não está configurado no front. Copie seu URL e anon key do dashboard em{" "}
          <code className="text-foreground">.env</code> (ver <code className="text-foreground">.env.example</code>).
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="visit-full-name" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Nome completo
          </Label>
          <Input
            id="visit-full-name"
            autoComplete="name"
            className="border-border bg-card text-foreground"
            {...register("full_name", {
              required: "Informe seu nome.",
              validate: (v) => v.trim().length >= 2 || "Nome muito curto."
            })}
            aria-invalid={Boolean(errors.full_name)}
          />
          {errors.full_name ? (
            <p className="text-xs text-destructive">{errors.full_name.message}</p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="visit-email" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              E-mail
            </Label>
            <Input
              id="visit-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              className="border-border bg-card text-foreground"
              {...register("email", { required: "Informe seu e-mail." })}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="visit-phone" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              WhatsApp / telefone
            </Label>
            <Input
              id="visit-phone"
              type="tel"
              autoComplete="tel"
              className="border-border bg-card text-foreground"
              placeholder="Opcional"
              {...register("phone")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="visit-datetime"
            className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
          >
            Preferência de data / horário
          </Label>
          <Input
            id="visit-datetime"
            type="datetime-local"
            className="border-border bg-card text-foreground scheme-dark"
            {...register("preferred_at")}
          />
          <p className="text-[11px] text-muted-foreground">Opcional — sugerimos o melhor encaixe com a equipe.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="visit-notes" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Observações
          </Label>
          <Textarea
            id="visit-notes"
            rows={3}
            className="border-border bg-card text-foreground"
            placeholder="Objetivos, nível de treino ou dúvidas."
            {...register("notes")}
          />
        </div>

        <Button type="submit" size="lg" className="w-full uppercase tracking-wide" disabled={submitting}>
          {submitting ? "Enviando..." : "Enviar solicitação de visita"}
        </Button>
      </form>
    </section>
  );
}

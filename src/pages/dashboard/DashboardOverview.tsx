import { motion } from "motion/react";
import { Activity, TrendingUp, Users, CalendarCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { fadeInUp, smoothTransition, staggerContainer, staggerItem } from "@/lib/animations";

const stats = [
  { label: "Membros ativos", value: "248", icon: Users, change: "+12 este mês" },
  { label: "Check-ins hoje", value: "67", icon: Activity, change: "Pico 18h–20h" },
  { label: "Aulas da semana", value: "34", icon: CalendarCheck, change: "8 vagas restantes" },
  { label: "Receita (mês)", value: "R$ 42,8k", icon: TrendingUp, change: "+8,2% vs. anterior" }
] as const;

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={smoothTransition}
      >
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Painel</p>
        <h2 className="font-['Oswald'] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
          Visão geral
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Base do sistema FORGEE. Novos módulos (membros, agenda, financeiro) entram nesta área.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {stats.map(({ label, value, icon: Icon, change }) => (
          <motion.div key={label} variants={staggerItem} transition={smoothTransition}>
            <Card className="border-border bg-card transition-colors hover:border-primary/40">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {label}
                </CardTitle>
                <Icon className="size-4 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="font-['Oswald'] text-3xl font-bold text-foreground">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...smoothTransition, delay: 0.2 }}
        className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center"
      >
        <p className="text-sm text-muted-foreground">
          Área reservada para gráficos, tabelas e fluxos da dashboard completa.
        </p>
      </motion.div>
    </div>
  );
}

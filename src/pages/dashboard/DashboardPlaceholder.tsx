import { motion } from "motion/react";
import { fadeInUp, smoothTransition } from "@/lib/animations";

type DashboardPlaceholderProps = {
  title: string;
  description: string;
};

export function DashboardPlaceholder({ title, description }: DashboardPlaceholderProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={smoothTransition}
      className="flex min-h-[40vh] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 px-6 text-center"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-primary">{title}</p>
      <h2 className="mt-2 font-['Oswald'] text-2xl font-bold uppercase text-foreground">{title}</h2>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}

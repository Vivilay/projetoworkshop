import { motion } from "motion/react";
import { fadeIn } from "@/lib/animations";

export function RouteFallback() {
  return (
    <motion.div
      className="flex min-h-[50vh] flex-1 items-center justify-center bg-background"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <p className="font-['Inter'] text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Carregando…
      </p>
    </motion.div>
  );
}

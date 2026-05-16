import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { defaultViewport, fadeInUp, smoothTransition } from "@/lib/animations";

type AnimatedSectionProps = HTMLMotionProps<"section"> & {
  variants?: Variants;
  delay?: number;
};

export function AnimatedSection({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={variants}
      transition={{ ...smoothTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

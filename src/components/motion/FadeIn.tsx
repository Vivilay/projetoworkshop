import { motion, type HTMLMotionProps } from "motion/react";
import { defaultViewport, fadeIn, smoothTransition } from "@/lib/animations";

type FadeInProps = HTMLMotionProps<"motion.div"> & {
  delay?: number;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeIn}
      transition={{ ...smoothTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

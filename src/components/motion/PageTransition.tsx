import { AnimatePresence, motion } from "motion/react";
import { useLocation, Outlet } from "react-router";
import { pageTransition, pageVariants } from "@/lib/animations";

type PageTransitionProps = {
  children?: React.ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        className="flex min-h-0 flex-1 flex-col"
      >
        {children ?? <Outlet />}
      </motion.div>
    </AnimatePresence>
  );
}

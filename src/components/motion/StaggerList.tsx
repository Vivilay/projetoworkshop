import { motion, type HTMLMotionProps } from "motion/react";
import {
  defaultViewport,
  staggerContainer,
  staggerItem,
  smoothTransition
} from "@/lib/animations";

type StaggerListProps = HTMLMotionProps<"ul"> & {
  itemClassName?: string;
};

export function StaggerList({
  children,
  className,
  itemClassName,
  ...props
}: StaggerListProps) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer}
      className={className}
      {...props}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.li
              key={index}
              variants={staggerItem}
              transition={smoothTransition}
              className={itemClassName}
            >
              {child}
            </motion.li>
          ))
        : children}
    </motion.ul>
  );
}

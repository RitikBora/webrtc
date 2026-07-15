"use client"

import { motion, type HTMLMotionProps } from "framer-motion";

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export function Reveal({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: EASE_SMOOTH }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

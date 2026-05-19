import React from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import type { Transition, Variants } from "motion/react";

// Re-export `motion` as `m` so all existing imports keep working.
// Using `motion` (full bundle) instead of lazy `m` avoids needing
// LazyMotion in every Astro island root.
export const m = motion;
export { AnimatePresence, animate, useMotionValue, useTransform };

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const springTransition: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 28,
  mass: 0.8,
};

export const revealTransition: Transition = {
  duration: 0.55,
  ease: EASE_OUT,
};

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: revealTransition,
  },
};

interface MotionProviderProps {
  children: React.ReactNode;
}

export const MotionProvider: React.FC<MotionProviderProps> = ({ children }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

type RevealProps = React.ComponentProps<typeof m.div> & {
  amount?: number;
  as?: "article" | "div" | "header" | "section";
  delay?: number;
};

export const Reveal: React.FC<RevealProps> = ({
  amount = 0.18,
  as = "div",
  children,
  className = "",
  delay = 0,
  transition,
  variants,
  ...props
}) => {
  const Component = (
    as === "section"
      ? m.section
      : as === "article"
        ? m.article
        : as === "header"
          ? m.header
          : m.div
  ) as typeof m.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants ?? revealVariants}
      transition={transition ?? { ...revealTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};

type StaggerProps = React.ComponentProps<typeof m.div> & {
  amount?: number;
  delayChildren?: number;
  staggerChildren?: number;
};

export const Stagger: React.FC<StaggerProps> = ({
  amount = 0.18,
  children,
  className = "",
  delayChildren = 0,
  staggerChildren = 0.08,
  variants,
  ...props
}) => (
  <m.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount }}
    variants={
      variants ?? {
        hidden: {},
        visible: { transition: { delayChildren, staggerChildren } },
      }
    }
    className={className}
    {...props}
  >
    {children}
  </m.div>
);

type MotionCardProps = React.ComponentProps<typeof m.article>;

export const MotionCard: React.FC<MotionCardProps> = ({
  children,
  transition,
  variants,
  whileHover,
  whileTap,
  ...props
}) => (
  <m.article
    variants={variants ?? staggerItem}
    whileHover={whileHover ?? { y: -6, scale: 1.01 }}
    whileTap={whileTap ?? { scale: 0.99 }}
    transition={transition ?? springTransition}
    {...props}
  >
    {children}
  </m.article>
);

type MotionButtonProps = React.ComponentProps<typeof m.button>;

export const MotionButton: React.FC<MotionButtonProps> = ({
  children,
  transition,
  whileHover,
  whileTap,
  ...props
}) => (
  <m.button
    whileHover={whileHover ?? { y: -1, scale: 1.01 }}
    whileTap={whileTap ?? { scale: 0.97 }}
    transition={transition ?? springTransition}
    {...props}
  >
    {children}
  </m.button>
);

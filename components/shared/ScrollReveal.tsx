"use client";

import { createElement, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

const REVEAL_DURATION = 0.5;
const REVEAL_OFFSET = 16;
const VIEWPORT_MARGIN = "-100px";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_OFFSET },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: REVEAL_DURATION, ease: "easeOut" },
  },
};

const groupVariants: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.05, staggerChildren: 0.07 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_OFFSET },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

type RevealTag = "div" | "section" | "header" | "article";
type GroupTag = "div" | "ul" | "ol" | "section";
type ItemTag = "div" | "li" | "article" | "section";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  as = "div",
  delay,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return createElement(as, { className }, children);
  }

  const Tag = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
      variants={revealVariants}
      transition={
        delay
          ? { delay, duration: REVEAL_DURATION, ease: "easeOut" }
          : undefined
      }
    >
      {children}
    </Tag>
  );
}

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  as?: GroupTag;
  ariaLabel?: string;
};

export function StaggerGroup({
  children,
  className,
  as = "div",
  ariaLabel,
}: StaggerGroupProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return createElement(
      as,
      { className, "aria-label": ariaLabel },
      children,
    );
  }

  const Tag = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;

  return (
    <Tag
      className={className}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
      variants={groupVariants}
    >
      {children}
    </Tag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: ItemTag;
};

export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return createElement(as, { className }, children);
  }

  const Tag = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;

  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  );
}

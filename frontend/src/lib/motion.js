export const easeOut = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export const slideDown = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0 },
};

export const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: delay, delayChildren: 0.05 },
  },
});

export const spring = { type: "spring", stiffness: 260, damping: 24 };

export const tween = (duration = 0.55) => ({
  duration,
  ease: easeOut,
});

export const inViewProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
};

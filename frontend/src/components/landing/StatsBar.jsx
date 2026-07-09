import { motion } from "framer-motion";
import { fadeUp, inViewProps, stagger, tween } from "@/lib/motion";

const STATS = [
  { value: "10x", label: "Faster than manual editing" },
  { value: "AI", label: "Viral moment detection" },
  { value: "1–10", label: "Clips per video" },
  { value: "24h", label: "Auto file cleanup" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-border/60 bg-secondary/30">
      <motion.div
        className="landing-container grid grid-cols-2 gap-8 py-10 md:grid-cols-4"
        {...inViewProps}
        variants={stagger(0.1)}
      >
        {STATS.map((stat) => (
          <motion.div key={stat.label} className="text-center" variants={fadeUp} transition={tween(0.45)}>
            <motion.p
              className="font-display text-3xl font-bold text-primary md:text-4xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...tween(0.5), delay: 0.1 }}
            >
              {stat.value}
            </motion.p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

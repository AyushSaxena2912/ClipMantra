import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/icons";

export default function CTA({ onGetStarted }) {
  return (
    <section className="landing-section pb-32">
      <div className="landing-container">
        <div className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/15 via-card to-card p-10 text-center md:p-16 shadow-2xl shadow-primary/5">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Ready to extract viral clips?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join creators who save hours of editing time. Paste a YouTube link
            and let AI do the rest.
          </p>
          <Button size="lg" className="mt-8 shadow-none" onClick={onGetStarted}>
            Get Started Free
            <IconArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}

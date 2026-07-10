import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What types of videos work best?",
    a: "ClipMantra works with any public YouTube video — podcasts, interviews, tutorials, vlogs, and long-form content. Videos with clear speech and engaging moments produce the best clips.",
  },
  {
    q: "How does the AI choose viral moments?",
    a: "Our automated pipeline transcribes the audio, then our proprietary AI analysis engine evaluates the transcript for hooks, emotional peaks, surprising statements, and viral patterns. Each clip gets a viral score with reasoning.",
  },
  {
    q: "What format are the clips exported in?",
    a: "Clips are exported as MP4 files, ready to upload directly to YouTube Shorts, Instagram Reels, TikTok, and other short-form platforms.",
  },
  {
    q: "How long does processing take?",
    a: "Most jobs complete in a few minutes depending on video length. You can track real-time progress on your dashboard via live updates as the pipeline moves through download, transcription, and rendering.",
  },
  {
    q: "How long are my files stored?",
    a: "Files are automatically cleaned up 24 hours after job completion to keep your data secure. Pro and Team plans offer extended retention.",
  },
  {
    q: "Can I use Google sign-in?",
    a: "Yes! ClipMantra supports both email/password authentication and Google OAuth for quick, secure sign-in.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="landing-section border-t border-border/60 bg-secondary/20">
      <div className="landing-container mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {FAQS.map((faq, i) => (
            <AccordionItem key={faq.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

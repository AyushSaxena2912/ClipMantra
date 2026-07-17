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
    a: "Our automated pipeline transcribes the audio, then our AI analysis engine evaluates the transcript for hooks, emotional peaks, surprising statements, and viral patterns. Each clip gets a viral score with reasoning.",
  },
  {
    q: "What format are the clips exported in?",
    a: "Clips are exported as MP4 files, ready to upload directly to YouTube Shorts, Instagram Reels, TikTok, and other short-form platforms.",
  },
  {
    q: "How long does processing take?",
    a: "Most jobs complete in a few minutes depending on video length. You can track real-time progress on your dashboard as the pipeline moves through download, transcription, and rendering.",
  },
  {
    q: "How long are my files stored?",
    a: "Files are automatically cleaned up 24 hours after job completion to keep your data secure.",
  },
  {
    q: "Can I use Google sign-in?",
    a: "Yes. ClipMantra supports both email/password authentication and Google OAuth for quick, secure sign-in.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="landing-faq">
      <div className="landing-container">
        <div className="landing-faq-head">
          <p className="landing-faq-eyebrow">FAQ</p>
          <h2 className="landing-faq-title">Frequently asked questions</h2>
          <p className="landing-faq-sub">
            Everything you need to know about ClipMantra — can&apos;t find an answer? Reach out anytime.
          </p>
        </div>

        <div className="landing-faq-panel">
          <Accordion type="single" collapsible className="landing-faq-accordion">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="landing-faq-item"
              >
                <AccordionTrigger className="landing-faq-trigger">
                  <span className="landing-faq-q">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="landing-faq-answer">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="landing-faq-cta">
          <div>
            <p className="landing-faq-cta-title">Still have questions?</p>
            <p className="landing-faq-cta-sub">
              We typically reply within a few hours on weekdays.
            </p>
          </div>
          <a href="#" className="landing-faq-cta-btn">
            Contact support
          </a>
        </div>
      </div>
    </section>
  );
}

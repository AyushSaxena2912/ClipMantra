import { IconCheck } from "@/components/icons";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Full access to the ClipMantra pipeline today",
    features: [
      "Up to 10 jobs per hour",
      "Up to 10 clips per job",
      "Viral score & AI hooks",
      "MP4 downloads",
      "Live job progress",
      "Email & Google sign-in",
      "24-hour file retention",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Coming soon — for creators who need more volume",
    features: [
      "Everything in Free",
      "Higher job limits",
      "Longer file retention",
      "Priority processing queue",
      "More clips per job",
      "Early access to new features",
      "Email support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Team",
    price: "$99",
    period: "/month",
    description: "Coming soon — for agencies and content teams",
    features: [
      "Everything planned for Pro",
      "Up to 5 team seats",
      "Shared job workspace",
      "API access",
      "Role-based permissions",
      "Centralized team billing",
      "Priority support",
    ],
    cta: "Get Started",
    popular: false,
  },
];

export default function Pricing({ onGetStarted }) {
  return (
    <section id="pricing" className="landing-pricing">
      <div className="landing-container">
        <div className="landing-pricing-head">
          <p className="landing-pricing-eyebrow">Pricing</p>
          <h2 className="landing-pricing-title">Simple, transparent pricing</h2>
          <p className="landing-pricing-sub">
            Start free today. Paid plans are on the way — no hidden fees.
          </p>
        </div>

        <div className="landing-pricing-grid">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`landing-pricing-card${plan.popular ? " landing-pricing-card--popular" : ""}`}
            >
              {plan.popular && (
                <span className="landing-pricing-badge">Most Popular</span>
              )}

              <div className="landing-pricing-card-top">
                <h3 className="landing-pricing-name">{plan.name}</h3>
                <p className="landing-pricing-desc">{plan.description}</p>
                <div className="landing-pricing-price">
                  <span className="landing-pricing-amount">{plan.price}</span>
                  <span className="landing-pricing-period">{plan.period}</span>
                </div>
              </div>

              <ul className="landing-pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className="landing-pricing-check" aria-hidden="true">
                      <IconCheck />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="landing-pricing-cta-wrap">
                <button
                  type="button"
                  className={`landing-pricing-cta${plan.popular ? " landing-pricing-cta--primary" : ""}`}
                  onClick={onGetStarted}
                >
                  {plan.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconCheck } from "@/components/icons";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out ClipMantra",
    features: [
      "3 jobs per month",
      "Up to 3 clips per job",
      "Viral score & AI hooks",
      "MP4 downloads",
      "24-hour file retention",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For creators who publish consistently",
    features: [
      "Unlimited jobs",
      "Up to 10 clips per job",
      "Priority processing queue",
      "Extended 7-day retention",
      "Email support",
      "Google OAuth sign-in",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Team",
    price: "$99",
    period: "/month",
    description: "For agencies and content teams",
    features: [
      "Everything in Pro",
      "5 team members",
      "Shared job dashboard",
      "API access (coming soon)",
      "Priority support",
      "Custom retention policies",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing({ onGetStarted }) {
  return (
    <section id="pricing" className="landing-section-lg">
      <div className="landing-container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Pricing
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start free, upgrade when you&apos;re ready. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col border-border/60 bg-card/50 ${
                plan.popular ? "border-primary/50 lg:mt-0" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              <CardHeader className={plan.popular ? "pt-8" : ""}>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="font-display text-4xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ul className="mb-8 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <IconCheck className="mt-0.5 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full shadow-none"
                  onClick={onGetStarted}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

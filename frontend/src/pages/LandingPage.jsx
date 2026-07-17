import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import PipelineFlow from "@/components/landing/PipelineFlow";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function LandingPage({
  onGetStarted,
  onLogin,
  onLogout,
  isLoggedIn = false,
  user = null,
}) {
  return (
    <div className="landing-page">
      <Navbar
        onGetStarted={onGetStarted}
        onLogin={onLogin}
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
        user={user}
      />
      <main>
        <Hero onGetStarted={onGetStarted} />
        <HowItWorks />
        <PipelineFlow />
        <Pricing onGetStarted={onGetStarted} />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

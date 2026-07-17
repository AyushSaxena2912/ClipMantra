import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const BRAND_LOTTIE = "/lottie/clipmantra-icon.lottie";

export default function BrandLottie({ className = "", size = 32 }) {
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <span
      className={`brand-lottie ${className}`.trim()}
      style={{ width: px, height: px }}
      aria-hidden="true"
    >
      <DotLottieReact
        src={BRAND_LOTTIE}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </span>
  );
}

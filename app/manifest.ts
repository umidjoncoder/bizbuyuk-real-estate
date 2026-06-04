import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BIZBUYUK Real Estate",
    short_name: "BIZBUYUK",
    description:
      "Your trusted partner in the Dubai property market — off-plan, investment protection, relocation.",
    start_url: "/",
    display: "standalone",
    background_color: "#08080a",
    theme_color: "#08080a",
    lang: "en",
    categories: ["business", "real estate", "finance"],
    icons: [
      { src: "/bizbuyuk-logo.png", sizes: "440x465", type: "image/png", purpose: "any" },
    ],
  };
}

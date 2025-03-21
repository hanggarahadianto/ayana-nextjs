import { NextSeo } from "next-seo";
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/home"); // Server-side redirect 301 (SEO-friendly)
  return (
    <NextSeo
      title="Perumahan Purbalingga - Ayana Group 99"
      description="Cari perumahan terbaik di Purbalingga? Ayana Group 99 menawarkan hunian nyaman dan strategis dengan harga terbaik."
      canonical="https://ayanagroup99.com"
      openGraph={{
        url: "https://ayanagroup99.com",
        siteName: "Ayana Group 99",
        images: [{ url: "https://ayanagroup99.com/images/thumbnail.jpg", width: 1200, height: 630, alt: "Perumahan Purbalingga" }],
      }}
      twitter={{ handle: "@ayanagroup99", site: "@ayanagroup99", cardType: "summary_large_image" }}
    />
  );
}

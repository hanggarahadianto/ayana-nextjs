"use client";

import { DefaultSeo } from "next-seo";

export default function Seo() {
  return (
    <DefaultSeo
      title="Perumahan Purbalingga - Ayana Group 99"
      description="Cari perumahan terbaik di Purbalingga? Ayana Group 99 menawarkan hunian nyaman dan strategis dengan harga terbaik."
      canonical="https://ayanagroup99.com"
      openGraph={
        {
          type: "website",
          locale: "id_ID",
          url: "https://ayanagroup99.com",
          siteName: "Ayana Group 99",
          title: "Perumahan Purbalingga - Ayana Group 99",
          description: "Cari perumahan terbaik di Purbalingga? Kami menawarkan berbagai pilihan rumah dengan fasilitas terbaik.",
          images: [
            {
              url: "https://ayanagroup99.com/images/thumbnail.jpg",
              alt: "Perumahan Purbalingga",
              width: 1200,
              height: 630,
            },
          ],
        } as const
      } // ✅ Pastikan objek sesuai tipe `next-seo`
    />
  );
}

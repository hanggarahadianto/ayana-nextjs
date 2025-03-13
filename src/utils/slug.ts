export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Hapus karakter selain huruf, angka, spasi, dan strip
    .replace(/\s+/g, "-") // Ganti spasi dengan "-"
    .trim();
};

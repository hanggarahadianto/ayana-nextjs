export const formatRupiah = (value: number) => {
  return `Rp ${value.toLocaleString("id-ID")}`; // Format tanpa desimal
};

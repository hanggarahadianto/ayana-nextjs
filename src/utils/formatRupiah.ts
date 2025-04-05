export const formatCurrency = (value: number) => {
  return `Rp ${value.toLocaleString("id-ID")}`; // Format tanpa desimal
};

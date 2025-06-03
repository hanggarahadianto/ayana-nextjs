// export const formatCurrency = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    signDisplay: value < 0 ? "always" : "auto",
  }).format(value);
};

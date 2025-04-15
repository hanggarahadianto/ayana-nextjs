import * as Yup from "yup";

// Validasi untuk tiap item pekerja
const workerSchema = Yup.object().shape({
  worker_name: Yup.string().required("Nama pekerja wajib diisi"),
  position: Yup.string().required("Posisi wajib diisi"),
  total_cost: Yup.number().typeError("Harga wajib berupa angka").required("Harga wajib diisi").min(1, "Harga minimal 1"),
});

// Validasi untuk tiap item material
const materialSchema = Yup.object().shape({
  material_name: Yup.string().required("Nama material wajib diisi"),
  quantity: Yup.number().typeError("Jumlah wajib berupa angka").required("Jumlah wajib diisi").min(1, "Jumlah minimal 1"),
  total_cost: Yup.number().typeError("Total biaya wajib berupa angka").required("Total biaya wajib diisi").min(1, "Biaya minimal 1"),
  unit: Yup.string().required("Satuan wajib diisi"),
  price: Yup.number().typeError("Harga satuan wajib berupa angka").required("Harga satuan wajib diisi").min(1, "Harga satuan minimal 1"),
});

export const validationSchemaWeeklyProgressCreate = Yup.object().shape({
  week_number: Yup.string().required("Minggu ke harus disi").matches(/^\d+$/, "Minggu ke harus berupa angka"),

  percentage: Yup.string()
    .required("Percentage harus diisi")
    .matches(/^\d+$/, "Percentage harus berupa angka")
    .test("min", "Percentage minimal 0", (val) => Number(val) >= 0)
    .test("max", "Percentage maksimal 100", (val) => Number(val) <= 100),

  note: Yup.string().required("Catatan harus diisi"),

  worker: Yup.array().of(workerSchema).min(1, "Minimal 1 pekerja"),

  material: Yup.array().of(materialSchema).min(1, "Minimal 1 material"),

  amount_worker: Yup.number().required("Jumlah pekerja wajib diisi").min(1, "Minimal 1 pekerja"),

  amount_material: Yup.number().required("Jumlah material wajib diisi").min(1, "Minimal 1 material"),
});

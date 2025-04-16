import * as Yup from "yup";

export const validationSchemaCashFlowCreate = Yup.object({
  week_number: Yup.string().required("Minggu ke harus diisi").matches(/^\d+$/, "Minggu ke harus berupa angka"),

  //   cash_in: Yup.number()
  //     .required("Uang masuk harus diisi")
  //     .min(0, "Uang masuk tidak boleh negatif")
  //     .typeError("Uang masuk harus berupa angka"),

  //   cash_out: Yup.number()
  //     .required("Uang keluar harus diisi")
  //     .min(0, "Uang keluar tidak boleh negatif")
  //     .typeError("Uang keluar harus berupa angka"),

  good: Yup.array()
    .of(
      Yup.object({
        good_name: Yup.string().required("Nama barang harus diisi"),

        status: Yup.string().required("Status harus diisi"),

        quantity: Yup.number().required("Kuantitas harus diisi"),
        //   .min(1, "Kuantitas harus lebih besar dari 0")
        //   .typeError("Kuantitas harus berupa angka"),

        // total_cost: Yup.number()
        //   .required("Total biaya harus diisi")
        //   .min(0, "Total biaya tidak boleh negatif")
        //   .typeError("Total biaya harus berupa angka"),
      })
    )
    .min(1, "Harus ada minimal 1 barang"),
});

export const validationSchemaCashFlowUpdate = Yup.object({
  id: Yup.string().required("ID harus diisi"),

  week_number: Yup.string().required("Minggu ke harus diisi").matches(/^\d+$/, "Minggu ke harus berupa angka"),

  cash_in: Yup.number()
    .required("Uang masuk harus diisi")
    .min(0, "Uang masuk tidak boleh negatif")
    .typeError("Uang masuk harus berupa angka"),

  cash_out: Yup.number()
    .required("Uang keluar harus diisi")
    .min(0, "Uang keluar tidak boleh negatif")
    .typeError("Uang keluar harus berupa angka"),

  good: Yup.array()
    .of(
      Yup.object({
        good_name: Yup.string().required("Nama barang harus diisi"),

        status: Yup.string().required("Status harus diisi"),

        quantity: Yup.number()
          .required("Kuantitas harus diisi")
          .min(1, "Kuantitas harus lebih besar dari 0")
          .typeError("Kuantitas harus berupa angka"),

        total_cost: Yup.number()
          .required("Total biaya harus diisi")
          .min(0, "Total biaya tidak boleh negatif")
          .typeError("Total biaya harus berupa angka"),
      })
    )
    .min(1, "Harus ada minimal 1 barang"),
});

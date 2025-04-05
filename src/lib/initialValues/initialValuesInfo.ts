import * as Yup from "yup";

export const validationSchemaInfo = Yup.object().shape({
  maps: Yup.string().required("Link maps wajib diisi"),
  start_price: Yup.string().required("Harga awal wajib diisi").matches(/^\d+$/, "Harga hanya boleh angka"),
  //   home_id: Yup.string().required("ID rumah wajib diisi"),
  near_by: Yup.array()
    .of(
      Yup.object().shape({
        // info_id: Yup.string().required("Info ID wajib diisi"),
        name: Yup.string().required("Nama tempat wajib diisi"),
        distance: Yup.string().required("Jarak wajib diisi").matches(/^\d+$/, "Jarak hanya boleh angka"),
      })
    )
    .min(1, "Minimal 1 lokasi sekitar harus diisi"),
});

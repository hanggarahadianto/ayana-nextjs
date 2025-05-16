import * as Yup from "yup";

export const validationSchemaClusterCreate = Yup.object().shape({
  name: Yup.string().required("Nama cluster wajib diisi"),
  location: Yup.string().required("Lokasi wajib diisi"),
  square: Yup.number().required("Luas wajib diisi").min(1, "Luas harus lebih dari 0"),
  price: Yup.number().required("Harga wajib diisi").min(1, "Harga harus lebih dari 0"),
  quantity: Yup.number().required("Jumlah unit wajib diisi").min(1, "Jumlah unit harus lebih dari 0"),
  status: Yup.string().oneOf(["available", "sold", "booked"], "Status tidak valid").required("Status wajib dipilih"),
  sequence: Yup.number().required("Urutan wajib diisi").min(1, "Urutan minimal 1"),
  maps: Yup.string().url("Format URL tidak valid").required("URL Maps wajib diisi"),
  near_bies: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Nama tempat wajib diisi"),
        distance: Yup.string().required("Jarak wajib diisi"),
      })
    )
    .min(1, "Minimal 1 lokasi terdekat wajib diisi"),
});

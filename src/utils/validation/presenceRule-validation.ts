import * as Yup from "yup";

export const validationSchemaPresenceRule = Yup.object().shape({
  company_id: Yup.string().uuid("ID perusahaan tidak valid").required("Wajib diisi"),
  day: Yup.string()
    // .oneOf(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "Hari tidak valid")
    .required("Hari wajib dipilih"),
  is_holiday: Yup.boolean().required("Status hari libur wajib diisi"),
  start_time: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format jam masuk harus HH:mm")
    .required("Jam masuk wajib diisi"),
  end_time: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format jam pulang harus HH:mm")
    .required("Jam pulang wajib diisi"),
  grace_period_mins: Yup.number().min(0, "Minimal 0 menit").max(60, "Maksimal 60 menit").required("Grace period wajib diisi"),
  arrival_tolerances: Yup.array().of(Yup.number().min(1).max(60).required("Isi toleransi")).required("Toleransi datang wajib diisi"),
  departure_tolerances: Yup.array().of(Yup.number().min(1).max(60).required("Isi toleransi")).required("Toleransi pulang wajib diisi"),
});

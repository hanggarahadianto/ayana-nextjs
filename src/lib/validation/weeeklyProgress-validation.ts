import * as Yup from "yup";

export const validationSchemaWeeklyProgressCreate = Yup.object({
  week_number: Yup.string().required("Minggu ke harus disi").matches(/^\d+$/, "Week number must be a number"),
  percentage: Yup.string()
    .required("Percentage harus diisi")
    .matches(/^\d+$/, "Percentage must be a valid number")
    .min(0, "Percentage cannot be less than 0")
    .max(100, "Percentage cannot be more than 100"),
  note: Yup.string().required("Catatan harus diisi"),

  amount_worker: Yup.number().required("Amount of workers is required").min(1, "At least one worker is required"),
  amount_material: Yup.number().required("Amount of material is required").min(1, "At least one material is required"),
});

export const validationSchemaWeeklyProgressUpdate = Yup.object({
  id: Yup.string().required("ID is required"),
  week_number: Yup.string().required("Week number is required").matches(/^\d+$/, "Week number must be a number"),
  percentage: Yup.string()
    .required("Percentage is required")
    .matches(/^\d+$/, "Percentage must be a valid number")
    .min(0, "Percentage cannot be less than 0")
    .max(100, "Percentage cannot be more than 100"),
  note: Yup.string().required("Catatan harus diisi"),
  amount_worker: Yup.number().required("Amount of workers is required").min(1, "At least one worker is required"),
  amount_material: Yup.number().required("Amount of material is required").min(1, "At least one material is required"),
  project_id: Yup.string().required("Project ID is required"),
});

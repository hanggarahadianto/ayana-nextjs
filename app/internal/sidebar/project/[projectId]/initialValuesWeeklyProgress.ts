// initialValueWeeklyProgress.ts

export const initialValueWeeklyProgressCreate: IWeeklyProgressCreate = {
  week_number: "",
  percentage: "",
  amount_worker: 0,
  amount_material: 0,
  note: "",
  project_id: "",
  material: [
    {
      material_name: "",
      quantity: 0,
      unit: "",
      price: 0,
      total_cost: 0,
    },
  ],
  worker: [
    {
      worker_name: "",
      position: "",
    },
  ],
};
export const initialValueWeeklyProgressUpdate: IWeeklyProgressUpdate = {
  id: "",
  week_number: "",
  percentage: "",
  amount_worker: 0,
  amount_material: 0,
  note: "",
  project_id: "",
  material: [
    {
      material_name: "",
      quantity: 0,
      unit: "",
      price: 0,
      total_cost: 0,
    },
  ],
  worker: [
    {
      worker_name: "",
      position: "",
    },
  ],
};

import * as Yup from "yup";

export const validationSchemaWeeklyProgressCreate = Yup.object({
  week_number: Yup.string().required("Minggu ke harus disi").matches(/^\d+$/, "Week number must be a number"),

  percentage: Yup.string()
    .required("Percentage harus diisi")
    .matches(/^\d+$/, "Percentage must be a valid number")
    .min(0, "Percentage cannot be less than 0")
    .max(100, "Percentage cannot be more than 100"),

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

  amount_worker: Yup.number().required("Amount of workers is required").min(1, "At least one worker is required"),
  amount_material: Yup.number().required("Amount of material is required").min(1, "At least one material is required"),
  project_id: Yup.string().required("Project ID is required"),
});

export function getInitialValuesUpdateWeeklyProgress(weeklyProgressData: IWeeklyProgressUpdate): IWeeklyProgressUpdate {
  return {
    id: weeklyProgressData?.id || "",
    week_number: weeklyProgressData?.week_number || "",
    percentage: weeklyProgressData?.percentage || "",
    amount_worker: weeklyProgressData?.amount_worker || 0,
    amount_material: weeklyProgressData?.amount_material || 0,
    note: weeklyProgressData?.note || "",
    project_id: weeklyProgressData?.project_id || "",
    material: weeklyProgressData?.material?.length
      ? weeklyProgressData.material
      : [{ material_name: "", quantity: 0, unit: "", price: 0, total_cost: 0 }],
    worker: weeklyProgressData?.worker?.length ? weeklyProgressData.worker : [{ worker_name: "", position: "" }],
  };
}

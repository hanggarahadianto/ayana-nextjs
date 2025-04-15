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
      total_cost: 0,
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
      total_cost: 0,
    },
  ],
};

import * as Yup from "yup";

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
    worker: weeklyProgressData?.worker?.length ? weeklyProgressData.worker : [{ worker_name: "", position: "", total_cost: 0 }],
  };
}

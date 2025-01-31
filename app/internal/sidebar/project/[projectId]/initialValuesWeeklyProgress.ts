// initialValueWeeklyProgress.ts

export const initialValueWeeklyProgressCreate: IWeeklyProgressCreate = {
  week_number: "",
  percentage: "0",
  amount_worker: 0,
  amount_material: 0,
  project_id: "",
  material: [
    {
      material_name: "",
      quantity: 0,
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
  percentage: "0",
  amount_worker: 0,
  amount_material: 0,
  project_id: "",
  material: [
    {
      material_name: "",
      quantity: 0,
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

// initialValueWeeklyProgress.ts

export const initialValueWeeklyProgress: IWeeklyProgress = {
  id: "",
  week_number: "",
  percentage: "0",
  amount_worker: 0,
  amount_material: 0,
  project_id: "",
  material: [
    {
      id: "",
      material_name: "",
      quantity: 0,
      total_cost: 0,
      weekly_progress_id: "",
      created_at: "",
      updated_at: "",
    },
  ],
  worker: [
    {
      id: "",
      worker_name: "",
      position: "",
      weekly_progress_id: "",
      created_at: "",
      updated_at: "",
    },
  ],
  created_at: "",
  updated_at: "",
};

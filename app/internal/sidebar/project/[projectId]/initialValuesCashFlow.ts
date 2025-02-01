// initialValueWeeklyProgress.ts
export const initialValuesCashFlowCreate: ICashFlowCreate = {
  week_number: "",
  cash_in: 0,
  cash_out: 0,
  outstanding: 0,
  project_id: "", // Assuming this will be set dynamically
  good: [
    {
      good_name: "",
      status: "",
      quantity: 0,
      good_purchase_date: "",
      good_settlement_date: "",
      total_cost: 0,
    },
  ], // One initial empty good
};

export const initialValuesCashFlowUpdate: ICashFlowUpdate = {
  id: "",
  week_number: "",
  cash_in: 0,
  cash_out: 0,
  outstanding: 0,
  project_id: "",
  good: [], // Empty array for goods
};

// initialValueWeeklyProgress.ts

export const initialValuesCashFlowCreate: ICashFlowCreate = {
  week_number: "",
  cash_in: 0,
  cash_out: 0,
  outstanding: 0,
  project_id: "",
  good: [], // Empty array for goods, as it's optional
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

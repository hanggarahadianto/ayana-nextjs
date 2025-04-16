export const initialValuesCashFlowCreate = (projectId: string): ICashFlowCreate => ({
  week_number: "",
  cash_in: 0,
  cash_out: 0,

  project_id: projectId, // Dynamically set project ID
  good: [
    {
      good_name: "",
      status: "tunai",
      quantity: 0,
      costs_due: 0,
      unit: "",
      total_cost: 0,
      price: 0,
      cash_flow_id: "",
    },
  ],
});

export const initialValuesCashFlowUpdate: ICashFlowUpdate = {
  id: "",
  week_number: "",
  cash_in: 0,
  cash_out: 0,
};

export function getInitialValuesCashFlow(cashFlowData: ICashFlowUpdate): ICashFlowUpdate {
  return {
    id: cashFlowData?.id || "",
    week_number: cashFlowData?.week_number || "",
    cash_in: cashFlowData?.cash_in || 0,
    cash_out: cashFlowData?.cash_out || 0,

    good: cashFlowData?.good?.length
      ? cashFlowData.good
      : [
          {
            // UUID should be empty as fallback
            good_name: "",
            status: "", // Ensure it's a string
            unit: "",
            price: 0,
            quantity: 0,
            costs_due: 0,
            total_cost: 0,
            cash_flow_id: "", // Added missing required field
          },
        ],
  };
}

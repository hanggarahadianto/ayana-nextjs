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
    },
  ], // One initial empty good
});

export const initialValuesCashFlowUpdate: ICashFlowUpdate = {
  id: "",
  week_number: "",
  cash_in: 0,
  cash_out: 0,
  // good: [
  //   {
  //     good_name: "",
  //     status: "",
  //     quantity: 0,
  //     costs_due: 0,
  //     unit: "",

  //     total_cost: 0,
  //     price: 0,
  //   },
  // ],
};

import * as Yup from "yup";

export const validationSchemaCashFlowCreate = Yup.object({
  week_number: Yup.string().required("Minggu ke harus diisi").matches(/^\d+$/, "Week number must be a number"),

  cash_in: Yup.number().required("Cash in is required").min(0, "Cash in cannot be negative"),

  cash_out: Yup.number().required("Cash out is required").min(0, "Cash out cannot be negative"),

  // good: Yup.array()
  //   .of(
  //     Yup.object({
  //       good_name: Yup.string().required("Good name is required"),

  //       status: Yup.string().required("Status is required"),

  //       quantity: Yup.number().required("Quantity is required").min(1, "Quantity must be greater than 0"),

  //       total_cost: Yup.number().required("Total cost is required").min(0, "Total cost cannot be negative"),
  //     })
  //   )
  //   .min(1, "At least one good is required"),
});

export const validationSchemaCashFlowUpdate = Yup.object({
  id: Yup.string().required("ID is required"),

  week_number: Yup.string().required("Week number is required").matches(/^\d+$/, "Week number must be a number"),

  cash_in: Yup.number().required("Cash in is required").min(0, "Cash in cannot be negative"),

  cash_out: Yup.number().required("Cash out is required").min(0, "Cash out cannot be negative"),

  // good: Yup.array().of(
  //   Yup.object({
  //     good_name: Yup.string().required("Good name is required"),

  //     status: Yup.string().required("Status is required"),

  //     quantity: Yup.number().required("Quantity is required").min(1, "Quantity must be greater than 0"),

  //     total_cost: Yup.number().required("Total cost is required").min(0, "Total cost cannot be negative"),
  //   })
  // ),
});

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
            costs_due: 0, // This field was missing in the fallback
            total_cost: 0,
          },
        ],
  };
}

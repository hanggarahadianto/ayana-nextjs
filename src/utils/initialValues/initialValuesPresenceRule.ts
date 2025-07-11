// sesuaikan path-nya

// Untuk create
export const initialValuePresenceRuleCreate = (company_id: string): IPresenceRuleCreate => ({
  day: "",
  is_holiday: false,
  start_time: "07:00",
  end_time: "16:00",
  grace_period_mins: 5,
  arrival_tolerances: [],
  departure_tolerances: [],
  company_id: company_id,
});

// Untuk update
export const getInitialValuesPresenceRuleUpdate = (company_id: string, data?: Partial<IPresenceRuleUpdate>): IPresenceRuleUpdate => ({
  id: data?.id || "",
  day: data?.day || "",
  is_holiday: data?.is_holiday ?? false,
  start_time: data?.start_time || "07:00",
  end_time: data?.end_time || "16:00",
  grace_period_mins: data?.grace_period_mins ?? 5,
  arrival_tolerances: data?.arrival_tolerances ?? [],
  departure_tolerances: data?.departure_tolerances ?? [],
  company_id: company_id,
});

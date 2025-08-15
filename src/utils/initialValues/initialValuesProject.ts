export const getInitialValuesCreateProject = (companyId?: string) => ({
  location: "",
  type: "",
  unit: "",
  project_leader: "",
  investor: "",
  project_time: "",
  total_cost: 0,
  project_start: "",
  project_end: "",
  note: "",
  project_status: "ready", // ✅ default langsung ready
  company_id: companyId ?? "", // ✅ fallback ke string kosong
});

export const getInitialValuesUpdateProject = (initialData?: IProjectUpdate, companyId?: string) => ({
  id: initialData?.id || "",
  location: initialData?.location || "",
  type: initialData?.type || "",
  unit: initialData?.unit || "",
  project_leader: initialData?.project_leader || "",
  investor: initialData?.investor || "",
  project_time: initialData?.project_time || "",
  total_cost: initialData?.total_cost || 0,
  project_start: initialData?.project_start ? new Date(initialData.project_start) : null,
  project_end: initialData?.project_end ? new Date(initialData.project_end) : null,
  project_status: initialData?.project_status || "",
  note: initialData?.note || "",
  company_id: initialData?.company_id || companyId || "", // fallback ke props
});

interface IAccount {
  id: string;
  code: number;
  name: string;
  type: string;
  category: string;
  description: string;
  company_id: string;
}

interface IAccountCreate {
  code: number;
  name: string;
  type: string;
  category: string;
  description: string;
  company_id: string;
}

// ICashFlowUpdate.ts
interface IAccountUpdate {
  id: string;
  code: number;
  name: string;
  type: string;
  category: string;
  description: string;
  company_id: string;
}

interface IAccountResponse {
  data: IAccount[];
  status: string;
  limit?: number; // Optional jika tidak selalu ada
  page?: number; // Optional jika tidak selalu ada
  total?: number; // Optional jika tidak selalu ada
}

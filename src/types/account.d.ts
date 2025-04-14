interface IAccount {
  id: string;
  code: string;
  name: string;
  type: string;
  category: string;
  description: string;
  company_id: string;
}

interface IAccountCreate {
  code: string;
  name: string;
  type: string;
  category: string;
  description: string;
  company_id: string;
}

// ICashFlowUpdate.ts
interface IAccountUpdate {
  code: string;
  name: string;
  type: string;
  category: string;
  description: string;
  company_id: string;
}

interface IAccountResponse {
  data: IAccount[];
  status: string;
}

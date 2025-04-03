interface IWorker {
  id: string;
  worker_name: string;
  position: string;
  total_cost: number;
}

interface IWorkerCreate {
  worker_name: string;
  position: string;
  total_cost: number;
}

interface IWorkerUpdate {
  id: string;
  worker_name: string;
  position: string;
  total_cost: number;
}

interface IFormErrors {
  worker: IWorkerCreate[];
}

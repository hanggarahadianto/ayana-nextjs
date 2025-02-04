interface IWorker {
  id: string;
  worker_name: string;
  position: string;
}

interface IWorkerCreate {
  worker_name: string;
  position: string;
}

interface IWorkerUpdate {
  id: string;
  worker_name: string;
  position: string;
}

interface IFormErrors {
  worker: IWorkerCreate[];
}

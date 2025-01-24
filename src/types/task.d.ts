interface Task {
  name: string;
  status: string;
}

interface ITask {
  name: string;
  division: string;
  task: Task[];
}

interface TaskResponse {
  data: ITask[];
  status: string;
}

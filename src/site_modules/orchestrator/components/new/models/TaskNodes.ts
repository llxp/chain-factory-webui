import RegisteredTask from "./RegisteredTask";

export default interface NodeTasks {
  task: RegisteredTask;
  node_names: string[];
  namespace: string;
};
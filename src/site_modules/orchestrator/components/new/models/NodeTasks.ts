import RegisteredTask from "./RegisteredTask";

export default interface NodeTasks {
  node_name: string;
  namespace: string;
  tasks: RegisteredTask;
};
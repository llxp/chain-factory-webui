import Task from "./Task";

export default interface TaskWorkflowAssociation {
  _id: string;
  task: Task;
  workflow_id: string;
  node_name: string;
};
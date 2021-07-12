export default interface Task {
  name: string;
  arguments: Map<string, string>;
  received_date: string;
  parent_task_id?: string;
  workflow_id: string;
  task_id: string;
  node_names: string[];
  tags?: string[];
  reject_counter: number;
  planned_date?: string;
}
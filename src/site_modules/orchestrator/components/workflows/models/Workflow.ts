import Task from './Task';

export default interface Workflow {
  _id: string;
  created_date: string;
  workflow_id: string;
  node_name: string;
  tasks: Array<Task>;
  tags?: string[];
  namespace: string;
};
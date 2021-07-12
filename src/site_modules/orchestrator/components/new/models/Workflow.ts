export default interface Workflow {
  _id: string;
  created_date: string;
  workflow_id: string;
  node_name: string;
  tags?: string[];
};
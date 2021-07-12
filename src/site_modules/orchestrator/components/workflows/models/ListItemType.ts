import Task from './Task';
export interface ListItemType {
  data: {'created_date': string, 'entry_task': string, 'tags': Array<string>, 'workflow_id': string };
  tasks: Array<Task>,
  workflow_id: string;
  namespace: string;
}

export default ListItemType;
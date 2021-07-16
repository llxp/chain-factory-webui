import ListItemType from '../../models/ListItemType';
import Task from '../../models/Task';

const userLang = navigator.language;

var options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
};

export default function workflowsToListItemType(workflow_id: string, createdDate: string, tasks: Array<Task>, tags: Array<string>, namespace: string, workflowStatus: string): ListItemType {
  return {
    data: {
      'created_date': new Date(createdDate).toLocaleString(userLang, options),
      'tags': tags,
      'entry_task': tasks.length > 0 ? tasks[0]?.name : "",
      'workflow_id': workflow_id,
      'status': workflowStatus,
    },
    tasks: tasks,
    workflow_id: workflow_id,
    namespace: namespace
  };
}
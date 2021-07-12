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

export default function workflowsToListItemType(workflow_id: string, created_date: string, tasks: Array<Task>, tags: Array<string>, namespace: string): ListItemType {
  return {
    data: { 'created_date': new Date(created_date).toLocaleString(userLang, options), 'tags': tags, 'entry_task': tasks.length > 0 ? tasks[0]?.name : "", 'workflow_id': workflow_id},
    tasks: tasks,
    workflow_id: workflow_id,
    namespace: namespace
  };
}
import ListItemType from '../../models/ListItemType';
import RegisteredTask from '../../models/RegisteredTask';
export default function tasksToListItemType(task: RegisteredTask, nodeNames: string[], namespace: string): ListItemType {
  return {
    data: { name: task.name },
    arguments: task.arguments,
    nodeNames: nodeNames,
    task: task,
    namespace: namespace
  };
}
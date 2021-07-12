import RegisteredTask from './RegisteredTask';
export interface ListItemType {
  data: {'name': string};
  arguments: Map<string, string>;
  nodeNames: string[];
  task: RegisteredTask;
  namespace: string;
}

export default ListItemType;
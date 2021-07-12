import NodeTasks from "./NodeTasks";

export default interface PagedNodeTasks {
    total_count: number;
    node_tasks: Array<NodeTasks>;
};
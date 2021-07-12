import TaskNodes from "./TaskNodes";

export default interface PagedTaskNodes {
    total_count: number;
    task_nodes: Array<TaskNodes>;
};
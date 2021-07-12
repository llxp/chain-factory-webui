import Task from "./Task";

export default interface PagedWorkflows {
    total_count: number;
    tasks: Array<Task>;
    count: number;
};
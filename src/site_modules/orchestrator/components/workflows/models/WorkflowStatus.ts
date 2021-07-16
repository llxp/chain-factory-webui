import TaskStatus from "./TaskStatus";

export default interface WorkflowStatus {
    status: string;
    tasks: Array<TaskStatus>;
    workflow_id: string;
};
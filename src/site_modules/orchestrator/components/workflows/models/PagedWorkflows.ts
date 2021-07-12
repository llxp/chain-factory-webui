import Workflow from "./Workflow";

export default interface PagedWorkflows {
    total_count: number;
    workflows: Array<Workflow>;
    count: number;
};
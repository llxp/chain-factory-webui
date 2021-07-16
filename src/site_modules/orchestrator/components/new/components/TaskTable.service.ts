import { ThunkAction } from "@reduxjs/toolkit";
import { environment } from "../../core/environment";
import { RootState, store } from '../../../../../store';
import FitchCredentialsWrapper from '../../../wrappers/FitchCredentialsWrapper';
import { signOutAsync } from '../../../../../core_modules/signin/components/signin/SignInSlice';
import PagedNodeTasks from "../models/PagedNodeTasks";
import PagedTaskNodes from "../models/PagedTaskNodes";
import TaskNodes from "../models/TaskNodes";
import thunkTemplate from "../../../../../shared_utils/ThunkTemplate";

const redirectCallback: { (): void } = () => {
  store.dispatch(signOutAsync());
};
const apiService: FitchCredentialsWrapper = new FitchCredentialsWrapper(environment.apiEndpoint, redirectCallback);

export function getAvailableTasks(namespace: string, page: number, rowsPerPage: number, searchTerm: string): ThunkAction<Promise<PagedTaskNodes>, RootState, undefined, any> {
  return thunkTemplate((token: string) => {
    return apiService.get<PagedNodeTasks>(
      `/api/orchestrator/active_tasks?namespace=${namespace}&search=${searchTerm}&page=${page}&page_size=${rowsPerPage}`,
      token
    )
    .then(async (data: PagedNodeTasks) => {
      const taskNodes: Array<TaskNodes> = [];
      for (const nodeTasks of data.node_tasks) {
        const result = taskNodes.find(element => element.task.name === nodeTasks.tasks.name && element.namespace === nodeTasks.namespace);
        if (result) {
          result.node_names.push(nodeTasks.node_name);
        } else {
          taskNodes.push({ task: nodeTasks.tasks, node_names: [nodeTasks.node_name], namespace: nodeTasks.namespace });
        }
      }
      return {task_nodes: taskNodes, total_count: data.total_count};
    },
    () => {
      console.log('error');
      return Promise.reject({});
    });
  }, () => new Promise(() => {}));
}

export interface StartTaskResponse {
  status: string;
}

export function startTask(namespace, node, task, taskArguments, tags): ThunkAction<Promise<StartTaskResponse>, RootState, undefined, any> {
  return thunkTemplate((token: string) => {
    //console.log(namespace, node, task, taskArguments, tags);
    return apiService.post<StartTaskResponse>(`/api/orchestrator/new_task?namespace=${namespace}&node_name=${node}&task=${task}`, {'arguments': taskArguments, 'tags': tags}, token).then((data: StartTaskResponse) => {
      console.log(data);
    });
  }, new Promise<StartTaskResponse>(() => { return { status: 'error' }}));
}

// export function requestAccess(resource: Resource, selectedDuration: string): ThunkAction<Promise<RequestAccessResponse>, RootState, undefined, any> {
//   return thunkTemplate((token: string) => {
//     const requestAccessResource: RequestAccessResource = {
//       resource: resource.name,
//       path: resource.path,
//       config: resource.config,
//       selected_duration: selectedDuration
//     };
//     return apiService.post<RequestAccessResponse>('/api/access/request/request_access', requestAccessResource, token).then((data: RequestAccessResponse) => {
//       return data;
//     }, () => { return { id: 0, status: 'error' }; });
//   }, new Promise<RequestAccessResponse>(() => { return { id: 0, status: 'error' }}));
// }

/*export function revokeResources(request_id: number): ThunkAction<Promise<string>, RootState, undefined, any> {
  return thunkTemplate((token: string) => {
      return apiService.post<RevokeResourcesResponse>('/api/access/request/revoke_access', { 'request_id': request_id}, token).then((data: RevokeResourcesResponse) => {
        return data.status;
      }, () => {
        return '';
      });
    }, StringPromise('error'));
}*/

// export function revokeRequest(request_id: number): ThunkAction<Promise<string>, RootState, undefined, any> {
//   return thunkTemplate((token: string) => {
//       return apiService.post<RevokeResourcesResponse>('/api/access/revoke/' + request_id, {}, token).then((data: RevokeResourcesResponse) => {
//         return data.status;
//       }, () => {
//         return '';
//       });
//   }, StringPromise('error'));
// }
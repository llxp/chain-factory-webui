import { ThunkAction } from "@reduxjs/toolkit";
import { environment } from "../../core/environment";
import { RootState, store } from "../../../../../store";
import FitchCredentialsWrapper from "../../../wrappers/FitchCredentialsWrapper";
import { signOutAsync } from "../../../../../core_modules/signin/components/signin/SignInSlice";
import PagedWorkflows from "../models/PagedWorkflows";
import thunkTemplate from "../../../../../shared_utils/ThunkTemplate";
import PagedTaskLogs from "../models/PagedTaskLogs";
import PagedWorkflowTasks from "../models/PagedWorkflowTasks";
import WorkflowStatus from "../models/WorkflowStatus";

const redirectCallback: { (): void } = () => {
  store.dispatch(signOutAsync());
};
const apiService: FitchCredentialsWrapper = new FitchCredentialsWrapper(
  environment.apiEndpoint,
  redirectCallback
);

export function getWorkflows(
  namespace: string,
  page: number,
  rowsPerPage: number,
  searchTerm: string
): ThunkAction<Promise<PagedWorkflows>, RootState, undefined, any> {
  return thunkTemplate(
    (token: string) => {
      return apiService.get<PagedWorkflows>(
          `/api/orchestrator/workflows?namespace=${namespace}&search=${searchTerm}&page=${page}&page_size=${rowsPerPage}`,
          token
        ).then(
          async (data: PagedWorkflows) => {
            return data;
          },
          () => {
            console.log("error");
            return Promise.reject({});
          }
        );
    },
    () => new Promise(() => {})
  );
}

export function getTaskLogs(
  namespace: string,
  page: number,
  rowsPerPage: number,
  searchTerm: string,
  task_id: string
): ThunkAction<Promise<PagedTaskLogs>, RootState, undefined, any> {
  return thunkTemplate(
    (token: string) => {
      return apiService.get<PagedTaskLogs>(
          `/api/orchestrator/task_logs?namespace=${namespace}&search=${searchTerm}&page=${page}&page_size=${rowsPerPage}&task_id=${task_id}`,
          token
        ).then(
          async (data: PagedTaskLogs) => {
            return data;
          },
          () => {
            console.log("error");
            return Promise.reject({});
          }
        );
    },
    () => new Promise(() => {})
  );
}

export function getWorkflowTasks(
  namespace: string,
  page: number,
  rowsPerPage: number,
  searchTerm: string,
  workflow_id: string
): ThunkAction<Promise<PagedWorkflowTasks>, RootState, undefined, any> {
  return thunkTemplate(
    (token: string) => {
      return apiService.get<PagedWorkflowTasks>(
          `/api/orchestrator/workflow_tasks?namespace=${namespace}&search=${searchTerm}&page=${page}&page_size=${rowsPerPage}&workflow_id=${workflow_id}`,
          token
        ).then(
          async (data: PagedWorkflowTasks) => {
            return data;
          },
          () => {
            console.log("error");
            return Promise.reject({});
          }
        );
    },
    () => new Promise(() => {})
  );
}

export function getWorkflowStatus(
  namespace: string,
  workflow_id: string
): ThunkAction<Promise<WorkflowStatus>, RootState, undefined, any> {
  return thunkTemplate(
    (token: string) => {
      return apiService.get<WorkflowStatus>(
          `/api/orchestrator/workflow_status?namespace=${namespace}&workflow_id=${workflow_id}`,
          token
        ).then(
          async (data: WorkflowStatus) => {
            return data;
          },
          () => {
            console.log("error");
            return Promise.reject({});
          }
        );
    },
    () => new Promise(() => {})
  );
}

export interface StopWorkflowResponse {
  status: string;
}

export function stopWorkflow(
  namespace: string,
  workflow_id: string
): ThunkAction<Promise<StopWorkflowResponse>, RootState, undefined, any> {
  return thunkTemplate(
    (token: string) => {
      return apiService
        .post<StopWorkflowResponse>(
          "/api/orchestrator/stop_workflow?namespace=" +
            namespace +
            "&workflow_id=" +
            workflow_id,
          {},
          token
        )
        .then((data: StopWorkflowResponse) => {
          console.log(data);
        });
    },
    new Promise<StopWorkflowResponse>(() => {
      return { status: "error" };
    })
  );
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

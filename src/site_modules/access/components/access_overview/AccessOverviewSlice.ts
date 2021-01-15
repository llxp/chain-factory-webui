import { FitchCredentialsWrapper } from './../../wrappers/FitchCredentialsWrapper';
import { environment } from "../core/environment";
import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../../store";
import { ApprovableResource } from './models/ApprovableResource';

// State definition
interface RequestAccessSlice {
  assignedResources: Array<ApprovableResource>;
  assignedResourcesStatus: string;
  globalResources: Array<ApprovableResource>;
}

// Initial state
const initialState: RequestAccessSlice = {
  assignedResources: new Array<ApprovableResource>(),
  assignedResourcesStatus: '',
  globalResources: new Array<ApprovableResource>()
};

// Slice Definition
export const accessOverviewSlice = createSlice({
  name: "accessOverview",
  initialState,
  reducers: {
    setAssignedResources: (state, action: PayloadAction<Array<ApprovableResource>>) => {
      state.assignedResources = action.payload;
    },
    setAssignedResourcesStatus: (state, action: PayloadAction<string>) => {
      state.assignedResourcesStatus = action.payload;
    },
    setGlobalResources: (state, action: PayloadAction<Array<ApprovableResource>>) => {
      state.globalResources = action.payload;
    }
  },
});

// export reducers
export const { setAssignedResources, setAssignedResourcesStatus, setGlobalResources } = accessOverviewSlice.actions;

const apiService: FitchCredentialsWrapper = new FitchCredentialsWrapper(environment.apiEndpoint);

export function getAssignedResources(): ThunkAction<Promise<boolean>, RootState, undefined, any> {
  return (dispatch, getState) => {
    if (getState().signin.loggedIn) {
      const token = getState().signin.token;
      const scopesStatus = getState().requestAccess.scopesStatus;
      //if (scopesStatus !== 'loading') {
        //dispatch(setAssignedResourcesStatus('loading'));
        return apiService.get<Array<ApprovableResource>>('/api/access/request/access_status', token).then((data: Array<ApprovableResource>) => {
          console.log(data);
          dispatch(setAssignedResources(data));
          //dispatch(setAssignedResourcesStatus('finished'));
          return true;
        }, () => {
          console.log('rejected');
          dispatch(setAssignedResources([]));
          //dispatch(setAssignedResourcesStatus('finished'));
          return false;
        });
      //}
    }
    return new Promise<boolean>(() => false);
  }
}

export function getGlobalResources(): ThunkAction<Promise<boolean>, RootState, undefined, any> {
  return (dispatch, getState) => {
    if (getState().signin.loggedIn) {
      const token = getState().signin.token;
      const scopesStatus = getState().requestAccess.scopesStatus;
      return apiService.get<Array<ApprovableResource>>('/api/access/request/global_access_status', token).then((data: Array<ApprovableResource>) => {
        console.log(data);
        dispatch(setGlobalResources(data));
        return true;
      }, () => {
        console.log('rejected');
        dispatch(setGlobalResources([]));
        return false;
      });
    }
    return new Promise<boolean>(() => false);
  }
}

interface RevokeResourcesResponse {
  id: number;
  status: string;
}

export function revokeResources(request_id: number): ThunkAction<Promise<string>, RootState, undefined, any> {
  return (dispatch, getState) => {
    console.log('revokeResources');
    if (getState().signin.loggedIn) {
      const token = getState().signin.token;
      return apiService.post<RevokeResourcesResponse>('/api/access/request/revoke_access', { 'request_id': request_id}, token).then((data: RevokeResourcesResponse) => {
        return data.status;
      }, () => {
        return '';
      });
    }
    return new Promise<string>(() => 'error');
  }
}

export function revokeRequest(request_id: number): ThunkAction<Promise<string>, RootState, undefined, any> {
  return (dispatch, getState) => {
    console.log('revokeRequest');
    if (getState().signin.loggedIn) {
      const token = getState().signin.token;
      return apiService.post<RevokeResourcesResponse>('/api/access/request/revoke_request', { 'request_id': request_id}, token).then((data: RevokeResourcesResponse) => {
        return data.status;
      }, () => {
        return '';
      });
    }
    return new Promise<string>(() => 'error');
  }
}

interface TranslateUsersResponse {
  object_sid: string;
  username: string;
}

export function translateUsers(global: boolean): AppThunk {
  return (dispatch, getState) => {
    const currentState = getState();
    if (currentState.signin.loggedIn) {
      const token = currentState.signin.token;
      const userIds: Array<string> = new Array<string>();
      const resources = global ? currentState.accessOverview.globalResources : currentState.accessOverview.assignedResources;
      for (const resource of resources) {
        const requestor = resource.requestor;
        if (userIds.indexOf(requestor) === -1) {
          userIds.push(requestor);
        }
      }
      return apiService.post<Array<TranslateUsersResponse>>('/api/login/translate_users', { 'object_sids': userIds }, token).then((data: Array<TranslateUsersResponse>) => {
        const resourcesCopy: Array<ApprovableResource> = new Array<ApprovableResource>();
        const resources = global ? currentState.accessOverview.globalResources : currentState.accessOverview.assignedResources;
        for (let resource of resources) {
          const obj = data.filter((value) => value.object_sid === resource.requestor);
          const resourceCopy = {...resource};
          resourceCopy.requestor = obj ? obj[0].username : resource.requestor;
          resourcesCopy.push(resourceCopy);
        }
        if (global) {
          dispatch(setGlobalResources(resourcesCopy));
        } else {
          dispatch(setAssignedResources(resourcesCopy));
        }
      });
    }
  }
}

export const selectAssignedResources = (state: RootState) => state.accessOverview.assignedResources;
export const selectAssignedResourcesStatus = (state: RootState) => state.accessOverview.assignedResourcesStatus;
export const selectGlobalResources = (state: RootState) => state.accessOverview.globalResources;

export const AccessOverviewSlice = accessOverviewSlice.reducer;

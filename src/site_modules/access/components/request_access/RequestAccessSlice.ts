import { Scope } from './models/Scope';
import { FitchCredentialsWrapper } from './../../wrappers/FitchCredentialsWrapper';
import { Resource } from './models/Resource';
import { environment } from "../core/environment";
import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../../store";

// State definition
interface RequestAccessSlice {
  scopes: Array<Scope>;
  scopesStatus: string;
  resources: Array<Resource>;
  resourcesStatus: string;
  requestAccessStatus: { [id: string]: string };
}

// Initial state
const initialState: RequestAccessSlice = {
  scopes: new Array<Scope>(),
  scopesStatus: '',
  resources: new Array<Resource>(),
  resourcesStatus: '',
  requestAccessStatus: { '': '' }
};

// Slice Definition
export const requestAccessSlice = createSlice({
  name: "requestAccess",
  initialState,
  reducers: {
    setScopes: (state, action: PayloadAction<Array<Scope>>) => {
      state.scopes = action.payload;
    },
    setScopesStatus: (state, action: PayloadAction<string>) => {
      state.scopesStatus = action.payload;
    },
    setResources: (state, action: PayloadAction<Array<Resource>>) => {
      state.resources = action.payload;
    },
    setResourcesStatus: (state, action: PayloadAction<string>) => {
      state.resourcesStatus = action.payload;
    }
  },
});

// export reducers
export const { setScopes, setScopesStatus, setResources, setResourcesStatus } = requestAccessSlice.actions;

const apiService: FitchCredentialsWrapper = new FitchCredentialsWrapper(environment.apiEndpoint);

  // static member function as thunk action
export function getScopes(): AppThunk {
  return (dispatch, getState) => {
    if (getState().signin.loggedIn) {
      const token = getState().signin.token;
      console.log(token);
      console.log(getState().signin.loggedIn);
      const scopesStatus = getState().requestAccess.scopesStatus;
      if (scopesStatus !== 'loading') {
        dispatch(setScopesStatus('loading'));
        apiService.get<Array<Scope>>('/api/access/scope/get_scopes', token).then((data: Array<Scope>) => {
          console.log(data);
          dispatch(setScopes(data));
          dispatch(setScopesStatus('finished'));
        }, () => {
          console.log('rejected');
          dispatch(setScopes([]));
          dispatch(setScopesStatus('finished'));
        });
      }
    }
  }
}

export function getResources(scopePath: string): AppThunk {
  return (dispatch, getState) => {
    if (getState().signin.loggedIn) {
      const token = getState().signin.token;
      console.log('getResources');
      console.log(scopePath);
      const resourcesStatus = getState().requestAccess.resourcesStatus;
      if (resourcesStatus !== 'loading') {
        dispatch(setResourcesStatus('loading'));
        apiService.get<Array<Resource>>('/api/access/resource/get_resources?path=' + scopePath, token).then((data: Array<Resource>) => {
          dispatch(setResources(data));
          dispatch(setResourcesStatus('finished'));
        }, () => {
          dispatch(setResources([]));
          dispatch(setResourcesStatus('error'));
        });
      }
    }
  }
}

interface RequestAccessResource {
  config: string;
  resource: string;
  path: string;
  selected_duration: string;
}

export interface RequestAccessResponse {
  id: number;
  status: string;
}

export function requestAccess(resource: Resource, selectedDuration: string): ThunkAction<Promise<RequestAccessResponse>, RootState, undefined, any> {
  return (dispatch, getState) => {
    console.log('requestAccess');
    if (getState().signin.loggedIn) {
      const token = getState().signin.token;
      let requestAccessStatus = getState().requestAccess.requestAccessStatus;
      console.log(getState());
      if (!requestAccessStatus[resource.name] || requestAccessStatus[resource.name] !== 'loading') {
        console.log(getState());
        const requestAccessResource: RequestAccessResource = {
          resource: resource.name,
          path: resource.path,
          config: resource.config,
          selected_duration: selectedDuration
        };
        return apiService.post<RequestAccessResponse>('/api/access/request/request_access', requestAccessResource, token).then((data: RequestAccessResponse) => {
          return data;
        }, () => {
          return { id: 0, status: 'error' };
        });
      }
    }
    return new Promise<RequestAccessResponse>(() => { return { id: 0, status: 'error' };});
  }
}

export const selectScopes = (state: RootState) => state.requestAccess.scopes;
export const selectScopesStatus = (state: RootState) => state.requestAccess.scopesStatus;
export const selectResources = (state: RootState) => state.requestAccess.resources;
export const selectResourcesStatus = (state: RootState) => state.requestAccess.resourcesStatus;

export const RequestAccessSlice = requestAccessSlice.reducer;

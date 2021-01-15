import { Resource } from './../../request_access/models/Resource';

export interface GrantedResource {
  approved_resource_id: number;
  enabled: boolean;
  granted_date: string;
  id: number;
};

export interface ApprovedResource {
  approvable_resource_id: number;
  approve_date: string;
  approver: string;
  id: number;
  granted_resource: GrantedResource;
}

export interface ApprovableResource {
  enabled: boolean;
  id: number;
  request_date: string;
  requestor: string;
  resource: Resource;
  resource_id: number;
  selected_duration: string;
  approved_resources: ApprovedResource;
};

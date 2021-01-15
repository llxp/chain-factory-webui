export interface ApproverConfig {
  approver_type: string;
  name: string;
}

export interface LDAPConfig {
  id: number;
  ldap_action: string;
  ldap_group: string;
  ldap_host: string;
  ldap_revoke_action: string;
  policy_id: number;
}

export interface NotificationConfig {
  contact: string;
  method: string;
}

export interface RequestorConfig {
  name: string;
  requestor_type: string;
}

export interface VaultConfig {
  secrets_engine_path: string;
  vault_host: string;
}

export interface AccessConfig {
  approver_config: Array<ApproverConfig>;
  enabled: boolean;
  ldap_config: Array<LDAPConfig>;
  max_duration: string;
  name: string;
  notification_config: Array<NotificationConfig>;
  requestor_config: Array<RequestorConfig>;
  requires_approval: boolean;
  self_approval_allowed: boolean;
  vault_config: Array<VaultConfig>;
}

export interface Scope {
  path: string;
  display_name: string;
  id?: number;
  parent_scope_id: number;
  children?: Array<Scope>;
}

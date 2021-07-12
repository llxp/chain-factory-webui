import { RouteComponentProps } from "react-router";

export enum Position {
  Left = 1,
  Center
}

export interface MenuItem {
  text?: string;
  path?: string;
  element?:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  menuItems?: Array<MenuItem>;
  position?: Position;
  customElement?:
  | React.ComponentType<RouteComponentProps<any>>
  | React.ComponentType<any>;
  roles?: Array<string>;
}

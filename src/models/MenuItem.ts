import { Component } from "react";
import { RouteComponentProps } from "react-router";

export interface MenuItem {
  text: string;
  path: string;
  element:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  menuItems?: Array<MenuItem>;
  roles?: Array<string>;
}

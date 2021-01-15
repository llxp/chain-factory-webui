import { MenuItem } from "../models/MenuItem";
import { ReducerMap as ReducerMapAccess, Access, routes as accessRoutes } from "./access";
import { ReducerMap as ReducerMapOrchestrator, Orchestrator, routes as orchestratorRoutes } from "./orchestrator";

export const ReducerMap = {
  ...ReducerMapAccess,
  ...ReducerMapOrchestrator
};

export const modules: Array<MenuItem> = [
  {
    text: "Give Me Access",
    path: "/access/",
    element: Access,
    menuItems: accessRoutes
  },
  {
    text: "Orchestrator",
    path: "/orchestrator",
    element: Orchestrator,
    menuItems: orchestratorRoutes
  }

  // the modules mentioned here are used
  // to load the sites in the menu in the
  // upper left corner of the page
];

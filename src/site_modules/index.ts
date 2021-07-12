import { lazy } from 'react';
import { MenuItem } from "../models/MenuItem";
import { ReducerMap as ReducerMapOrchestrator, /*Orchestrator, */routes as orchestratorRoutes } from "./orchestrator";

import { ProfileSections as OrchestratorProfileSections } from './orchestrator';

const Orchestrator = lazy(() => import('./orchestrator').then(({ Orchestrator }) => ({ default: Orchestrator })));

export const ProfileSections: Array<MenuItem> = [
  ...OrchestratorProfileSections
];

export const ReducerMap = {
  ...ReducerMapOrchestrator
};

export const modules: Array<MenuItem> = [
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

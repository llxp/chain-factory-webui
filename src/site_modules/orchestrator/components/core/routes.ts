import NamespaceSelector from "./NamespaceSelector";
import { MenuItem, Position } from "../../../../models/MenuItem";
import { Counter } from "../counter/Counter";
import Dashboard from "../dashboard/Dashboard";
import New from "../new/New";
import Workflows from "../workflows/Workflows";

export const routes: Array<MenuItem> = [
  {
    text: "",
    path: "/",
    element: Dashboard
  },
  {
    text: "Dashboard",
    path: "/dasboard",
    element: Dashboard
  },
  {
    text: "Workflows",
    path: "/workflows",
    element: Workflows
  },
  {
    text: "New",
    path: "/new",
    element: New
  },
  {
    text: "Select Namespace",
    path: "",
    customElement: NamespaceSelector,
    position: Position.Left
  }
];

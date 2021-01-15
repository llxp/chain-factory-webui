import { MenuItem } from "../../../../models/MenuItem";
import React from "react";
import { Counter } from "../counter/Counter";

export const routes: Array<MenuItem> = [
  {
    text: "Dashboard",
    path: "/",
    element: Counter
  }
];

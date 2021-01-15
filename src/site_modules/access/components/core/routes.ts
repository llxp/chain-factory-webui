import { MenuItem } from "../../../../models/MenuItem";
import React from "react";
import { Counter } from "../counter/Counter";
import { Counter as Counter2 } from "../counter2/Counter";
import { RequestAccess } from "../request_access/RequestAccess";
import { AccessOverview } from "../access_overview/AccessOverview";
import { GlobalAccessOverview } from "../global_access_overview/GlobalAccessOverview";

export const routes: Array<MenuItem> = [
  {
    text: "Dashboard",
    path: "/",
    element: Counter
  },
  {
    text: "Global Access Overview",
    path: "/globalAccess",
    element: GlobalAccessOverview,
    roles: ["admin"]
  },
  /*{
    text: "Dashboard",
    path: "/dashboard",
    element: Counter2
  },
  {
    text: "Policies",
    path: "/policies",
    element: Counter2
  },
  {
    text: "Audit",
    path: "/audit",
    element: Counter2
  },*/
  {
    text: "Access Overview",
    path: "/access",
    element: AccessOverview
  },
  {
    text: "Request Access",
    path: "/request_access",
    element: RequestAccess
  }
];

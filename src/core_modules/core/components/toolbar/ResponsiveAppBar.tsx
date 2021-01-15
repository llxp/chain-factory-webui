import React, { useEffect, useState } from "react";
import { MenuItem } from "../../../../models/MenuItem";
import { RouteComponentProps, withRouter } from "react-router";
import './style/ResponsiveAppBar.css';
import { DrawerComponent } from "./Drawer";
import { LargeToolbarComponent } from "./LargeToolbar";

interface IProps extends RouteComponentProps {
  sites: Array<MenuItem>;
}

function shouldShowDrawer() {
  return window.innerWidth <= 600;
}

function resizeListener(setDrawerActivate: React.Dispatch<React.SetStateAction<boolean>>) {
  if (shouldShowDrawer()) {
    setDrawerActivate(true);
  } else {
    setDrawerActivate(false);
  }
}

function SetResizeListener(setDrawerActivate: React.Dispatch<React.SetStateAction<boolean>>) {
  useEffect(() => {
    window.addEventListener('resize', () => resizeListener(setDrawerActivate));
    return () => {
      window.removeEventListener('resize', () => resizeListener(setDrawerActivate));
    }
  }, []);
}

export function ResAppBar(props: IProps) {
  let [drawerActivate, setDrawerActivate] = useState(shouldShowDrawer());

  SetResizeListener(setDrawerActivate);

  if (drawerActivate) {
    return <DrawerComponent sites={props.sites}></DrawerComponent>;
  } else {
    return <LargeToolbarComponent sites={props.sites}></LargeToolbarComponent>;
  }
}

export const ResponsiveAppBar = withRouter(ResAppBar);

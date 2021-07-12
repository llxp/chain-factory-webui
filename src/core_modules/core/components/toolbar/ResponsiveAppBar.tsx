import React, { useEffect, useState } from "react";
import { MenuItem } from "../../../../models/MenuItem";
import { RouteComponentProps, withRouter } from "react-router";
import './style/ResponsiveAppBar.css';
import Drawer from "./Drawer";
import LargeToolbar from "./LargeToolbar";
import { isMobile } from 'react-device-detect';

interface IProps extends RouteComponentProps {
  sites: Array<MenuItem>;
}

function shouldShowDrawer() {
  return isMobile;
}

function resizeListener(setDrawerActivate: React.Dispatch<React.SetStateAction<boolean>>) {
  if (shouldShowDrawer()) {
    setDrawerActivate(true);
  } else {
    setDrawerActivate(false);
  }
}

export function ResAppBar(props: IProps) {
  let [drawerActivate, setDrawerActivate] = useState(shouldShowDrawer());

  useEffect(() => {
    if (shouldShowDrawer()) {
      setDrawerActivate(true);
    } else {
      setDrawerActivate(false);
    }
    window.addEventListener('resize', () => resizeListener(setDrawerActivate));
    return () => {
      window.removeEventListener('resize', () => resizeListener(setDrawerActivate));
    }
  }, [setDrawerActivate]);

  if (drawerActivate) {
    return <Drawer sites={props.sites}></Drawer>;
  } else {
    return <LargeToolbar sites={props.sites}></LargeToolbar>;
  }
}

export const ResponsiveAppBar = withRouter(ResAppBar);

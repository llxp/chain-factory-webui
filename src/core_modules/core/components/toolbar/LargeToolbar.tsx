import { useLocation } from "react-router";
import { Location } from 'history';
import { Link } from "react-router-dom";
import { MenuItem } from "../../../../models/MenuItem";
import { activeMenuItems, currentPath } from "./utils";
import React from "react";
import { AppBar, Button, Divider, makeStyles, Toolbar } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { MainMenu } from "./MainMenu";

function returnLargeMenuItem(menuItem: MenuItem, location: Location<unknown>) {
  const path = currentPath(location) + menuItem.path;
  return (
    <>
      <Divider orientation="vertical" variant="fullWidth" flexItem></Divider>
      <CustomMenuButton component={Link} to={path} color="inherit">
        {menuItem.text}
      </CustomMenuButton>
      <Divider orientation="vertical" variant="fullWidth" flexItem></Divider>
    </>
  );
}

function CustomMenuButton(props) {
  const useStyles = makeStyles({
    root: {
      'padding-left': '10px',
      'padding-right': '10px',
      'margin-right': '0px',
      'padding-top': '18px',
      'padding-bottom': '18px'
    },
    label: {
      textTransform: 'capitalize',
    },
  });

  return (<Button color="inherit" classes={{
    root: useStyles().root
  }} component={Link} to={props.to}>{props.children}</Button>);
};

function CustomToolbar(props) {
  const useStyles = makeStyles({
    root: {
      'padding-left': '0px',
      'padding-right': '0px',
      'margin-right': '0px'
    },
    label: {
      textTransform: 'capitalize',
    },
  });

  return (<Toolbar classes={{
    root: useStyles().root
  }}>{props.children}</Toolbar>);
};

interface IProps {
  sites: Array<MenuItem>
}

export function LargeToolbarComponent(props: IProps) {
  const location = useLocation();
  const menuItems = Array();
  for (const value of activeMenuItems(props.sites, location)) {
    menuItems.push(returnLargeMenuItem(value, location));
  }

  return (
    <AppBar>
      <CustomToolbar>
        <MainMenu menuItems={props.sites}/>
        <Divider orientation="vertical" variant="fullWidth" flexItem></Divider>
        <span style={{ flexGrow: 1 }}></span>
        {menuItems}
        <span style={{ flexGrow: 1 }}></span>
        <Divider orientation="vertical" variant="fullWidth" flexItem></Divider>
        <CustomMenuButton variant="text" color="inherit" component={Link} to="/signin">
          <ExitToAppIcon />
        </CustomMenuButton>
      </CustomToolbar>
    </AppBar>
  );
}
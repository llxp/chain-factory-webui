import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { MenuItem, Position } from "../../../../models/MenuItem";
import { activeMenuItems, currentPath } from "./utils";
import React, { useState } from "react";
import { AppBar, Button, Divider, makeStyles, Toolbar } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { MainMenu } from "./MainMenu";

interface LargeMenuItemProps {
  menuItem: MenuItem;
}

function LargeMenuItem(props: LargeMenuItemProps) {
  const history = useHistory();
  const path = currentPath(history.location) + props.menuItem.path;
  return (
    <>
      <Divider orientation="vertical" variant="fullWidth" flexItem key={path + 'd1'}/>
      <CustomMenuButton component={Link} to={path} color="inherit" key={path + 'cmb'}>
        {props.menuItem.text}
      </CustomMenuButton>
      <Divider orientation="vertical" variant="fullWidth" flexItem key={path + 'd2'}/>
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

  return (<Toolbar classes={{root: useStyles().root}}>{props.children}</Toolbar>);
};

interface IProps {
  sites: Array<MenuItem>
}

export default function LargeToolbar(props: IProps) {
  const location = useLocation();
  const menuItems: Array<JSX.Element> = activeMenuItems(props.sites, location)
  .filter((value) => { return !value.position || value.position === Position.Center})
  .map((value) => {
    return <LargeMenuItem menuItem={value} key={value.path}/>;
  });

  const appBarItems: Array<JSX.Element> = activeMenuItems(props.sites, location)
  .filter((value) => { return value.position && value.position === Position.Left && !value.customElement}).map((value) => {
    return <LargeMenuItem menuItem={value} key={value.path}/>;
  });

  const appBarComponents: Array<JSX.Element> = activeMenuItems(props.sites, location)
  .filter((value) => { return value.position && value.position === Position.Left && value.customElement}).map((value) => {
    if (value.customElement) {
      return React.createElement(value.customElement, {"key": value.path});
    } else {
      return <></>;
    }
  });

  return (
    <AppBar>
      <CustomToolbar>
        <MainMenu menuItems={props.sites} key="MainMenu"/>
        <Divider orientation="vertical" variant="fullWidth" flexItem key="ctd1"/>
        <span style={{ flexGrow: 0.05 }} key="cts0"/>{appBarItems}{appBarComponents}
        <span style={{ flexGrow: 1 }} key="cts1"/>
        {menuItems}
        <span style={{ flexGrow: 1 }} key="cts2"/>
        <Divider orientation="vertical" variant="fullWidth" flexItem key="ctd2"/>
        <CustomMenuButton variant="text" color="inherit" component={Link} to="/signin" key="ctcmb">
          <AccountBoxIcon/>
        </CustomMenuButton>
      </CustomToolbar>
    </AppBar>
  );
}
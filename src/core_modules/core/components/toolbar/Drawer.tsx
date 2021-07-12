import { AppBar, Button, Grid, List, ListItem, makeStyles, SwipeableDrawer, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Location } from 'history';
import { Link } from "react-router-dom";
import { MenuItem, Position } from "../../../../models/MenuItem";
import { MainMenu } from "./MainMenu";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import { activeMenuItems, currentPath } from "./utils";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "../../../signin/components/signin/SignInSlice";

function returnSmallMenuItem(menuItem: MenuItem, location: Location<unknown>) {
  const path = currentPath(location) + menuItem.path;
  return (
    <ListItem key={menuItem.text} component={Link} to={path} divider button>
      {" "}
      {menuItem.text}{" "}
    </ListItem>
  );
}

interface IProps {
  sites: Array<MenuItem>
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

  const styles = useStyles();
  const history = useHistory();

  const loggedIn = useSelector(selectLoggedIn);
  if (!loggedIn || history.location.pathname === '/signin') {
    return <></>;
  }

  return (<Button color="inherit" classes={{
    root: styles.root
  }} component={Link} to={props.to}><AccountBoxIcon /></Button>);
};

export default function Drawer(props: IProps) {
  const location = useLocation();
  const menuItems: Array<JSX.Element> = activeMenuItems(props.sites, location)
  .filter((value) => { return !value.position || value.position === Position.Center}).map((value) => {
    return returnSmallMenuItem(value, location);
  });

  const appBarItems: Array<JSX.Element> = activeMenuItems(props.sites, location)
  .filter((value) => { return value.position && value.position === Position.Left && !value.customElement}).map((value) => {
    return returnSmallMenuItem(value, location);
  });

  const appBarComponents: Array<JSX.Element> = activeMenuItems(props.sites, location)
  .filter((value) => { return value.position && value.position === Position.Left && value.customElement}).map((value) => {
    if (value.customElement) {
      return React.createElement(value.customElement);
    } else {
      return <></>;
    }
  });

  const [drawer, setDrawer] = useState(false);

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <MenuIcon onClick={() => { setDrawer(true); }}/>
            {appBarItems}
            {appBarComponents}
            <Typography color="inherit" variant="h6"></Typography>
          </Grid>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer open={drawer} onClose={() => { setDrawer(false); }} onOpen={() => { setDrawer(true); }}>
        <div tabIndex={0} role="button" onClick={() => { /*setDrawer(false);*/ }} onKeyDown={() => { setDrawer(false); }}>
          <List>
            <MainMenu menuItems={props.sites}/>
            {menuItems}
            <CustomMenuButton variant="text" color="inherit" component={Link} to="/signin"/>
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
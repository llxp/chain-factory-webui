import { AppBar, Grid, List, ListItem, SwipeableDrawer, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useLocation } from "react-router";
import { Location } from 'history';
import { Link } from "react-router-dom";
import { MenuItem } from "../../../../models/MenuItem";
import { MainMenu } from "./MainMenu";

import { activeMenuItems, currentPath } from "./utils";

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

export function DrawerComponent(props: IProps) {
  const location = useLocation();
  const menuItems = Array();
  for (const value of activeMenuItems(props.sites, location)) {
    menuItems.push(returnSmallMenuItem(value, location));
  }

  let [drawer, setDrawer] = useState(false);

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <MenuIcon onClick={() => { setDrawer(true); }}/>
            <Typography color="inherit" variant="h6"></Typography>
          </Grid>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer open={drawer} onClose={() => { setDrawer(false); }} onOpen={() => { setDrawer(true); }}>
        <div tabIndex={0} role="button" onClick={() => { /*setDrawer(false);*/ }} onKeyDown={() => { setDrawer(false); }}>
          <List>
            <MainMenu menuItems={props.sites}/>
            {menuItems}
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
import { Button, createStyles, Divider, Grid, Hidden, List, ListItem, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { signOutAsync, useReduxDispatch } from "../signin/SignInSlice";
import { getUserInformation, selectUserInformation } from "./ProfileSlice";
import { ProfileSections } from '../../../../site_modules';
import { Redirect, Route, Switch, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { MenuItem } from "../../../../models/MenuItem";
import { currentPath } from "../../../core/components/toolbar/utils";

export function ProfileOverview() {
  const reduxDispatch = useReduxDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  interface LargeMenuItemProps {
    menuItem: MenuItem;
  }
  
  function LargeMenuItem(props: LargeMenuItemProps) {
    const history = useHistory();
    const path = currentPath(history.location) + props.menuItem.path;
    return (
      <>
        <Divider orientation="horizontal" variant="fullWidth" flexItem key={path + 'd1'}/>
        <CustomMenuButton component={Link} to={path} key={path + 'cmb'}>
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
  
    return (<Button fullWidth color="primary" variant="contained" classes={{
      root: useStyles().root
    }} component={Link} to={props.to}>{props.children}</Button>);
  };

  const history = useHistory();

  const profileSectionsList: Array<JSX.Element> = [];
  for (const profileSection of ProfileSections) {
    const path = currentPath(history.location) + profileSection.path;
    profileSectionsList.push(<Route path={path} component={profileSection.element} key={profileSection.path}/>);
    //console.log(profileSection);
  }

  const profileSectionsLinks: Array<JSX.Element> = [];
  for (const profileSection of ProfileSections) {
    profileSectionsLinks.push(<LargeMenuItem menuItem={profileSection}/>);
  }

  return (
    <>
    <Redirect to="/signin/profile"/>
    <Grid container spacing={0} wrap="wrap">
      <Grid item xl={1} lg={1}></Grid>
      <Grid item xl={1} lg={2} xs={5} md={12} sm={12} style={{border:"1px #000 solid",minWidth:"150px"}}>{profileSectionsLinks}</Grid>
      <Grid item xl={9} lg={9}><Switch>{profileSectionsList}</Switch></Grid>
    </Grid>
    </>
  );
};

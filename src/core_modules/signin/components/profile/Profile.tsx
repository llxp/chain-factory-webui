import { Button, createStyles, Divider, Grid, Hidden, List, ListItem, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { signOutAsync, useReduxDispatch } from "../signin/SignInSlice";
import { getUserInformation, selectUserInformation } from "./ProfileSlice";
import { ProfileSections } from '../../../../site_modules';
import { Route, Switch, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { MenuItem } from "../../../../models/MenuItem";
import { currentPath } from "../../../core/components/toolbar/utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export function Profile() {
  const reduxDispatch = useReduxDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  //const history = useHistory();

  useEffect(() => {
    document.title = "Profile"
  }, []);

  const action = key => (
    <Button onClick={() => { closeSnackbar(key) }}>
      Dismiss
    </Button>
  );

  useEffect(() => {
    reduxDispatch(getUserInformation());
  }, [reduxDispatch]);

  const userInformation = useSelector(selectUserInformation);

  const handleClick = () => {
    reduxDispatch(signOutAsync()).then((success: boolean) => {
      enqueueSnackbar(
        success ? 'Signin successful!' : 'Error Signing in!',
        {
          variant: success ? 'success' : 'error',
          autoHideDuration: 3000,
          action
        }
      );
      if (success) {
        // setTimeout(() => {
        //   // forward to default page on success
        //   history.push('/');
        // }, 3000);
      }
    });
  };

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
    <div className="Center">
      <h1>Profile</h1>
      <div className={classes.root}>
        <Grid container spacing={0} justifyContent="center" alignItems="center" wrap="nowrap">
          <Hidden only={['xl', 'lg', 'md']}><Grid item></Grid></Hidden>
          <Grid item xs={12} md={6} xl={1}>
            <div className={classes.demo}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Username "
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Profile ID "/>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Login Name "/>
                </ListItem>
              </List>
            </div>
          </Grid>
          <Divider orientation="vertical"/>
          <Grid item xs={12} md={6} xl={3}>
            <div className={classes.demo}>
              <List>
                <ListItem>
                  <ListItemText
                    primary={userInformation?.username}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary={userInformation?.object_sid}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary={userInformation?.login_name}
                  />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Hidden only={['xl', 'lg', 'md']}><Grid item md={6} xl={3}></Grid></Hidden>
        </Grid>
      </div>
      <br/>
      <br/>
      <Button onClick={handleClick} variant="contained" color="primary" size="large">Signout</Button>
    </div>
    <br/>
    </>
  );
};

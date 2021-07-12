import React from "react";
import { makeStyles, withStyles } from '@material-ui/styles';
import Button from "@material-ui/core/Button";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";
import PagesIcon from '@material-ui/icons/Pages';
import { MenuItem as RouteItem } from "../../../../models/MenuItem";
import { useHistory } from "react-router";

const StyledMenu = withStyles({
  paper: {
    //border: '1px solid #d3d4d5',
    width: '100%',
    //margin: '0px',
    height: '100%',
    top: -16,
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: 'unset',
    maxWidth: 'unset',
    position: 'unset'
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    style={{'top': 0}}
    getContentAnchorEl={null}
    /*anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}*/
    /*transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}*/
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export const StyledMenuButton = withStyles(() => ({
  root: {
    border: "0px solid #d3d4d5",
    'padding-top': '18px',
    'padding-bottom': '18px'
  }
}))(Button);

interface IProps {
  menuItems: Array<RouteItem>;
}

export function MainMenu(props: IProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (route: string) => {
    return () => {
      setAnchorEl(null);
      if (route.length > 0) {
        history.push(route);
      }
    };
  };

  const list: Array<JSX.Element> = props.menuItems
    .filter((menuItem) => menuItem.text && menuItem.path && menuItem.text.length > 0)
    .map((menuItem) => {
      //<ListItemText primary={menuItem.text} />
      return (
        <StyledMenuItem onClick={handleClose(menuItem.path ? menuItem.path : "")} key={menuItem.path}>
          <ListItemIcon>
            <SendIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary={menuItem.text}/>
        </StyledMenuItem>
      );
    });

  return (
    <div>
      <StyledMenuButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        //variant="contained"
        //color="primary"
        variant="text"
        color="inherit"
        onClick={handleClick}
      >
        <PagesIcon/>
        
      </StyledMenuButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose('')}
      >
        {list}
      </StyledMenu>
    </div>
  );
}

import React, { FunctionComponent, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { teal } from '@material-ui/core/colors';
import { useSelector } from 'react-redux';
import { IState } from '../../reducers';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({ //change color too
  root: {
    flexGrow: 1,
    background: teal[800],
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
    fontFamily: "Bookman Old Style"
  },

}));




export const NavBarComponent: FunctionComponent<any> = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  //const open = Boolean(anchorEl);

  console.log(props)

  const currUser = useSelector((state: IState) => {
    return state.loginState.currUser
  })

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let menuItems = []
  //changes the nav bar back after logout for when the there is no currenUser
  useEffect(() => {
    if (!currUser) {
      menuItems = []
      menuItems.push(

        <ListItem button component={Link} key="listeItem3" to="/login" ><ListItemText onClick={handleDrawerClose}>Login</ListItemText></ListItem>,
        <ListItem button component={Link} key="listeItem4" to="/register" ><ListItemText onClick={handleDrawerClose}>Register</ListItemText></ListItem>,
        <ListItem button component={Link} key="listeItem5" to="/logout" ><ListItemText onClick={handleDrawerClose}>Logout</ListItemText></ListItem>
      )}

  })

  if (currUser) {
    if (currUser.role === 'Admin') {
      menuItems.push(
        <ListItem button component={Link} key="listItem1" to={`/users/profile/${currUser.userId}`}><ListItemText onClick={handleDrawerClose}>Hello {currUser.firstName}!</ListItemText></ListItem>,
        <ListItem button component={Link} key="listeItem2" to="/" ><ListItemText onClick={handleDrawerClose}>Home</ListItemText></ListItem>,
        <ListItem button component={Link} key="listeItem3" to={`/users/profile/admin/update/${currUser.userId}`} ><ListItemText onClick={handleDrawerClose}>Update My Profile</ListItemText></ListItem>,
        <ListItem button component={Link} key="listeItem4" to="/users" ><ListItemText onClick={handleDrawerClose}>All Users</ListItemText></ListItem>,
        <ListItem button component={Link} key="listeItem5" to="/locations" ><ListItemText onClick={handleDrawerClose}>All Locations</ListItemText></ListItem>,
        <ListItem button component={Link} key="listeItem6" to="/map"> <ListItemText onClick={handleDrawerClose}>Map</ListItemText></ListItem>,
        <ListItem button component={Link} key="listeItem7" to="/logout" ><ListItemText onClick={handleDrawerClose}>Logout</ListItemText></ListItem>

      )

    } else {
      menuItems.push(
        <ListItem button component={Link} key="listItem1" to={`/users/profile/${currUser.userId}`}>
          <ListItemText >Hello {currUser.firstName}!</ListItemText>
        </ListItem>,
        <ListItem button component={Link} key="listeItem2" to="/" ><ListItemText onClick={handleDrawerClose}>Home</ListItemText></ListItem>,
        <ListItem button component={Link} key="listeItem3" to={`/users/profile/update/${currUser.userId}`} ><ListItemText onClick={handleDrawerClose}>Update My Profile</ListItemText></ListItem>,
        <ListItem button component={Link} key="listeItem4" to="/users" ><ListItemText onClick={handleDrawerClose}>All Users</ListItemText></ListItem>,
        <ListItem button component={Link} key="listeItem4" to="/locations" ><ListItemText onClick={handleDrawerClose}>All Locations</ListItemText></ListItem>,
        <ListItem button component={Link} key="listeItem6" to="/map"> <ListItemText onClick={handleDrawerClose}>Map</ListItemText></ListItem>,
        <ListItem button component={Link} key="listeItem5" to="/logout" ><ListItemText onClick={handleDrawerClose}>Logout</ListItemText></ListItem>
      
      )
    }

    //info page? 
  } else {
    menuItems.push(
      <ListItem button component={Link} key="listeItem3" to="/login" ><ListItemText onClick={handleDrawerClose}>Login</ListItemText></ListItem>,
      <ListItem button component={Link} key="listeItem4" to="/register" ><ListItemText onClick={handleDrawerClose}>Register</ListItemText></ListItem>,
      <ListItem button component={Link} key="listeItem5" to="/logout" ><ListItemText onClick={handleDrawerClose}>Logout</ListItemText></ListItem>
        )
  }

  const theme = useTheme()
  const [open, setOpen] = React.useState(false);


  return (
    <nav>

      <CssBaseline />
      <AppBar
        position="static"
        className={clsx(classes.root, classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Menu id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            {menuItems}
          </Menu>
          <Typography variant="h4" className={classes.title}>
            The Fellowship
            </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map((text, index) => (
            <ListItem>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </nav>

  );
}
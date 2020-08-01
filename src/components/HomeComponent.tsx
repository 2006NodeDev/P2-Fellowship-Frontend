import React, { FunctionComponent } from 'react';
import { withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, lime } from '@material-ui/core/colors';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';
import { Link } from 'react-router-dom';

const SignUpButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(lime[700]),
    backgroundColor: "lime[700]",
    '&:hover': {
      backgroundColor: green[900],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: { //figure out spacing for this (so it's relative to screen size and centered)
    margin: "auto",
    maxWidth: 600,
    justifyContent: "center",
  },
  text: {
    fontFamily:"Bookman Old Style",
    color:"black"
  },
  submit: {
    margin: theme.spacing(1),
    backgroundColor: lime[700],
    color: 'white',
    //background color? for when hovering/submitting?
    fontFamily: "Bookman Old Style",
    fontSize: 16,
  }
}));

export const HomeComponent:FunctionComponent<any> = (props) =>{
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        {/* <CardMedia  /> 
        Insert image of middle earth here! (or slideshow?)*/}
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className={classes.text}>
                Explore the unknown territories of the world!                 
            </Typography>
            <Typography variant="body1" component="p" className={classes.text}>
                Join the Fellowship of the Ring, a selective, diverse 
                team working to overthrow the Dark Lord as they travel across 
                the legendary, luscious landscape of Middle-Earth to 
                earn their places in the history books. 
                There’s only an 11% chance of dying!
            </Typography>
        </CardContent>
        <CardActions className={classes.root}>
          {/*EDIT THE LINKS IN THE BUTTONS */}
            <Link to= "/register" style={{ textDecoration:"none"}}><SignUpButton variant="contained" className={classes.submit}>
              Register Now!
            </SignUpButton></Link>  
             or  <Link to="/login" className={classes.text}>Login</Link>
        </CardActions>
    </Card>
  )
}
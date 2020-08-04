import React, { FunctionComponent } from 'react';
import { withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { teal, green } from '@material-ui/core/colors';
import { Card, CardContent, Typography, CardActions, Paper, CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';

const SignUpButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[700]),
    backgroundColor: "teal[700]",
    '&:hover': {
      backgroundColor: teal[800],
    },
  },
}))(Button);

const styles = {
  paperContainer: {
      backgroundImage: `url(${"src/logo.jpg"})`
  }
};

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
    backgroundColor: green[600],
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
        <br/>

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
            <Link to= "/register" style={{ textDecoration:"none"}}>
              <SignUpButton variant="contained" className={classes.submit}>
                Register Now!
              </SignUpButton>
            </Link>
            <Link to="/login" style={{ textDecoration:"none"}} >
             <SignUpButton variant="contained" className={classes.submit}>
                Login
             </SignUpButton> 
            </Link>
   
             
        </CardActions>
    </Card>
  )
}
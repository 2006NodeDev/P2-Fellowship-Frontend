import React, { FunctionComponent } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { teal } from '@material-ui/core/colors';
import { Card, CardContent, Typography, CardActions, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IState } from '../../reducers';

const CustomButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[700]),
    backgroundColor: "teal[700]",
    '&:hover': {
      backgroundColor: teal[800],
    },
  },
}))(Button);

const background = {
card : { 
    height: 1000,
    maxWidth: 20000,
    backgroundImage: `url(${"https://storage.googleapis.com/p2-fellowship/Project-Images/home-map.jpg"})`
    }
}

const useStyles = makeStyles((theme) => ({
  root: { //figure out spacing for this (so it's relative to screen size and centered)
    margin: "auto",
    maxWidth: 600,
    justifyContent: "center",
    alignItems:"center"

  },
  text: {
    fontFamily:"Bookman Old Style",
    color:"black"
  },
  submit: {
    margin: theme.spacing(1),
    backgroundColor: teal[700],
    color: 'white',
    fontFamily: "Bookman Old Style",
    fontSize: 16,
  }
}));

export const HomeComponent:FunctionComponent<any> = (props) =>{
  const classes = useStyles();

  //get current user (to hide or show buttons)
  const currUser = useSelector((state:IState) => {
    return state.loginState.currUser
  })

  let buttonsDisplayed:any[] = []
  
  if (!currUser){
    buttonsDisplayed.push(
      <Link to= "/register" style={{ textDecoration:"none"}}>
        <CustomButton variant="contained" className={classes.submit}>
          Register Now!
        </CustomButton>
      </Link>,
      <Link to="/login" style={{ textDecoration:"none"}} >
        <CustomButton variant="contained" className={classes.submit}>
          Login
        </CustomButton> 
      </Link>
  )}

  return (
    <div style={background.card} >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
      <Card className={classes.root}>
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
          <Typography > 
            {buttonsDisplayed}
          </Typography>
        </CardActions>
      </Card>
    </Grid>
    </div>
  )
}
import React, { FunctionComponent } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { teal } from '@material-ui/core/colors';
import { Card, CardContent, Typography, CardActions, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IState } from '../../reducers';

const background = {
  image: {
    minHeight: "120vh",
    backgroundRepeat: 'no-repeat',
    backgroundSize: "cover",
    backgroundImage: `url(${"https://storage.googleapis.com/p2-fellowship/home-page.jpg"})`
    }
}

export const HomeComponent:FunctionComponent<any> = (props) =>{
  const classes = useStyles();

  //get current user (to hide or show buttons)
  const currUser = useSelector((state:IState) => {
    return state.loginState.currUser
  })

  let buttonsDisplayed:any[] = []
  
  if (!currUser){
    buttonsDisplayed.push(
      <CardActions className={classes.buttons}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Link to= "/register" style={{ textDecoration:"none"}}>
              <CustomButton fullWidth variant="contained" className={classes.submit}>
                Register
              </CustomButton>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link to="/login" style={{ textDecoration:"none"}} >
              <CustomButton fullWidth variant="contained" className={classes.submit}>
                Login
              </CustomButton> 
            </Link>
          </Grid>
        </Grid>
      </CardActions>
  )}

  return (
    <div style={background.image} >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardContent>
              <Typography gutterBottom className={classes.bigText}>
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
        </Grid>
        <Grid item xs={12}>
            {buttonsDisplayed}
        </Grid>
      </Grid>
      </Card>
    </Grid>
    </div>
  )
}
const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "10%",
    minWidth: 400,
    maxWidth:"33%",
  },
  buttons: {
    width: '95%',
    margin:"auto",
  },
  bigText: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 25,
    fontFamily: "Bookman Old Style",
  },
  text: {
    fontFamily:"Bookman Old Style",
    color:"black"
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
    backgroundColor: teal[700],
    color: 'white',
    fontFamily: "Bookman Old Style",
    fontSize: 16
  }
}));

const CustomButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[700]),
    backgroundColor: "teal[700]",
    '&:hover': {
      backgroundColor: teal[800],
    },
  },
}))(Button);

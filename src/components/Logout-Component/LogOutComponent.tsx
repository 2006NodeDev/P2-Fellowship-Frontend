import React, { FunctionComponent, SyntheticEvent, useEffect, useState } from "react";
import { Button, makeStyles, CssBaseline, Container, Typography, Grid, withStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../reducers";
import { teal } from "@material-ui/core/colors";
import { logoutActionMapper, logoutErrorReset } from "../../action-mappers/logout-action-mapper";
import { toast } from "react-toastify";


export const LogOutComponent: FunctionComponent<any> = (props)=>{
    const classes = useStyles();

    const thisUser = useSelector((state: IState) => {
      return state.loginState.currUser
    })
    const userProfile = useSelector((state: IState) => {
      return state.userProfileState.profUser
    })
    //console.log(thisUser + userProfile)  //for check
    
    const errorMessage = useSelector((state: IState) => {
      return state.loginState.errorMessage
    })

    const dispatch = useDispatch()

    const logoutUser = async (e: SyntheticEvent) => {
        e.preventDefault()
        //log in the user using the action mapper
        //should update thisUser, userProfile AND errorMessage
        let thunk = logoutActionMapper() //no params (like endpoint in backend)
        dispatch(thunk)
      }

    useEffect(() =>{
        //if there's an error, show it
      if (errorMessage) {
          toast.error(errorMessage)
        dispatch(logoutErrorReset())
      }
    })
    
    useEffect(() => {
      //if user and userProfile are null, logout was successful
      if (!thisUser && !userProfile) {
        props.history.push(`/`)
      }
    })

    return (
      (thisUser)?
        <Container component="main" maxWidth="xs">
        <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Are you sure you want to log out?
            </Typography>
            <Grid item xs={12}>
               <LogoutButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  onClick={logoutUser}
                > Logout
              </LogoutButton>
            </Grid>
          </div>
        </Container>
      :
      <div>
          <h3> Must be logged in to log out</h3>
      </div>
    )
}

const LogoutButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[700]),
    backgroundColor: "teal[700]",
    '&:hover': {
      backgroundColor: teal[800],
    },
  },
}))(Button);

//styles at the bottom because closer to html return
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    submit: {
      margin: theme.spacing(1),
      backgroundColor: teal[600],
      color: 'white',
      fontFamily: "Bookman Old Style",
      fontSize: 16,
    }
}));
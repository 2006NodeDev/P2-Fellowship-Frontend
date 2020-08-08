import React, { FunctionComponent, SyntheticEvent, useEffect } from "react";
import { Button, makeStyles, CssBaseline, Container, Typography, Grid, withStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../reducers";
import { teal } from "@material-ui/core/colors";
import { logoutActionMapper, logoutErrorReset } from "../../action-mappers/logout-action-mapper";
import { toast } from "react-toastify";

interface ILogoutProps extends RouteComponentProps{
    changeCurrentUser:(newUser:any)=>void
}

export const LogOutComponent: FunctionComponent<ILogoutProps> = (props)=>{
    const classes = useStyles();

    // const currUser = useSelector((state: IState) => {
    //   return state.loginState.currUser
    // })

    const user = useSelector((state: IState) => {
      return state.loginState.currUser
    })
    console.log(user);
  
    const errorMessage = useSelector((state: IState) => {
      return state.loginState.errorMessage
    })

    const dispatch = useDispatch()

    // let userId = currUser?.userId

    const logoutUser = async (e: SyntheticEvent) => {
        e.preventDefault()
        let thunk = logoutActionMapper()
        dispatch(thunk)
      }
  
    useEffect(() =>{
      if (errorMessage) {
        toast.error(errorMessage)
        dispatch(logoutErrorReset())
      }
    })
    
    useEffect(() => {
      if (!user) { //if user is null, logout was successful
        props.history.push(`/`)
      }
    })

    return (
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
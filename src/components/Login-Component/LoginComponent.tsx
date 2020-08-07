import React, { FunctionComponent, useState, SyntheticEvent, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme, Button, FormControlLabel, Checkbox, CheckboxProps, withStyles, Card, Grid, Typography, CardContent, CardActionArea } from '@material-ui/core'
import { Route, Router, Redirect, RouteComponentProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { ILoginState, IState } from '../../reducers';
import { loginActionMapper, loginErrorReset } from '../../action-mappers/login-action-mapper';
import { toast } from 'react-toastify'
import { teal, green } from '@material-ui/core/colors';
import Image from '../../images/login.png'


const LoginButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[700]),
    backgroundColor: "teal[700]",
    '&:hover': {
      backgroundColor: teal[800],
    },
  },
}))(Button);


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
        height:'30ch',
        alignItems:'center'
      },
    },
    loginMessage: {
      margin: theme.spacing(1),
      fontSize: 20,
      fontFamily: "Bookman Old Style",
      alignItems:'center'
    },
    submit: {
      margin: theme.spacing(1),
      backgroundColor: teal[600],
      color: 'white',
      //background color? for when hovering/submitting?
      fontFamily: "Bookman Old Style",
      fontSize: 16,
    }
  }),
);

const background = {
  card: {
    height: '100%',
    maxWidth: '100%',
    backgroundImage: `url(${Image})`

  }
}

export const LoginComponent: FunctionComponent<any> = (props) => {

  const classes = useStyles();

  //this hook is how you get the state from the store and give it to the component
  const user = useSelector((state: IState) => {
    return state.loginState.currUser
  })

  const errorMessage = useSelector((state: IState) => {
    return state.loginState.errorMessage
  })

  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')

  const updateUsername = (event: any) => {
    event.preventDefault()
    changeUsername(event.currentTarget.value)
  }
  const updatePassword = (event: any) => {
    event.preventDefault()
    changePassword(event.currentTarget.value)
  }

  //dispatch is the function that takes an action as an argument and gives it to the reducer
  //you get the action from the action mapper
  const dispatch = useDispatch()

  const loginSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    let thunk = loginActionMapper(username, password)
    dispatch(thunk)
  }

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(loginErrorReset())
    }
  })

  useEffect(() => {
    if (user) {
      props.history.push(`users/profile/${user.userId}`)
    }
  })

  return (
    <div style={background.card}>
     
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Card className={classes.root} >
          <form autoComplete="off" onSubmit={loginSubmit}>
              <br />
            <Typography className={classes.loginMessage}>
              Please login:
            </Typography>
            <TextField id="username-basic" label="Username" value={username} onChange={updateUsername} />
              <br />
            <TextField id="password-basic" label="Password" type='password' value={password} onChange={updatePassword} />
              <br />
              <br />
            <LoginButton type='submit' variant='contained' onClick={loginSubmit} className={classes.submit}> Submit </LoginButton>          
          </form>
        </Card>
      </Grid>
            
        </div>
    )

}
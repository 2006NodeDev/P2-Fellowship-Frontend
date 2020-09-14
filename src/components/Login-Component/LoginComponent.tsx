import React, { FunctionComponent, useState, SyntheticEvent, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme, Button, withStyles, Card, Grid, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../reducers';
import { loginActionMapper, loginErrorReset } from '../../action-mappers/login-action-mapper';
import { toast } from 'react-toastify'
import { teal } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

const background = {
  image: {
    minHeight: "120vh",
    backgroundRepeat: 'no-repeat',
    backgroundSize: "cover",
    backgroundImage: `url(${"https://storage.googleapis.com/p2-fellowship/login.jpg"})`

  }
}

export const LoginComponent: FunctionComponent<any> = (props) => {

  const classes = useStyles();

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
  
  //this hook is how you get the state from the store and give it to the component
  const thisUser = useSelector((state: IState) => {
    return state.loginState.currUser
  })

  const errorMessage = useSelector((state: IState) => {
    return state.loginState.errorMessage
  })

  const loginSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    //log in the user using the action mapper, updating thisUser and errorMessage
    dispatch(loginActionMapper(username, password))
  }
  //if there's an error
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(loginErrorReset())
    }
  })

  useEffect(() => {
    if (thisUser) {
      //send to profile page if login works
      props.history.push(`/users/profile/${thisUser.userId}`)
    }
  })

  return (
    <div style={background.image}>
     
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Card className={classes.card} >
          <form autoComplete="off" onSubmit={loginSubmit} className={classes.form}>
            <Typography className={classes.loginMessage}>
              Login
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField 
                  variant="outlined"
                  required
                  fullWidth
                  label="Username" 
                  value={username} 
                  onChange={updateUsername} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  variant="outlined"
                  required
                  fullWidth
                  label="Password" 
                  type='password' 
                  value={password} 
                  onChange={updatePassword} 
                />
            </Grid>
            <Grid item xs={6}>
              <CustomButton
                type='submit'  
                fullWidth
                variant='contained'
                className={classes.submit}> 
                Submit 
              </CustomButton>
            </Grid>
            <Grid item xs={6}>
                <Link to= "/" style={{ textDecoration:"none"}}>
                <CustomButton
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                > Cancel 
                </CustomButton>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid> 
    </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
        height:'30ch',
        alignItems:'center'
      },
    },
    card: {
      marginTop: "15%",
      minWidth: 400,
      width:"33%",
    },
    loginMessage: {
      marginTop: 5,
      marginBottom: 10,
      fontSize: 25,
      fontFamily: "Bookman Old Style",
      alignItems:'center'
    },
    form: {
      width: '90%',
      margin:"auto",
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: teal[700],
      color: 'white',
      fontFamily: "Bookman Old Style",
      fontSize: 16,
    }
  }),
);

const CustomButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[700]),
    backgroundColor: "teal[700]",
    '&:hover': {
      backgroundColor: teal[800],
     }
  }
}))(Button);
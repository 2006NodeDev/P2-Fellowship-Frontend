import React, { FunctionComponent, useState, SyntheticEvent, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme, Button,  FormControlLabel, Checkbox, CheckboxProps, withStyles } from '@material-ui/core'
import { Route, Router, Redirect, RouteComponentProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { ILoginState, IState } from '../../reducers';
import { loginActionMapper, loginErrorReset } from '../../action-mappers/login-action-mapper';
import { toast } from 'react-toastify'
import { teal, green } from '@material-ui/core/colors';


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
        width: '25ch',
      },
    },
    submit: {
      margin: theme.spacing(1),
      backgroundColor: green[600],
      color: 'white',
      //background color? for when hovering/submitting?
      fontFamily: "Bookman Old Style",
      fontSize: 16,
    }
  }),
);


export const LoginComponent: FunctionComponent <any> = (props) => {

    const classes = useStyles();

    //this hook is how you get the state from the store and give it to the component
    const user = useSelector((state:IState) => {
      return state.loginState.currUser
    })

    const errorMessage = useSelector((state:IState) => {
      return state.loginState.errorMessage
    })

    
    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };

    const [state, setState] = React.useState({
      checkedA: true,
    });
    
 
    const updateUsername = (event:any) => {
        event.preventDefault()
        changeUsername(event.currentTarget.value)
    }
    const updatePassword = (event : any) => {
        event.preventDefault()
        changePassword(event.currentTarget.value)
    }

    //dispatch is the function that takes an action as an argument and gives it to the reducer
    //you get the action from the action mapper
    const dispatch = useDispatch()

    const loginSubmit = async (e:SyntheticEvent) => {
        e.preventDefault()
        let thunk = loginActionMapper(username, password)
        dispatch(thunk)
    }

    useEffect(()=>{
      if(errorMessage){
          toast.error(errorMessage)
          dispatch(loginErrorReset())
      }
    })

  useEffect(()=>{
    if(user){
      props.history.push(`users/profile/${user.userId}`)
    }
  })

    return (
        <div>
          <h2>Welcome Back!</h2> 
            <br/>
            <form autoComplete="off" onSubmit={loginSubmit}>
                <TextField id="username-basic" label="Username" value ={username} onChange = {updateUsername}/>
                <br/>
                <TextField id="password-basic" label="Password" type = 'password' value = {password} onChange = {updatePassword}/>
                <br/>
                <br/>
                <LoginButton type = 'submit' variant = 'contained' onClick = {loginSubmit} className={classes.submit}> Submit </LoginButton>
                <br />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                      color="primary"
                    />
                  }
                  
                  label="Keep Me Logged In"
                />

            </form>
            
        </div>
    )

}
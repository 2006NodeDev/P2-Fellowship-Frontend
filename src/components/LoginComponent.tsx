import React, { FunctionComponent, useState, SyntheticEvent, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme, Button, FormGroup, FormControlLabel, Checkbox, CheckboxProps, withStyles } from '@material-ui/core'
import { Route, Router, Redirect, RouteComponentProps } from 'react-router';
import { User } from '../models/User';
import { fellowshipLogin } from '../remote/fellowshipLogin';




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);


export const LoginComponent: FunctionComponent <any> = (props) => {

    const classes = useStyles();
    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
 
    const updateUsername = (event:any) => {
        event.preventDefault()
        changeUsername(event.currentTarget.value)
    }
    const updatePassword = (event : any) => {
        event.preventDefault()
        changePassword(event.currentTarget.value)
    }

    const loginSubmit = async (e:SyntheticEvent) => {
        e.preventDefault()
        let res = await fellowshipLogin(username, password)
        props.changeCurrentUser(res)
        changePassword('')
        props.history.push('/user')
    }


    return (
        <div>
            <form autoComplete="off" onSubmit={loginSubmit}>
                <TextField id="username-basic" label="Username" value ={username} onChange = {updateUsername}/>
                <br/>
                <TextField id="password-basic" label="Password" type = 'password' value = {password} onChange = {updatePassword}/>
                <br/>
                <br/>
                <Button type = 'submit' variant = 'contained' color = 'primary' onClick = {loginSubmit}> Submit </Button>
                <br />

            </form>
            
        </div>
    )

}
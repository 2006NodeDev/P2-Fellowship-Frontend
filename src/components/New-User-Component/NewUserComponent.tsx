import React, { FunctionComponent, useState, SyntheticEvent, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Button, Grid, Card } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { newuserActionMapper } from '../../action-mappers/new-user-action-mapper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { toast } from 'react-toastify';
import { loginErrorReset } from '../../action-mappers/login-action-mapper';
import { IState } from '../../reducers';
import { teal } from '@material-ui/core/colors';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    submit: {
      backgroundColor: teal[700],
      color: 'white',
      fontFamily: "Bookman Old Style",
      fontSize: 16,
    } 
  }),
);

const SignUpButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[700]),
    backgroundColor: "teal[700]",
    '&:hover': {
      backgroundColor: teal[800],
     }
  }
}))(Button);


const background = {
  card: {
    height: '100%',
    maxWidth: '100%',
    backgroundImage: `url(${Image})`

  }
}

export const NewUserComponent:FunctionComponent<any> = ((props) => {
    const classes = useStyles();

    const user = useSelector((state:IState) => {
      return state.loginState.currUser
    })

    const errorMessage = useSelector((state:IState) => {
      return state.loginState.errorMessage
    })

    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    const [firstName, changeFirstName] = useState('')
    const [lastName, changeLastName] = useState('')
    const [affiliation, changeAffiliation] = useState('')
    const [placesVisited, changePlacesVisited] = useState(0)
    const [address, changeAddress] = useState('')
    const [email, changeEmail] = useState('')
    const [role, changeRole] = useState('')
    const [image, changeImage] = useState<any>(null)

  const updateUsername = (event:any) => {
      event.preventDefault()
      changeUsername(event.currentTarget.value)
  }
  const updatePassword = (event: any) => {
    event.preventDefault()
    changePassword(event.currentTarget.value)
  }
  const updateFirstName = (event: any) => {
    event.preventDefault()
    changeFirstName(event.currentTarget.value)
  }
  const updateLastName = (event: any) => {
    event.preventDefault()
    changeLastName(event.currentTarget.value)
  }
  const updateAffiliation = (event: any) => {
    event.preventDefault()
    changeAffiliation(event.currentTarget.value)
  }
  const updateAddress = (event:any) => {
    event.preventDefault()
    changeAddress(event.currentTarget.value)
  }
  const updateEmail = (event:any) => {
      event.preventDefault()
      changeEmail(event.currentTarget.value)
  }
  const updateImage = (event:any) => {
      let file:File = event.currentTarget.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        changeImage(reader.result)
    }
  }


  const dispatch = useDispatch()

  const newUserSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()


  //Note: placesVisited starts at 0 by default so 
  //User is not required to fill in this field of the form below.
        //new usr doesnt need a role because they default to "User"
        let thunk = newuserActionMapper(username, password, firstName, lastName, affiliation, placesVisited, address, email, image)
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
//Note: placesVisited starts at 0 by default so 
//User is not required to fill in this field of the form below.

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
     
        <form className={classes.root} autoComplete="off" onSubmit={newUserSubmit}>
          <div>
            <br />
            <TextField
              required 
              label="Username"
              autoComplete="off"
              value={username}
              onChange={updateUsername}
            />
            <br />
            <TextField
              required
              label="Password"
              autoComplete="off"
              type="password"
              value={password}
              onChange={updatePassword}
            />
            <br />
            <TextField
              required
              id="standard-password-input"
              label="First Name"
              autoComplete="off"
              value={firstName}
              onChange={updateFirstName}
            />
            <br />
            <TextField
              id="standard-password-input"
              label="Last Name"
              autoComplete="off"
              value={lastName}
              onChange={updateLastName}

            />
            <br />
            <TextField
              required
              id="standard-multiline-static"
              label="Affiliation"
              autoComplete="off"
              multiline
              value={affiliation}
              onChange={updateAffiliation}
            />
            <br />
            <TextField
              id="standard-password-input"
              label="Address"
              autoComplete="off"
              value={address}
              onChange={updateAddress}
            />
            <br />
            <TextField
              required
              id="standard-password-input"
              label="Email"
              type="email"
              autoComplete="off"
              value={email}
              onChange={updateEmail}
            />
            <br />
              <label htmlFor="file">Profile Picture</label> <br/>
              <input type="file" name="file" accept="image/*" onChange={updateImage} />
              <img src={image} width="100%"/>
            <hr />
            <SignUpButton type='submit' variant='contained' onClick={newUserSubmit} className={classes.submit}> Submit </SignUpButton>          
          </div>
        </form>
    
      </Grid>
    </div>
  )


})
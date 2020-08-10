import React, { FunctionComponent, useState, SyntheticEvent, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid, Card, Container, CssBaseline, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { newUserActionMapper } from '../../action-mappers/new-user-action-mapper';
import { toast } from 'react-toastify';
import { loginErrorReset } from '../../action-mappers/login-action-mapper';
import { IState } from '../../reducers';
import { teal } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { User } from '../../models/User';

const background = {
  image: {
    backgroundRepeat: 'no-repeat',
    width:'100%',
    height:'100%',
    backgroundImage: `url(${"https://storage.googleapis.com/p2-fellowship/Project-Images/register.jpg"})`
  }
}

export const NewUserComponent:FunctionComponent<any> = ((props) => {
    const classes = useStyles();

    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    const [confirmPassword, changeConfirmPassword] = useState("")
    const [firstName, changeFirstName] = useState('')
    const [lastName, changeLastName] = useState('')
    const [affiliation, changeAffiliation] = useState('')
    const [address, changeAddress] = useState('')
    const [email, changeEmail] = useState('')
    const [image, changeImage] = useState<any>(undefined)

  const updateUsername = (event:any) => {
      event.preventDefault()
      changeUsername(event.currentTarget.value)
  }
  const updatePassword = (event: any) => {
    event.preventDefault()
    changePassword(event.currentTarget.value)
  }
  const updateConfirmPassword = (e:any) => {
    e.preventDefault()
    changeConfirmPassword(e.currentTarget.value)
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

  const thisUser = useSelector((state:IState) => {
    return state.loginState.currUser
  })

  const errorMessage = useSelector((state:IState) => {
    return state.loginState.errorMessage
  })

  const newUserSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if(password !== confirmPassword){
      toast.error('Passwords Do Not Match!')
    }
    let newUser: User = {
      userId:0,
      username, 
      password, 
      firstName, 
      lastName, 
      affiliation, 
      placesVisited:0, //0 because new
      address, 
      email, 
      role:"User", //"user" becuase admin has to grant power
      image
    }
    //sending the user to the action mapper
    //should set thisUser or errorMessage
    let thunk = newUserActionMapper(newUser)
    dispatch(thunk)
  }  
  //if error
  useEffect(()=>{
    if(errorMessage){
        toast.error(errorMessage)
        dispatch(loginErrorReset())
    }
  })
    
  useEffect(()=>{
    //if sign up successful
    if(thisUser){
      console.log(`the current user ${thisUser}`); //check
      //send to profile page
      props.history.push(`/users/profile/${thisUser.userId}`)
    }
  })


  return (
     <div style={background.image}>
       
     <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Card className={classes.card}>
          <form autoComplete="off" onSubmit={newUserSubmit} className={classes.form} noValidate>
            <Typography className={classes.registerMessage}>
              Join the expedition!
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={updateUsername}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={updatePassword}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={updateConfirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={updateEmail}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  label="First Name"
                  value={firstName}
                  onChange={updateFirstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={updateLastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  label="Affiliation"
                  value={affiliation}
                  onChange={updateAffiliation}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  label="Address"
                  value={address}
                  onChange={updateAddress}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="file">Profile Picture</label> <br/>
                <input type="file" name="file" accept="image/*" onChange={updateImage} />
                <img src={image} width="100%"/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                > Register
                </CustomButton>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Link to= "/" style={{ textDecoration:"none"}}>
                <CustomButton
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                > Cancel 
                </CustomButton>
                </Link>
              </Grid>
            </Grid>            
          </form>
          </Card>
        </div>
      </Container>
      </div>
    )
})

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width:"100%",
  },
  registerMessage: {
    marginTop: 5,
    fontSize: 25,
    fontFamily: "Bookman Old Style",
    alignItems:'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
    //background color?
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
     }
  }
}))(Button);

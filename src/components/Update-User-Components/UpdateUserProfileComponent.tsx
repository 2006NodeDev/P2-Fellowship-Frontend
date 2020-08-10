import React, { FunctionComponent, SyntheticEvent, useState, useEffect } from "react";
import { Button, TextField, makeStyles, Container, CssBaseline, Typography, Grid, withStyles } from "@material-ui/core";
import { Link, useParams, } from 'react-router-dom';
import { teal } from "@material-ui/core/colors";
import { toast } from 'react-toastify'
import { updateUserActionMapper, updateUserErrorReset } from "../../action-mappers/update-user-action-mapper";
import { useSelector, useDispatch } from "react-redux";
import { createStyles } from '@material-ui/core/styles';
import { IState } from "../../reducers";
import { User } from "../../models/User";

const CustomButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[700]),
    backgroundColor: "teal[700]",
    '&:hover': {
      backgroundColor: teal[800],
     }
  }
}))(Button);

//styles at the bottom because closer to html return
const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    label: {
      fontSize: 30,
      fontFamily: "Bookman Old Style"
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: teal[700],
      color: 'white',
      //background color?
      fontFamily: "Bookman Old Style",
      fontSize: 16
    },
    noUser: {
      marginTop: theme.spacing(3),
      height:25,
      width:240,
      alignItems:'center',
      margin: 'auto',
      fontFamily: "Bookman Old Style"
    }

  }));

export const UpdateUserProfileComponent: FunctionComponent<any> = (props) => {
  const classes = useStyles();

  let { userId } = useParams()

  let [username, changeUsername] = useState("")
  let [password, changePassword] = useState("")
  let [confirmPassword, changeConfirmPassword] = useState("")
  let [firstName, changeFirstName] = useState("")
  let [lastName, changeLastName] = useState("")
  let [affiliation, changeAffiliation] = useState("")
  let [address, changeAddress] = useState("")
  let [email, changeEmail] = useState("")
  let [image, changeImage] = useState<any>(undefined)

  const updateUsername = (e: any) => {
    e.preventDefault()
    changeUsername(e.currentTarget.value)
  }
  const updatePassword = (e: any) => {
    e.preventDefault()
    changePassword(e.currentTarget.value)
  }
  const updateConfirmPassword = (e: any) => {
    e.preventDefault()
    changeConfirmPassword(e.currentTarget.value)
  }
  const updateFirstName = (e: any) => {
    e.preventDefault()
    if (e.currentTarget.value !== '') {
      changeFirstName(e.currentTarget.value)
    }
  }
  const updateLastName = (e: any) => {
    e.preventDefault()
    if (e.currentTarget.value !== '') {
      changeLastName(e.currentTarget.value)
    }
  }
  const updateAffiliation = (e: any) => {
    e.preventDefault()
    if (e.currentTarget.value !== '') {
      changeAffiliation(e.currentTarget.value)
    }
  }
  const updateAddress = (e: any) => {
    e.preventDefault()
    if (e.currentTarget.value !== '') {
      changeAddress(e.currentTarget.value)
    }
  }
  const updateEmail = (e: any) => {
    e.preventDefault()
    if (e.currentTarget.value !== '') {
      changeEmail(e.currentTarget.value)
    }
  }

  const updateImage = (e: any) => {
    e.preventDefault()
    //type file has array called files, since you could upload multiple. Thus we speficy we want only want the first 
    let file: File = e.currentTarget.files[0]
    //utlize FileReader - the old way of doing it without promises
    let reader = new FileReader()
    //start an async function on reader object
    reader.readAsDataURL(file)
    //set a callback for when it's done reading
    reader.onload = () => {
      console.log(reader.result); //to see binary representation of the image
      changeImage(reader.result)
    }
  }

  const dispatch = useDispatch()

  //the current user updating their profile
  const currentUser = useSelector((state: IState) => {
    return state.loginState.currUser
  })

  //the updated profile
  const updatedUser = useSelector((state: IState) => {
    return state.userEditState.edittedUser
  })
  const errorMessage = useSelector((state: IState) => {
    return state.userEditState.errorMessage
  })

  const updateThisUser = async (e: SyntheticEvent) => {
    e.preventDefault()
    if(password !== confirmPassword){
      toast.error('Passwords Do Not Match!')
    }
    let updatedUser:User = {
      userId, 
      username, 
      password, 
      firstName, 
      lastName, 
      affiliation, 
      placesVisited: (currentUser?.placesVisited || 0), 
      address, 
      email, 
      role: "User", 
      image
    }
    let thunk = updateUserActionMapper(updatedUser)
    dispatch(thunk)
  }
  
  //if error
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(updateUserErrorReset())
    }
  })

  useEffect(() =>{
    if (updatedUser){ //send to profile of updated user
      props.history.push(`/users/profile/${updatedUser.userId}`)
    }
  })
 
  return (
    (currentUser)?
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography className={classes.label}>
            Update User Profile
          </Typography>
          <form autoComplete="off" onSubmit={updateThisUser} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="username"
                  label="New Username"
                  name="username"
                  value={username}
                  onChange={updateUsername}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="New Password"
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
                  fullWidth
                  id="email"
                  label="Change Email"
                  name="email"
                  value={email}
                  onChange={updateEmail}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="Change First Name"
                  name="firstName"
                  value={firstName}
                  onChange={updateFirstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Change Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={updateLastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="Affiliation"
                  label="Change Affiliation"
                  name="affiliation"
                  value={affiliation}
                  onChange={updateAffiliation}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Change Address"
                  name="address"
                  value={address}
                  onChange={updateAddress}
                />
              </Grid>
              <Grid>
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="file">Change Profile Picture</label> <br />
                <input type="file" name="file" accept="image/*" onChange={updateImage} />
                <img src={image} width="100%" />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <CustomButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  > Update
                </CustomButton>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <CustomButton
                    type="submit"
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
        </div>
      </Container>
    : 
    <div>
      <h3> Please log in to view</h3>
    </div>
  )
}

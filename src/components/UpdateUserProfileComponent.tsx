import React, { FunctionComponent, SyntheticEvent, useState } from "react";
// import { Button, TextField, makeStyles, Container, CssBaseline, Typography, Grid, withStyles } from "@material-ui/core";
// import { updateUser } from "../remote/updateUser";
// import { User } from "../models/User";
// import { Link, useParams, RouteComponentProps } from 'react-router-dom';
// import { green, lime } from "@material-ui/core/colors";
// import {toast} from 'react-toastify'

// // interface ISignInProps extends RouteComponentProps{
// //      user:User
// // } //check if this even works

// export const UpdateUserProfileComponent:FunctionComponent<any> = (props) =>{
//     const classes = useStyles();

//     let {userId} = useParams()

//     let [username, changeUsername] = useState("") 
//     let [password, changePassword] = useState("")
//     let [confirmPassword, changeConfirmPassword] = useState("")
//     let [firstName, changeFirstName] = useState("")
//     let [lastName, changeLastName] = useState("")
//     let [email, changeEmail] = useState("")
//     let [image, changeImage] = useState(undefined)

//     const updateUsername = (e:any) => {
//         e.preventDefault()
//         changeUsername(e.currentTarget.value)
//     }
//     const updatePassword = (e:any) => {
//         e.preventDefault()
//         changePassword(e.currentTarget.value)
//     }
//     const updateConfirmPassword = (e:any) => {
//         e.preventDefault()
//         changeConfirmPassword(e.currentTarget.value)
//     }
//     const updateFirstName = (e:any) => {
//         e.preventDefault()
//         if (e.currentTarget.value !== ''){
//             changeFirstName(e.currentTarget.value)
//         } 
//     }
//     const updateLastName = (e:any) => {
//         e.preventDefault()
//         if (e.currentTarget.value !== ''){
//             changeLastName(e.currentTarget.value)
//         } 
//     } 
//     const updateEmail = (e:any) => {
//         e.preventDefault()
//         if (e.currentTarget.value !== ''){
//             changeEmail(e.currentTarget.value)
//         } 
//     }
//     const updateImage = (e:any) => {
//         e.preventDefault()
//         //type file has array called files, since you could upload multiple. Thus we speficy we want only want the first 
//         let file:File = e.currentTarget.files[0]
//         //utlize FileReader - the old way of doing it without promises
//         let reader = new FileReader()
//         //start an async function on reader object
//         reader.readAsDataURL(file)
//         //set a callback for when it's done reading
//         reader.onload = () =>{
//             console.log(reader.result); //to see binary representation of the image
//             changeImage(reader.result) 
//         }
//     }

//     const updateUser = async (e:SyntheticEvent) => {
//         e.preventDefault() // always have to prevent default of refreshing the page
//         if(password !== confirmPassword){
//             toast.error('Passwords Do Not Match!')
//         } else if (username && props.user.image && !image){
//             toast.error('Please re-upload image so that file can be updated to match username!')
//         } else if (!username){
//             username = props.user.username
//             let updatedUser: User = { //assign values to new user
//               userId,
//               username,
//               password,
//               firstName,
//               lastName,
//               affiliation:"none",
//               placesVisited:0,
//               address:"",
//               email,
//               role: "Member",
//               image 
//           }
//           let res = await updateUser(updatedUser) //make sure endpoint returns new user
//           props.history.push(`/user/profile/${res.userId}`) //send too profile page (or elsewhere?)
//         } else {
//             let updatedUser: User = { //assign values to new user
//               userId,
//               username,
//               password,
//               firstName,
//               lastName,
//               affiliation:"none",
//               placesVisited:0,
//               address:"",
//               email,
//               role: "Member",
//               image  
//             }
//             let res = await updateUser(updatedUser) //make sure endpoint returns new user
//             props.history.push(`/user/profile/${res.userId}`) //send too profile page (or elsewhere?)
//         }
//     }

//     return (
//         <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div className={classes.paper}>
//           <Typography component="h1" variant="h5">
//             Update User Profile
//           </Typography>
//           <form autoComplete="off" onSubmit={updateUser} className={classes.form} noValidate>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   id="username"
//                   label="New Username"
//                   name="username"
//                   value={username}
//                   onChange={updateUsername}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   name="password"
//                   label="New Password"
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={updatePassword}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   name="confirm-password"
//                   label="Confirm New Password"
//                   type="password"
//                   id="confirm-password"
//                   value={confirmPassword}
//                   onChange={updateConfirmPassword}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   variant="outlined"
//                   fullWidth
//                   id="email"
//                   label="Change Email/include for email with updated info"
//                   name="email"
//                   value={email}
//                   onChange={updateEmail}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   variant="outlined"
//                   fullWidth
//                   id="firstName"
//                   label="Change First Name"
//                   name="firstName"
//                   value={firstName}
//                   onChange={updateFirstName}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   variant="outlined"
//                   fullWidth
//                   id="lastName"
//                   label="Change Last Name"
//                   name="lastName"
//                   value={lastName}
//                   onChange={updateLastName}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <label htmlFor="file">Change Profile Picture</label> <br/>
//                 <input type="file" name="file" accept="image/*" onChange={updateImage} />
//                 <img src={image} width="100%"/>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <CustomButton
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   color="primary"
//                   className={classes.submit}
//                 > Update
//                 </CustomButton>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Link to= "/home" style={{ textDecoration:"none"}}>
//                 <CustomButton
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   color="primary"
//                   className={classes.submit}
//                 > Cancel 
//                 </CustomButton>
//                 </Link>
//               </Grid>
//             </Grid>            
//           </form>
//         </div>
//       </Container>
//     )
// }
// const CustomButton = withStyles((theme) => ({
//   root: {
//       color: theme.palette.getContrastText(lime[700]),
//       backgroundColor: "lime[700]",
//       '&:hover': {
//         backgroundColor: green[900],
//       },
//   },
// }))(Button);

// //styles at the bottom because closer to html return
// const useStyles = makeStyles((theme) => ({
//     paper: {
//       marginTop: theme.spacing(8),
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//     },
//     avatar: {
//       margin: theme.spacing(1),
//       backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//       width: '100%',
//       marginTop: theme.spacing(3),
//     },
//     submit: {
//       margin: theme.spacing(3, 0, 2),
//       backgroundColor: lime[700],
//       color: 'white',
//       //background color?
//       fontFamily: "Bookman Old Style",
//       fontSize: 16
//     },
//     media: {

//     }
// }));
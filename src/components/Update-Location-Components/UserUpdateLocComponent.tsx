 import React, { FunctionComponent, SyntheticEvent, useState, useEffect } from "react";
// import { Button, TextField, makeStyles, Container, CssBaseline, Typography, Grid, withStyles, FormControlLabel, Checkbox } from "@material-ui/core";
// import { Link, useParams, RouteComponentProps } from 'react-router-dom';
// import { green, lime } from "@material-ui/core/colors";
// import { toast } from 'react-toastify'
// import { useDispatch, useSelector } from "react-redux";
// import { userUpdateLocationActionMapper, updateLocationErrorReset } from "../../action-mappers/user-update-location-action-mapper";
// import { IState } from "../../reducers";
// import { LoginComponent } from "../Login-Component/LoginComponent";


// export const UserUpdateLocationComponent: FunctionComponent<any> = (props) => {
//     const classes = useStyles();
//     const user = useSelector((state: IState) => {
//         return state.loginState.currUser
//     })


//     let { locationId } = useParams()
//     //let {userId} = req.user.userId
//     //clearly this doesn't work, but we need to get the userId somehow

//     const [image, changeImage] = useState<any>(null)
//     const [rating, changeRating] = useState(0)
//     const [visited, changeVisited] = useState({ checkBox: false })

//     const updateRating = (event: any) => {
//         event.preventDefault()
//         changeRating(event.currentTarget.value)
//     }
//     const updateVisited = (event: any) => {
//         event.preventDefault()
//         changeVisited(event.currentTarget.value)
//     }

//     const updateImage = (event: any) => {
//         let file: File = event.currentTarget.files[0]
//         let reader = new FileReader()
//         reader.readAsDataURL(file)
//         reader.onload = () => {
//             changeImage(reader.result)
//         }
//     }


//     if (!user) {
//         return (
//             <LoginComponent />
//         )
//     }
//     const dispatch = useDispatch()


//     const updateThisLocation = async (e: SyntheticEvent) => {
//         e.preventDefault()
//         let thunk = userUpdateLocationActionMapper(locationId, user.userId, visited, rating, image)
//         dispatch(thunk)

//     }
//     const updatedLocation = useSelector((state: IState) => {
//         return state.locationProfileState.profLocation
//     })

//     const errorMessage = useSelector((state: IState) => {
//         return state.locationProfileState.errorMessage
//     })

//     useEffect(() => {
//         if (errorMessage) {
//             toast.error(errorMessage)
//             dispatch(updateLocationErrorReset())
//         }
//     })

//     useEffect(() => {
//         if (updatedLocation) {
//             props.history.push(`/profile/${updatedLocation.locationId}`)

//         }
//     })

//     return (
//         <Container component="main" maxWidth="xs">
//             <CssBaseline />
//             <div className={classes.paper}>
//                 <Typography component="h1" variant="h5">
//                     Update Location Info
//           </Typography>
//                 <form autoComplete="off" onSubmit={updateThisLocation} className={classes.form} noValidate>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}>
//                             <FormControlLabel
//                                 control={<GreenCheckbox checked={visited.checkBox} onChange={updateVisited} name="checkBox" />}
//                                 label="Yes"
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 variant="outlined"
//                                 fullWidth
//                                 id="rating"
//                                 label="Change Rating"
//                                 name="rating"
//                                 value={rating}
//                                 onChange={updateRating}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <label htmlFor="file">Change Profile Picture</label> <br />
//                             <input type="file" name="file" accept="image/*" onChange={updateImage} />
//                             <img src={image} width="100%" />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <CustomButton
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 color="primary"
//                                 className={classes.submit}
//                             > Update
//                 </CustomButton>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <Link to="/home" style={{ textDecoration: "none" }}>
//                                 <CustomButton
//                                     type="submit"
//                                     fullWidth
//                                     variant="contained"
//                                     color="primary"
//                                     className={classes.submit}
//                                 > Cancel
//                 </CustomButton>
//                             </Link>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </div>
//         </Container>
//     )
// }
// //buttons
// const CustomButton = withStyles((theme) => ({
//     root: {
//         color: theme.palette.getContrastText(lime[700]),
//         backgroundColor: "lime[700]",
//         '&:hover': {
//             backgroundColor: green[900],
//         },
//     },
// }))(Button);

// //checkbox
// const GreenCheckbox = withStyles({
//     root: {
//         color: green[400],
//         '&$checked': {
//             color: green[600],
//         },
//     },
//     checked: {},
// })((props) => <Checkbox color="default" {...props} />);

// //styles at the bottom because closer to html return
// const useStyles = makeStyles((theme) => ({
//     paper: {
//         marginTop: theme.spacing(8),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%',
//         marginTop: theme.spacing(3),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//         backgroundColor: lime[700],
//         color: 'white',
//         //background color?
//         fontFamily: "Bookman Old Style",
//         fontSize: 16
//     },
//     media: {

//     }
// }));

// export { }
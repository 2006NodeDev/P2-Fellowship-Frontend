import React, { FunctionComponent, SyntheticEvent, useState, useEffect } from "react";
import { Button, TextField, makeStyles, Container, CssBaseline, Typography, Grid, withStyles } from "@material-ui/core";
import { updateLocation } from "../remote/updateLocation";
import { User } from "../models/User";
import { Link, useParams, RouteComponentProps } from 'react-router-dom';
import { green, lime } from "@material-ui/core/colors";
import {toast} from 'react-toastify'
import { Location } from "../models/Location";
import { LocationImage } from "../models/LocationImage";
import { updateLocationErrorReset, updateLocationActionMapper } from "../action-mappers/update-location-action-mapper";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../reducers";



export const UpdateLocationProfileComponent:FunctionComponent<any> = (props) =>{
    const classes = useStyles();

    let {location_Id} = useParams()

    const [name, changeName] = useState("") 
    const [image, changeImage] = useState<any>(undefined)
    const [realm, changeRealm] = useState("")
    const [governance, changeGovernance] = useState("")
    const [primaryPopulation, changePrimaryPopulation] = useState("")
    const [description, changeDescription] = useState("")
    const [rating, changeRating] = useState(0)
    const [numVisited, changeNumVisited] = useState(0)

    const updateName = (e:any) => {
        e.preventDefault()
        changeName(e.currentTarget.value)
    }
    const updateRealm = (e:any) => {
        e.preventDefault()
        changeRealm(e.currentTarget.value)
    }
    const updateGovernance = (e:any) => {
        e.preventDefault()
        changeGovernance(e.currentTarget.value)
    }
    const updatePrimaryPopulation = (e:any) => {
        e.preventDefault()
        if (e.currentTarget.value !== ''){
            changePrimaryPopulation(e.currentTarget.value)
        } 
    }
    const updateDescription = (e:any) => {
        e.preventDefault()
        if (e.currentTarget.value !== ''){
            changeDescription(e.currentTarget.value)
        } 
    } 
    const updateRating = (e:any) => {
        e.preventDefault()
        if (e.currentTarget.value !== ''){
            changeRating(e.currentTarget.value)
        } 
    }
    const updateNumVisited = (e:any) => {
        e.preventDefault()
        if (e.currentTarget.value !== ''){
            changeNumVisited(e.currentTarget.value)
        } 
    }
    const updateImage = (e:any) => {
        e.preventDefault()
        //type file has array called files, since you could upload multiple. Thus we speficy we want only want the first 
        let file:File = e.currentTarget.files[0]
        //utlize FileReader - the old way of doing it without promises
        let reader = new FileReader()
        //start an async function on reader object
        reader.readAsDataURL(file)
        //set a callback for when it's done reading
        reader.onload = () =>{
            console.log(reader.result); //to see binary representation of the image
            changeImage(reader.result) 
        }
    }
    
    const dispatch = useDispatch()
    
    const updateThisLocation = async (e:SyntheticEvent) => {
      e.preventDefault()        
        let thunk = updateLocationActionMapper(location_Id, name, image, realm, governance, primaryPopulation, description, rating, numVisited)
        dispatch(thunk) 
        
    }
    const updatedLocation= useSelector((state:IState) => {
      return state.locationState.currLocation
    })

    const errorMessage = useSelector((state:IState) => {
      return state.locationState.errorMessage
    })

    useEffect(() => {
      if(errorMessage){
        toast.error(errorMessage)
        dispatch(updateLocationErrorReset())
      }
    })

    useEffect(()=>{
      if(updatedLocation){
        props.history.push(`/profile/${updatedLocation.locationId}`)

      }
    })
    
    // const updateThisLocation = async (e:SyntheticEvent) => {
    //     e.preventDefault() // always have to prevent default of refreshing the page
    //    if (!name){
    //         name = props.location.name
    //         let updatedLocation: Location = { //assign values to new user
    //           locationId:0,
    //           name,
    //           image:[],
    //           realm,
    //           governance,
    //           primaryPopulation,
    //           description,
    //           rating:0,
    //           numVisited:0
    //         }
    //       let res = await updateLocation(updatedLocation) //make sure endpoint returns new user
    //       props.history.push(`/locations/profile/${res.locationId}`) //send too profile page (or elsewhere?)
    //     } else {
    //         let location: Location = { //assign values to new user
    //             locationId:0,
    //             name,
    //             image:[],
    //             realm,
    //             governance,
    //             primaryPopulation,
    //             description,
    //             rating:0,
    //             numVisited:0 
    //         }
    //         let res = await updateLocation(location) //make sure endpoint returns new user
    //         props.history.push(`/locations/profile/${res.locationId}`) //send too profile page (or elsewhere?)
    //     }
    // }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Update Location Info
          </Typography>
          <form autoComplete="off" onSubmit={updateThisLocation} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="name"
                  label="New Name"
                  name="Name"
                  value={name}
                  onChange={updateName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="realm"
                  label="New Realm"
                  id="realm"
                  value={realm}
                  onChange={updateRealm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="governance"
                  label="New Governance"
                  id="governance"
                  value={governance}
                  onChange={updateGovernance}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="primaryPopulation"
                  label="New Primary Population"
                  name="primary-population"
                  value={primaryPopulation}
                  onChange={updatePrimaryPopulation}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="description"
                  label="Change Description"
                  name="description"
                  value={description}
                  onChange={updateDescription}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="rating"
                  label="Change Rating"
                  name="rating"
                  value={rating}
                  onChange={updateRating}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="numVisited"
                  label="Update Number of Users who Visited"
                  name="numVisited"
                  value={numVisited}
                  onChange={updateNumVisited}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="file">Change Profile Picture</label> <br/>
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
                > Update
                </CustomButton>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Link to= "/home" style={{ textDecoration:"none"}}>
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
    )
}
const CustomButton = withStyles((theme) => ({
  root: {
      color: theme.palette.getContrastText(lime[700]),
      backgroundColor: "lime[700]",
      '&:hover': {
        backgroundColor: green[900],
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
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: lime[700],
      color: 'white',
      //background color?
      fontFamily: "Bookman Old Style",
      fontSize: 16
    },
    media: {

    }
}));
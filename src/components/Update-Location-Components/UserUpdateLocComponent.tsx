import React, { FunctionComponent, SyntheticEvent, useState, useEffect } from "react";
import { Button, TextField, makeStyles, Container, CssBaseline, Typography, Grid, withStyles } from "@material-ui/core";
import { User } from "../../models/User";
import { Link, useParams, RouteComponentProps } from 'react-router-dom';
import { green, lime } from "@material-ui/core/colors";
import {toast} from 'react-toastify'
import { Location } from "../../models/Location";
import { LocationImage } from "../../models/LocationImage";
import { useDispatch, useSelector } from "react-redux";
import { updateLocationActionMapper, updateLocationErrorReset } from "../../action-mappers/update-location-action-mapper";
import { IState } from "../../reducers";

// interface ISignInProps extends RouteComponentProps{
//      user:User
// } //check if this even works

export const UpdateLocationProfileComponent:FunctionComponent<any> = (props) =>{
    const classes = useStyles();

    let {location_Id} = useParams()

    const [name, changeName] = useState('')
    const [image, changeImage] = useState<any>(null)
    const [realm, changeRealm] = useState('')
    const [governance, changeGovernance] = useState('')
    const [primaryPopulation, changePrimaryPopulation] = useState('')
    const [type, changeType] = useState('')
    const [description, changeDescription] = useState('')
    const [rating, changeRating] = useState(0)
    const [numVisited, changeNumVisited] = useState(0)

  const updateName = (event:any) => {
      event.preventDefault()
      changeName(event.currentTarget.value)
  }
  const updateRealm = (event:any) => {
    event.preventDefault()
    changeRealm(event.currentTarget.value)
  }
  const updateGovernance = (event:any) => {
    event.preventDefault()
    changeGovernance(event.currentTarget.value)
}
  const updateprimaryPopulation = (event:any) => {
      event.preventDefault()
      changePrimaryPopulation(event.currentTarget.value)
  }
  const updateType = (event:any) => {
      event.preventDefault()
      changeType(event.currentTarget.value)
  }
  const updateDescription = (event:any) => {
    event.preventDefault()
    changeDescription(event.currentTarget.value)
}
const updateRating = (event:any) => {
    event.preventDefault()
    changeRating(event.currentTarget.value)
}
const updateNumVisited = (event:any) => {
    event.preventDefault()
    changeNumVisited(event.currentTarget.value)
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
    //         let updatedLocation: Location = { //assign values to new user
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
    //         let res = await updateLocation(updatedLocation) //make sure endpoint returns new user
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
                  onChange={updateprimaryPopulation}
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
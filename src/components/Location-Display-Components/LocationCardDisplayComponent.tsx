import React, { FunctionComponent, useEffect, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Location } from '../../models/Location'
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom';
import { teal } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { getLocationProfile } from '../../remote/location-service/getLocationProfile';
import { FullLocationProfileComponent } from './FullLocationDisplayComponent';

interface ILocationDisplayProps {
    location: Location
}

const FancyButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[700]),
    backgroundColor: "teal[700]",
    '&:hover': {
      backgroundColor: teal[800],
    },
  },
}))(Button);

const useStyles = makeStyles({ //customize this more!
    root: {
      margin: "auto",
      minWidth: 275,
      maxWidth:500
    },
    media: {
      height:"auto",
      width: "100%",
      margin: "auto",
    },
    name: {
      fontSize: 20,
      fontFamily: "Bookman Old Style"
    },
    info : {
      color: "textSecondary",
      fontFamily: "Bookman Old Style"
    }
})


export const LocationCardDisplayComponent: FunctionComponent<ILocationDisplayProps> = (props) =>{ 
    let classes = useStyles();
    const [locationProfile, changeLocationProfile] = useState<any>(null);
    
    let {locationId} = useParams()

    useEffect(()=>{
        //we define an async operation we want to run
        let getLocation = async ()=>{
            //we await user info and then call a state updat function with it
            let locationInfo = await getLocationProfile(locationId)
            changeLocationProfile(locationInfo)
        }
        //if we haven't gotten a user profile yet
        if(!locationProfile || locationProfile.locationId !== +locationId){
            //go get the user
            getLocation()
        }
        //else do nothing
    })
   

    return (
      (locationProfile)?
      <Card className={classes.root} >
        <CardContent>
               <CardMedia
                className={classes.media}
                image={locationProfile.image}
               />
          <Typography className={classes.name} gutterBottom>
            {locationProfile.name}
          </Typography>
          <Typography className={classes.info}>
            REALM : {locationProfile.realm}
          </Typography>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">RATING</Typography>
            <Rating name="read-only" value={locationProfile.rating} readOnly />
          </Box>
          <Typography className={classes.info}>
            {locationProfile.numVisited} people have visited this location.
          </Typography>
        </CardContent>
        <CardActions>
          <FancyButton>
            <Link to='/locations/profile/:locationId' >
              Details
            </Link>
          </FancyButton>
        </CardActions> 
      </Card>

    :

    <div>
      <h3> Location Doesn't Exist (yet.)</h3>
    </div>
    );
}
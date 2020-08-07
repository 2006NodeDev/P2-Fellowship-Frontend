import React, { FunctionComponent, useEffect, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Location } from '../../models/Location'
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Grid } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom';
import { teal } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { getLocationProfile } from '../../remote/location-service/getLocationProfile';
import { FullLocationDisplayComponent } from './FullLocationDisplayComponent';
import { SingleImageDisplay } from './SingleImageDisplay';

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
    maxWidth: 500
  },
  media: {
    height: "auto",
    width: "100%",
    margin: "auto",
  },
  name: {
    fontSize: 20,
    fontFamily: "Bookman Old Style"
  },
  info: {
    color: "textSecondary",
    fontFamily: "Bookman Old Style"
  }
})


export const LocationCardDisplayComponent: FunctionComponent<ILocationDisplayProps> = (props) => {
  let classes = useStyles();

  return (

    (props.location) ?
      <div>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          
        <Card className={classes.root} >
          <CardContent> 
              <SingleImageDisplay location={props.location} />
              {/* <CardMedia
                className={classes.media}
                src={props.location.image[0]}
                component="img"
                title="Profile Picture"
              /> */}

              <Typography className={classes.name} gutterBottom>
                {props.location.name}
              </Typography>
              <Typography className={classes.info}>
                REALM : {props.location.realm}
              </Typography>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">RATING</Typography>
                <Rating name="read-only" size="large" value={props.location.rating} readOnly />
              </Box>
              <Typography className={classes.info}>
                {props.location.numVisited} people have visited this location.
              </Typography>
          </CardContent>

            <CardActions>
              <FancyButton>
                <Link to={`/locations/profile/${props.location.locationId}`}>
                  Details
              </Link>
              </FancyButton>
            </CardActions>

          </Card>
        </Grid>
      </div>

      :

      <div>
        <h3> Location Doesn't Exist (yet.)</h3>
      </div>
  );
}
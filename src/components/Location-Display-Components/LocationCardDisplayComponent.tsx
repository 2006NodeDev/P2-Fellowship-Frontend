import React, { FunctionComponent, useEffect, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Location } from '../../models/Location'
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { teal } from '@material-ui/core/colors';

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

export const DisplayLocationCardComponent: FunctionComponent<ILocationDisplayProps> = (props) =>{ 
    let classes = useStyles();
    return (
      <Card className={classes.root} >
        <CardContent>
        <CardMedia
        //   component = "img"
        //   className={classes.media}
        //   alt="Profile Picture"
        //   image={props.location.image} 
        //   THIS WILL JUST BE THE FIRST IMAGE OF THE LOCATION
        />
          <Typography className={classes.name} gutterBottom>
            Place: {props.location.name}
          </Typography>
          <Typography className={classes.info}>
            Realm : {props.location.realm}
          </Typography>
          <Typography className={classes.info}>
            Rating : {props.location.rating} {/*Figure out a way to display the stars here */}
          </Typography>
          <Typography className={classes.info}>
            {props.location.numVisited} people have visited this location
          </Typography>
        </CardContent>
        <CardActions>
        <Link to= "/locationprofile link" style={{ textDecoration:"none"}}>
          <FancyButton variant="contained">
            View Info
          </FancyButton>
        </Link>
        </CardActions> 
      </Card>
    );
}
import React, { FunctionComponent } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Location } from '../../models/Location'
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { teal } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { SingleImageDisplay } from './SingleImageDisplay';

interface ILocationDisplayProps {
  location: Location
}

const useStyles = makeStyles({ //customize this more!
  root: {
    margin: "auto",
    minWidth: 275,
    maxWidth: 500,
    justifyContent: "center",
    alignItems: "center",

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
  },
  submit: {
    backgroundColor: teal[700],
    color: 'white',
    fontFamily: "Bookman Old Style",
    fontSize: 16,
  }
})

const CustomButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[700]),
    backgroundColor: "teal[700]",
    '&:hover': {
      backgroundColor: teal[800],
    },
  },
}))(Button);

export const LocationCardDisplayComponent: FunctionComponent<ILocationDisplayProps> = (props) => {
  const classes = useStyles();

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
              <Typography className={classes.name} gutterBottom>
                {props.location.name}
              </Typography>
              <Typography className={classes.info}>
                REALM : {props.location.realm}
              </Typography>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">RATING</Typography>
                <Rating name="read-only" size="large" value={props.location.rating} precision={0.5} readOnly />
              </Box>
              <Typography className={classes.info}>
                {props.location.numVisited || 0} people have visited this location.
            </Typography>

            </CardContent>
            <CardActions className={classes.root}>

              <Link to={`/locations/profile/${props.location.locationId}`} style={{ textDecoration: "none" }} >
                <CustomButton variant="contained" className={classes.submit}>
                  Details
              </CustomButton>

              </Link>
            </CardActions>


          

          </Card>
        </Grid>
      </div>

      :
      <div>
        <h3> Location Doesn't Exist</h3>
      </div>
  );
}
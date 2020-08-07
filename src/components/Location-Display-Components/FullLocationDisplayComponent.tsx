//display a location's profile in detail

import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent, useState, useEffect, SyntheticEvent } from 'react'
import { useParams, Redirect } from 'react-router'
import { Grid, Paper, makeStyles, createStyles, Theme, CardActionArea, Card, CardContent, Typography, Hidden, CardMedia, Button, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Location } from '../../models/Location';
import { getLocationProfile } from '../../remote/location-service/getLocationProfile';
import Rating from '@material-ui/lab/Rating';
import { GridImageDisplay } from './GridImageDisplay';


//rough suggestion of how to grab images form LocationImage[]:
// while(x<length(image array)){
//     if(image[x]){
//         display image

//     }

// }


interface ILocationDisplayProps {
    location: Location
}

const useStyles = makeStyles({
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
    locationInfo: {
        color: "textSecondary",
        fontFamily: "Bookman Old Style"
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});

const styles =
{

    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
        marginTop: '30'
    }
};

export const FullLocationDisplayComponent: FunctionComponent<ILocationDisplayProps> = (props) => {
    const classes = useStyles();

    return (

        (props.location) ?
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    {/* <CardActionArea className={classes.root} component="a" href="#"> */}

                        <Paper className={classes.card}>
                            <div className={classes.cardDetails}>

                                <CardContent>
                                    <Typography component="h2" variant="h5">
                                        {props.location?.name}
                                    </Typography>
                                    <Typography variant="subtitle1" >
                                        REALM: {props.location.realm}
                                    </Typography>
                                    <Typography variant="subtitle1" >
                                        GOVERNANCE: {props.location.governance}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        PRIMARY POPULATION: {props.location.primaryPopulation}
                                    </Typography>
                                    <Typography variant="subtitle1" paragraph>
                                        DESCRIPTION: {props.location.description}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        <Box component="fieldset" mb={3} borderColor="transparent">
                                            <Typography component="legend">RATING</Typography>
                                            <Rating name="read-only" value={props.location.rating} readOnly />
                                        </Box>
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        NUMBER OF VISITORS: {props.location.numVisited}
                                    </Typography>
                                </CardContent>
                            </div>

                        </Paper>
                    {/* </CardActionArea> */}
                    <GridImageDisplay location={props.location} />
                </Grid>
            </div>

            :
            <div>
                <h3> Location Doesn't Exist (yet.)</h3>
            </div>
    )

}
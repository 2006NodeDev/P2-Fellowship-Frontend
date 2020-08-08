//display a location's profile in detail

import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent, useState, useEffect, SyntheticEvent } from 'react'
import { useParams, Redirect } from 'react-router'
import { Grid, Paper, makeStyles, createStyles, Theme, CardActionArea, Card, CardContent, Typography, Hidden, CardMedia, Button, Box, Divider, withStyles, CardActions } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Location } from '../../models/Location';
import Rating from '@material-ui/lab/Rating';
import { grey, teal } from '@material-ui/core/colors';
import { GridImageDisplay } from './GridImageDisplay';
import { useSelector } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/User';
import { UserUpdateLocationComponent } from '../Update-Location-Components/UserUpdateLocComponent';
import { AdminUpdateLocationProfileComponent } from '../Update-Location-Components/AdminUpdateLocComponent';


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
        maxWidth: 500,
        justifyContent: "center",
        alignItems: "center"
    },
    media: {
        height: "auto",
        width: "100%",
        margin: "auto",
    },
    locationName: {
        fontSize: 20,
        fontFamily: "Bookman Old Style"
    },
    locationDetails: {
        color: grey[700],
        fontSize: 14,
        fontFamily: "Bookman Old Style"
    },
    locationDescription: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: "Bookman Old Style"
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
    },

    submit: {
        backgroundColor: teal[700],
        color: 'white',
        fontFamily: "Bookman Old Style",
        fontSize: 16,
    }
});

const CustomButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(teal[700]),
        backgroundColor: "teal[700]",
        '&:hover': {
            backgroundColor: teal[800],
        }
    }
}))(Button);

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

    const user = useSelector((state: IState) => {
        return state.loginState.currUser
    })

    const locUpdateComp = () => {
        return (
            (user?.role === "Admin") ?
                <div>
                    <AdminUpdateLocationProfileComponent />
                </div>
                :
                <div>
                    <UserUpdateLocationComponent />
                </div>
        )
    }

    return (

        (user?.role === "Admin") ?
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <GridImageDisplay location={props.location} />

                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.locationName}>
                                {props.location?.name}
                            </Typography>
                            <Typography className={classes.locationDetails} gutterBottom>
                                {props.location.realm}
                            </Typography>
                            <Divider className={classes.divider} />
                            <Typography className={classes.locationDescription}>
                                {props.location.description || ""}
                            </Typography>
                            <Typography className={classes.locationDetails}>
                                {`Governance: ${props.location.governance || `not applicable`}`}
                            </Typography >
                            <Typography className={classes.locationDetails}>
                                {`Primary Population: ${props.location.primaryPopulation || `not applicable`}`}
                            </Typography>
                            <Rating name="read-only" value={props.location.rating} precision={0.5} readOnly />
                            <Typography className={classes.locationDetails}>Average Rating</Typography>
                            <Divider className={classes.divider} />
                            <Typography className={classes.locationDetails}>
                                {props.location.numVisited || 0} People have visited this location
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.root}>
                            <Typography>
                                <Link to={`/locations/profile/${props.location.locationId}/admin/update`}>
                                    <Button variant="contained" className={classes.submit}>Record your visit!</Button>
                                </Link>
                            </Typography>
                        </CardActions>
                    </Card>
                </Grid>
            </div>
            :
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <GridImageDisplay location={props.location} />

                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.locationName}>
                                {props.location?.name}
                            </Typography>
                            <Typography className={classes.locationDetails} gutterBottom>
                                {props.location.realm}
                            </Typography>
                            <Divider className={classes.divider} />
                            <Typography className={classes.locationDescription}>
                                {props.location.description || ""}
                            </Typography>
                            <Typography className={classes.locationDetails}>
                                {`Governance: ${props.location.governance || `not applicable`}`}
                            </Typography >
                            <Typography className={classes.locationDetails}>
                                {`Primary Population: ${props.location.primaryPopulation || `not applicable`}`}
                            </Typography>
                            <Rating name="read-only" value={props.location.rating} precision={0.5} readOnly />
                            <Typography className={classes.locationDetails}>Average Rating</Typography>
                            <Divider className={classes.divider} />
                            <Typography className={classes.locationDetails}>
                                {props.location.numVisited || 0} People have visited this location
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.root}>
                            <Typography>
                                <Link to={`/locations/profile/${props.location.locationId}/user/update`}>
                                    <Button variant="contained" className={classes.submit}>Record your visit!</Button>
                                </Link>
                            </Typography>
                        </CardActions>
                    </Card>
                </Grid>
            </div>


    )

}
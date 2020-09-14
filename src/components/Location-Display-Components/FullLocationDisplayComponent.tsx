//display a location's profile in detail

import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent } from 'react'
import { Grid, makeStyles, Card, CardContent, Typography, Button, Divider, withStyles, CardActions } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Location } from '../../models/Location';
import Rating from '@material-ui/lab/Rating';
import { grey, teal } from '@material-ui/core/colors';
import { GridImageDisplay } from './GridImageDisplay';
import { useSelector } from 'react-redux';
import { IState } from '../../reducers';


interface ILocationDisplayProps {
    location: Location
}

const useStyles = makeStyles({
    root: {
        margin: "auto",
        marginTop: 20,
        minWidth: 275,
        maxWidth: 500,
        justifyContent: "center",
        alignItems: "center"
    },
    media: {
        height: 500,
        width: "100%",
        margin: "auto",
        marginTop: 30
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


export const FullLocationDisplayComponent: FunctionComponent<ILocationDisplayProps> = (props) => {
    const classes = useStyles();

    //get the current user to display page and find permissions
    const user = useSelector((state: IState) => {
        return state.loginState.currUser
    })
    //not tied to state; that's in the location Profile component
    
    return (
        (user)?
            <div>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                <Grid item xs={12} sm={6}>
                    <GridImageDisplay location={props.location} />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                            <Link to={`/locations/profile/update/${props.location.locationId}`} style={{ textDecoration:"none"}}>
                                <CustomButton variant="contained" className={classes.submit}>
                                    Record your visit!
                                </CustomButton>
                            </Link>
                            <Link to={`/locations`} style={{ textDecoration:"none"}}>
                                <CustomButton variant="contained" className={classes.submit}>
                                    Back
                                </CustomButton> {/*Edit the color of the back button */}
                            </Link>
                            {user?.role === "Admin" &&
                                <div>
                                <Link to={`/locations/profile/admin/update/${props.location.locationId}`} style={{ textDecoration:"none"}}>
                                    <CustomButton variant="contained" className={classes.submit}>
                                        Update Location Information
                                    </CustomButton>
                                </Link> 
                                </div>
                            }
                        </CardActions>
                    </Card>
                    </Grid>
                </Grid>
            </div>
            :
            <div>
                <h3> Please log in to view</h3>
            </div>
    )

}
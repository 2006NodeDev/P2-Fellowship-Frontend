//display a user's profile in detail

import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent, useState, useEffect, SyntheticEvent } from 'react'
import { useParams, Redirect } from 'react-router'
import { Grid, Paper, makeStyles, createStyles, Theme, CardActionArea, Card, CardContent, Typography, Hidden, CardMedia, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Location } from '../models/Location';





const useStyles = makeStyles({
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


export const LOTRLocationProfileComponent:FunctionComponent<any> = (props) => {
    let[locationProfile, changelocationProfile] = useState<Location|null>(null)
    let {locationId} = useParams()
   
    const classes = useStyles();
    
    return(
        
        (locationProfile)?
        <div>

           <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
          
            <Card className={classes.card}>
            <div className={classes.cardDetails}>
                <CardContent>
            
                <Typography component="h2" variant="h5">
                    NAME: {locationProfile?.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    REALM: {locationProfile?.realm}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                    GOVERNANCE: {locationProfile?.governance}
                </Typography>
                <Link to = '/contact'>
                    PRIMARY POPULATION: {locationProfile?.primaryPopulation}
                </Link>
                <Typography variant="subtitle1" color="textSecondary">
                    DESCRIPTION: {locationProfile?.description}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    RATING: {locationProfile?.rating}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    NUMBER OF VISITORS: {locationProfile?.numVisited}
                </Typography>
                </CardContent>
            </div>
            
            </Card>
            </CardActionArea>
            </Grid>
            

        </div>
        
        :
        <div>
            <h3> User Not Found</h3>
        </div>
    )

}
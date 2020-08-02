import React, { FunctionComponent, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Location } from '../models/Location'
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import { Link } from 'react-router-dom';

export const DisplayLOTRLocationComponent:FunctionComponent<any> = (props) => {
    //get all the user infomation 
    
    let classes = useStyles()
    //change into a card later if you have time ... 
    return(
        <div className = {classes.root}
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
              
        <Card>
        <CardActionArea>
            <CardMedia
                className={classes.media}
                image=""
                //the image would go here
                title="Location Picture"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                Name: {props.user?.firstName} {props.user?.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Realm: {props.user?.affiliation}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Primary Population: {props.user?.affiliation}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Governance: {props.user?.affiliation}
            </Typography>
                    
            </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="outlined" color="primary">
                <Link to={`/profile/${props.user.userId}`}>
                    Details
                </Link>

                </Button>
                
                
        </CardActions>
        </Card> 
        <br/>          
    
        </div>
    )
    
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});
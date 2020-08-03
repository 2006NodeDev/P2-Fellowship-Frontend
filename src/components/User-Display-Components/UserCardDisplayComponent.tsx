import React, { FunctionComponent, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import { Link } from 'react-router-dom';


export const DisplayUserCardComponent:FunctionComponent<any> = (props) => {
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
                //the user image would go here
                title="User Profile Picture"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                Name: {props.user?.firstName} {props.user?.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Affiliation: {props.user?.affiliation}
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
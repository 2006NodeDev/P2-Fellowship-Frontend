//display a user's profile in partial detail

import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent, useState, useEffect, SyntheticEvent } from 'react'
import { User } from '../../models/User'
import { useParams } from 'react-router'
import { getUserProfile } from '../../remote/user-service/getUserProfile'
import { Grid, makeStyles, CardActions, CardActionArea, Card, CardContent, Typography, CardMedia, Button } from '@material-ui/core'
import { TitleComponent } from '../Title-Component/TitleComponent';
import { Link } from 'react-router-dom'


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
      },
      media: {
        height: 140,
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


export const UserCardDisplayComponent   :FunctionComponent<any> = (props) => {
    let[userProfile, changeUserProfile] = useState<User|null>(null)
    let {userId} = useParams()

    useEffect(()=>{
        //we define an async operation we want to run
        let getUser = async ()=>{
            //we await user info and then call a state updat function with it
            let userInfo = await getUserProfile(userId)
            changeUserProfile(userInfo)
        }
        //if we haven't gotten a user profile yet
        if(!userProfile || userProfile.userId !== +userId){
            //go get the user
            getUser()
        }
        //else do nothing
    })
   
    const classes = useStyles(); 
 
    return(
        
        (userProfile)?
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
        <Card className={classes.root}>
               <CardMedia
                className={classes.media}
                image={userProfile.image}
               />
                <CardContent>
                    {/* Name of User: */}
                <Typography gutterBottom variant="h5" component="h2">
                    {userProfile.firstName} {userProfile.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    AFFILIATION: {userProfile.affiliation}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    ROLE: {userProfile.role}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    PLACES VISITED: {userProfile.placesVisited}
                </Typography>


                </CardContent>
            
        </Card>
        </Grid>
        
        :
        <div>
            <h3> User Not Found</h3>
        </div>
    )

}
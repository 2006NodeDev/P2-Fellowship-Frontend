//display a user's profile in detail

import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent, useState, useEffect, SyntheticEvent } from 'react'
import { User } from '../../models/User'
import { useParams } from 'react-router'
import { getUserProfile } from '../../remote/user-service/getUserProfile'
import { Grid, makeStyles, CardActionArea, Card, CardContent, Typography, CardMedia, Button } from '@material-ui/core'
import { TitleComponent } from '../Title-Component/TitleComponent';
import { Link } from 'react-router-dom'


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


export const UserProfileComponent:FunctionComponent<any> = (props) => {
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
        <div>
             <TitleComponent size='large' title={`Hello ${userProfile.firstName}`}/>
            <Link to='/users/updateuser'>
                <Button>Update Profile</Button>
            </Link>

           <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
          
            <Card className={classes.card}>
            <div className={classes.cardDetails}>
                <CardContent>
            
                <Typography component="h2" variant="h5">
                    NAME: {userProfile.firstName} {userProfile.lastName}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    ROLE: {userProfile.role}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                    AFFILIATION: {userProfile.affiliation}
                </Typography>
                <Link to = '/contact'>
                    EMAIL: {userProfile.email}
                </Link>
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
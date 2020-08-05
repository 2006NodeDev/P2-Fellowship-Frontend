//display a user's profile in partial detail

import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent } from 'react'
import { User } from '../../models/User'
import {makeStyles, Card, CardContent, Typography, CardMedia } from '@material-ui/core'

interface IUserDisplayProps {
  user:User
}

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
  userInfo: {
    color: "textSecondary",
    fontFamily: "Bookman Old Style"
  },
})

export const UserCardDisplayComponent : FunctionComponent<IUserDisplayProps> = (props) => {
    const classes = useStyles(); 
 
    return(

        
        (props.user)?
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
                image={props.user.image}
               />
                <CardContent>
                  <Typography className={classes.name} gutterBottom >
                      NAME: {`${props.user.firstName}  ${props.user.lastName}`}
                  </Typography>
                  <Typography className={classes.userInfo} >
                      AFFILIATION: {props.user.affiliation}
                  </Typography>
                  <Typography className={classes.userInfo} >
                      ROLE: {props.user.role}
                  </Typography>
                  <Typography className={classes.userInfo} >
                      PLACES VISITED: {props.user.placesVisited}
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
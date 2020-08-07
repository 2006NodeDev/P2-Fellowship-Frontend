//display a user's profile in full detail -ADMIN

import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent } from 'react'
import { User } from '../../models/User'
import { makeStyles, CardActions, Card, CardContent, Typography, CardMedia, Button, withStyles, Grid } from '@material-ui/core'
import { teal } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
// import Image from '../../images/Gandalf.jpg'

interface IUserDisplayProps {
    user:User
}

const useStyles = makeStyles({ //customize this more!
    root: {
      margin: "auto",
      minWidth: 275,
      maxWidth:500,
      justifyContent: "center",
      alignItems:"center"
    },
    media: {
      height:"auto",
      width: "100%",
      margin: "auto",
    },
    username: {
      fontSize: 20,
      fontFamily: "Bookman Old Style"
    },
    userInfo: {
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
       }
    }
}))(Button);

export const FullUserDisplayComponent :FunctionComponent<IUserDisplayProps> = (props) => {
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
                component="img"
                title="Profile Picture"
                
            />
            <CardContent>
                    {/* Name of User: */}
                <Typography className={classes.username} gutterBottom>
                    {props.user.firstName} {props.user.lastName}
                </Typography>
                <Typography className={classes.userInfo}>
                      USERNAME: {props.user.username}
                </Typography>
                <Typography className={classes.userInfo}>
                    ROLE: {props.user.role}
                </Typography>
                <Typography className={classes.userInfo}>
                    AFFILIATION: {props.user.affiliation}
                </Typography>
                <Typography className={classes.userInfo}>
                    ADDRESS: {props.user.address}
                </Typography>
                <Typography className={classes.userInfo}>
                    EMAIL: {props.user.email}
                </Typography>
                <Typography className={classes.userInfo}>
                    PLACES VISITED: {props.user.placesVisited}
                </Typography>
            </CardContent>
            <CardActions className={classes.root}>
                <Link to= {`/users/profile/${props.user.userId}/update`} style={{ textDecoration:"none"}}>
                    <CustomButton variant="contained" className={classes.submit}>
                        Update Profile
                    </CustomButton>
                </Link>
            </CardActions>
        </Card>

        </Grid>
        :
        <div>
            <h3> User Not Found</h3>
        </div>

    )
}

  
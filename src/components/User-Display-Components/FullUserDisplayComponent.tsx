//display a user's profile in full detail -ADMIN

import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent } from 'react'
import { User } from '../../models/User'
import { makeStyles, CardActions, Card, CardContent, Typography, CardMedia, Button, withStyles } from '@material-ui/core'
import { teal } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

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
    username: {
      fontSize: 20,
      fontFamily: "Bookman Old Style"
    },
    userInfo: {
      color: "textSecondary",
      fontFamily: "Bookman Old Style"
    },
  })

export const FullUserDisplayComponent :FunctionComponent<IUserDisplayProps> = (props) => {
    const classes = useStyles(); 
 
    return(
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.user.image}
            />
            <CardContent>
                    {/* Name of User: */}
                <Typography className={classes.username} gutterBottom>
                    {props.user.firstName} {props.user.lastName}
                </Typography>
                <Typography className={classes.userInfo}>
                   ID: {props.user.userId}    
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
                <Link to= "/users/profile/:userId/update" style={{ textDecoration:"none"}}>
                    <CustomButton size="small" color="primary">
                        Update Profile
                    </CustomButton>
                </Link>
            </CardActions>
        </Card>
    )
}

const CustomButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(teal[700]),
        backgroundColor: "teal[700]",
        '&:hover': {
          backgroundColor: teal[800],
        },
    },
  }))(Button);
  
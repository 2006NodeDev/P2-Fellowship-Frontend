//display a user's profile in full detail -ADMIN

import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent } from 'react'
import { User } from '../../models/User'
import { makeStyles, CardActions, Card, CardContent, Typography, CardMedia, Button, withStyles, Grid } from '@material-ui/core'
import { teal } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import Image from '../../images/Gandalf.jpg'

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

        
        (props.user)?
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
          <br/>
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                src={Image}
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
                    <Button color="primary">
                        Update Profile
                    </Button>
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

const CustomButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(teal[700]),
        backgroundColor: "teal[700]",
        '&:hover': {
          backgroundColor: teal[800],
        },
    },
  }))(Button);
  
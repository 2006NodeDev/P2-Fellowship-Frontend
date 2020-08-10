//display a user's profile in full detail -ADMIN

import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent, useEffect } from 'react'
import { makeStyles, CardActions, Card, CardContent, Typography, CardMedia, Button, withStyles, Grid } from '@material-ui/core'
import { teal } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { User } from '../../models/User';
import { IState } from '../../reducers';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({ //customize this more!
    root: {
      minWidth: 275,
      maxWidth: 500,
      justifyContent: "center",
      alignItems:"center"
    },
    media: {
      maxHeight: 400,
      width: "auto",
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

interface IUserDisplayProps {
    user:User
}

export const FullUserDisplayComponent :FunctionComponent<IUserDisplayProps> = (props) => {
    const classes = useStyles(); 

    //get user state to see page
    const userProfile = useSelector((state: IState) => {
        return state.userProfileState.profUser
    })

    return(
        (userProfile)?
        <Grid
            container
            spacing={3}
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh', marginTop: 100}}
        >
            <Grid item xs={12} sm={6}>
                <img className={classes.media} alt="Profile Picture" src={props.user.image}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card className={classes.root} >
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
                {props.user.role === "Admin" && 
                    <Link to={`/users/profile/admin/update/${userProfile.userId}`} style={{ textDecoration:"none"}}>
                        <CustomButton variant="contained" className={classes.submit}>
                            Admin Update Profile
                        </CustomButton>
                    </Link>
                }
                {props.user.role === "User" &&
                    <Link to={`/users/profile/update/${userProfile.userId}`} style={{ textDecoration:"none"}}>
                        <CustomButton variant="contained" className={classes.submit}>
                            Update Profile
                        </CustomButton>
                    </Link>
                }
                </CardActions>
            </Card>
        </Grid>

        </Grid>
        :
        <div>
            <h3> User Not Found</h3>
        </div>

    )
}

  
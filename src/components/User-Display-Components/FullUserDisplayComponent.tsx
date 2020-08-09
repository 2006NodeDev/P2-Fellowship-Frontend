//display a user's profile in full detail -ADMIN

import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent, useEffect } from 'react'
import { makeStyles, CardActions, Card, CardContent, Typography, CardMedia, Button, withStyles, Grid } from '@material-ui/core'
import { teal } from '@material-ui/core/colors';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../reducers';
import { userProfileActionMapper, userProfileErrorReset } from '../../action-mappers/user-profile-action-mapper';
import { toast } from 'react-toastify';

const useStyles = makeStyles({ //customize this more!
    root: {
      margin: "auto",
      minWidth: 275,
      maxWidth: 500,
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


export const FullUserDisplayComponent :FunctionComponent<any> = (props) => {
    const classes = useStyles(); 

    let { userId } = useParams()

    const currentUser = useSelector((state: IState) => {
        return state.loginState.currUser
    })

    const dispatch = useDispatch()

    const openProfile = async () => {
        let thunk = userProfileActionMapper(userId)
        dispatch(thunk)
    }
    //the userProfile state is not the current user state in the case of admin, so we need to get both of them to use
    const userProfile = useSelector((state: IState) => {
        return state.userProfileState.profUser
    })

    const errorMessage = useSelector((state: IState) => {
        return state.userProfileState.errorMessage
    })
    
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(userProfileErrorReset())
        }
    })
    //make sure we are actually calling the action mapper
    openProfile();
 
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
       
        <Card className={classes.root} >
            <CardMedia
                className={classes.media}
                style={{marginTop: 20}}
                image={userProfile.image}
                component="img"
                title="Profile Picture"
            />
            <CardContent>
                    {/* Name of User: */}
                <Typography className={classes.username} gutterBottom>
                    {userProfile.firstName} {userProfile.lastName}
                </Typography>
                <Typography className={classes.userInfo}>
                      USERNAME: {userProfile.username}
                </Typography>
                <Typography className={classes.userInfo}>
                    ROLE: {userProfile.role}
                </Typography>
                <Typography className={classes.userInfo}>
                    AFFILIATION: {userProfile.affiliation}
                </Typography>
                <Typography className={classes.userInfo}>
                    ADDRESS: {userProfile.address}
                </Typography>
                <Typography className={classes.userInfo}>
                    EMAIL: {userProfile.email}
                </Typography>
                <Typography className={classes.userInfo}>
                    PLACES VISITED: {userProfile.placesVisited}
                </Typography>
            </CardContent>
            
            <CardActions className={classes.root}> 
            {currentUser?.role === "Admin" && 
                <Link to={`/users/profile/admin/update/${userProfile.userId}`} style={{ textDecoration:"none"}}>
                    <CustomButton variant="contained" className={classes.submit}>
                        Admin Update Profile
                    </CustomButton>
                </Link>
            }
            {currentUser?.role === "User" &&
                <Link to={`/users/profile/update/${userProfile.userId}`} style={{ textDecoration:"none"}}>
                    <CustomButton variant="contained" className={classes.submit}>
                        Update Profile
                    </CustomButton>
                </Link>
            }
            </CardActions>
        </Card>

        </Grid>
        :
        <div>
            <h3> User Not Found</h3>
        </div>

    )
}

  
import React, { FunctionComponent, SyntheticEvent, useState, useEffect } from "react";
import { Button, TextField, makeStyles, Container, CssBaseline, Typography, Grid, withStyles, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Link, useParams, RouteComponentProps } from 'react-router-dom';
import { green, lime } from "@material-ui/core/colors";
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { userUpdateLocationActionMapper, updateLocationErrorReset } from "../../action-mappers/user-update-location-action-mapper";
import { IState } from "../../reducers";
import { LoginComponent } from "../Login-Component/LoginComponent";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Theme, createStyles } from '@material-ui/core/styles';


//styles at the bottom because closer to html return
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: lime[700],
        color: 'white',
        //background color?
        fontFamily: "Bookman Old Style",
        fontSize: 16
    },
    media: {

    }
}));


export const UserUpdateLocationComponent: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const user = useSelector((state: IState) => {
        return state.loginState.currUser
    })
    const updatedLocation = useSelector((state: IState) => {
        return state.locationProfileState.profLocation
    })

    const errorMessage = useSelector((state: IState) => {
        return state.locationProfileState.errorMessage
    })

    let { locationId } = useParams()

    const [image, changeImage] = useState<any>(null)
    const [rating, changeRating] = useState(0)
    const [visited, changeVisited] = useState(false)

    
    const updateVisited = (event: React.ChangeEvent<{ value: unknown }>) => {
        changeVisited(event.target.value as boolean);
    };
    const updateRating = (event: React.ChangeEvent<{ value: unknown }>) => {
        changeRating(event.target.value as number);
    };

    // const updateRating = (event: any) => {
    //     event.preventDefault()
    //     changeRating(event.currentTarget.value)
    // }
    // const updateVisited = (event: any) => {
    //     event.preventDefault()
    //     changeVisited(event.currentTarget.value)
    // }

    const updateImage = (event: any) => {
        let file: File = event.currentTarget.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            changeImage(reader.result)
        }
    }


    const dispatch = useDispatch()

    const updateThisLocation = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (user) {
            let thunk = userUpdateLocationActionMapper(locationId, user.userId, visited, rating, image)
            dispatch(thunk)

        }

    }

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(updateLocationErrorReset())
        }
    })

    useEffect(() => {
        if (updatedLocation) {
            props.history.push(`/profile/${updatedLocation.locationId}`)

        }
    })

    return (
        (!user) ?
            <div className={classes.root} style={{ marginTop: 20 }}>
                <Alert severity="error" >
                    <AlertTitle>Error</AlertTitle>
                    You are not logged in. Shoo. Go log in
                </Alert>

            </div>

            :

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Update Location Info
                    </Typography>
                    <form autoComplete="off" onSubmit={updateThisLocation} className={classes.form} noValidate>
                    Have You Been Here Before?

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Visited?</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={visited}
                                        onChange={updateVisited}
                                        label="Visited"
                                    >
                                       
                                        <MenuItem value={0}>No</MenuItem>
                                        <MenuItem value={1}>Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                How Would You Rate this Location?
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="Rating Drop Down">Rating</InputLabel>
                                    <Select
                                        labelId="User's Location Rating"
                                        id="user-location-rating"
                                        value={rating}
                                        onChange={updateRating}
                                        label="Rating"
                                    >
                                        <MenuItem value={0}>No Stars. Horrible.</MenuItem>
                                        <MenuItem value={1}>1 Stars. Horrible but didn't Die.</MenuItem>
                                        <MenuItem value={2}>2 Stars. Meh but wouldn't go again.</MenuItem>
                                        <MenuItem value={3}>3 Stars. Meh.</MenuItem>
                                        <MenuItem value={4}>4 Stars. Sorta okay.</MenuItem>
                                        <MenuItem value={5}>5 Stars. Big Yes. Would Live There if I could.</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="file">Do You Have a Picture to Share?</label>
                                <br />
                                <input type="file" name="file" accept="image/*" onChange={updateImage} />
                                <img src={image} width="100%" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                > Update
                </CustomButton>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Link to="/home" style={{ textDecoration: "none" }}>
                                    <CustomButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    > Cancel
                </CustomButton>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
    )
}
//buttons
const CustomButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(lime[700]),
        backgroundColor: "lime[700]",
        '&:hover': {
            backgroundColor: green[900],
        },
    },
}))(Button);



import React, { FunctionComponent, useState } from 'react';
import { makeStyles, createStyles, Theme, Paper, Typography, Button, Link } from '@material-ui/core';
import './Marker.css';
import InfoWindow from 'google-map-react';
import {Location} from '../../models/Location'
import { FullLocationDisplayComponent } from '../Location-Display-Components/FullLocationDisplayComponent';

// hoping to pass some props here for infoWindow in div eg:props.location.name
interface IMapProp {  
    location: Location  
    lat: number
    lng: number
} 

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            //backgroundColor: 'black',
            height: 110,
            width: 175,
        },
        title: {
            fontSize:12,
            fontWeight: "lighter"
        },
        typography: {
            color: 'black',
            fontSize: 12,
            
        }
    }),
);

export const Marker: FunctionComponent<IMapProp> = (props) => {
    let classes = useStyles()
    const [isOpen, setOpen] = useState(false);

    const handleonClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setOpen(true)
    }
    const handleonClose = () => {
        setOpen(false)
    }

    return (
        (isOpen) ?
            <div>
                <div
                    className="pin bounce"
                    style={{ backgroundColor: 'red', cursor: 'pointer' }}
                    title={props.location.governance}
                    onClick={handleonClick}
                />
                <InfoWindow
                    onClick={handleonClose}
                >
                    <Paper className={classes.paper} elevation={6}>
                    <Typography className={classes.title} > 
                        {props.location.name}
                        </Typography>
                        <Typography className={classes.title} >
                        {props.location.description}
                        </Typography>                      
                    </Paper>
                </InfoWindow>
            </div>
            :
            <div>
                <div
                    className="pin bounce"
                    style={{ backgroundColor: 'green', cursor: 'pointer' }}  
                    onClick={handleonClick}
                />
            </div>
    )
}
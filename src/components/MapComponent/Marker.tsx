import React, { FunctionComponent, useState } from 'react';
import { makeStyles, createStyles, Theme, Paper, Typography } from '@material-ui/core';
import './Marker.css';
import InfoWindow from 'google-map-react';
//import {Location} from '../../models/Location'

// hoping to pass some props here for infoWindow in div eg:props.location.name
interface IMapProps {  
    //location: Location  
    lat: number
    lng: number
} 

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            height: 95,
            width: 155,
        },
        title: {
            fontSize:12,
            fontWeight: "inherit"
        },
        typography: {
            color: 'black',
            fontSize: 12,
            
        }
    }),
);

export const Marker: FunctionComponent<IMapProps> = (props) => {
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
                    onClick={handleonClick}
                />
                <InfoWindow
                    onClick={handleonClose}
                >
                    <Paper className={classes.paper} elevation={6}>
                    <Typography className={classes.title} >
                        MOUNT DOOM
                        </Typography>

                        <Typography className={classes.title} >
                        Volcano where the one ring was forged and the only place it can be destroyed.
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
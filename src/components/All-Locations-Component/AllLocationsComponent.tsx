import React, { FunctionComponent, useEffect, useState } from 'react'
import { getAllLocations } from '../../remote/location-service/getAllLocations'
import { Location } from '../../models/Location'
import InfoIcon from '@material-ui/icons/Info';
import { GridList, GridListTile, ListSubheader, GridListTileBar, IconButton, makeStyles } from '@material-ui/core'
import { SingleImageDisplay } from '../Location-Display-Components/SingleImageDisplay';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme)=>({ //customize this more!
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      width: "100%",
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    label: {
        fontSize: 30,
        color: 'black',
        fontFamily: "Bookman Old Style"
    },
    gridList: {
      width: "100%",
      height: "100%",
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }))
  
export const AllLocationsComponent:FunctionComponent<any> = (props) => {
    const classes = useStyles();

    let [allLocations, changeAllLocations] = useState<Location[]>([])

    //query the server
    useEffect(()=>{
        const getLocations = async ()=>{
            let response = await getAllLocations()
            changeAllLocations(response)
        }
        if(allLocations.length === 0){
            getLocations()
        }
    })  

    console.log(allLocations)

    return(
        <div className={classes.root}>
            <GridList cellHeight={300} cols={3} className={classes.gridList}>
                <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                    <ListSubheader className={classes.label}>Places to see</ListSubheader>
                </GridListTile>
                {allLocations.map((tile) => (
                    <GridListTile key={tile.locationId}>
                        <SingleImageDisplay location={props.location}/>
                        <GridListTileBar
                            title={tile.name}
                            subtitle={<span> {tile.realm}<br/> {tile.rating} <br/> {tile.numVisited} have visited </span>}
                            actionIcon={
                                <IconButton aria-label={`View all location information`} component={Link} to={`/locations/profile/${tile.locationId}`} className={classes.icon}>
                                <InfoIcon/>
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
         
    )
}


import React, { FunctionComponent, useEffect, useState } from 'react'
import { getAllLocations } from '../../remote/location-service/getAllLocations'
import { Location } from '../../models/Location'
import { GridList, GridListTile, ListSubheader, GridListTileBar, IconButton, makeStyles, CardActionArea } from '@material-ui/core'
import { SingleImageDisplay } from '../Location-Display-Components/SingleImageDisplay';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { IState } from '../../reducers';


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

    const user = useSelector((state: IState) => {
        return state.loginState.currUser
    })

    
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
        (user)?
        <div className={classes.root}>
            <GridList cellHeight={300} cols={3} className={classes.gridList}>
                <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                    <ListSubheader className={classes.label}>Places to see</ListSubheader>
                </GridListTile>
                {allLocations.map((tile) => (
                    <GridListTile key={tile.locationId}>
                    <Link to={`/locations/profile/${tile.locationId}`}>                        
                        <SingleImageDisplay location={tile}/>
                        <GridListTileBar
                            title={tile.name}
                            subtitle={<span> {tile.realm}<br/> {tile.rating} <br/> {tile.numVisited} have visited </span>}
                        />
                    </Link>
                    </GridListTile>
                ))}
            </GridList>
        </div>
        :
        <div>
            <h3> Please log in to view</h3>
        </div>

    )
}


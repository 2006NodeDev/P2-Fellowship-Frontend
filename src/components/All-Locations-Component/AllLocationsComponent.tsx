import React, { FunctionComponent, useEffect, useState } from 'react'
import { getAllLocations } from '../../remote/location-service/getAllLocations'
import { Location } from '../../models/Location'
import { GridList, GridListTile, ListSubheader, GridListTileBar, IconButton, makeStyles, CardActionArea } from '@material-ui/core'
import { SingleImageDisplay } from '../Location-Display-Components/SingleImageDisplay';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { IState } from '../../reducers';
import StarIcon from '@material-ui/icons/Star';
import { Rating } from '@material-ui/lab';
import { grey } from '@material-ui/core/colors';

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

    //get current user (to allow access to page)
    const thisUser = useSelector((state: IState) => {
        return state.loginState.currUser
    })

    
    let [allLocations, changeAllLocations] = useState<Location[]>([])

    //query the server
    //useEffect(()=>{
        const getLocations = async ()=>{ //add all locations state!!
            try{
                let response = await getAllLocations() //doesn't affect state rn... idk if it needs to though... 
                console.log("get all locations: " + response)
                changeAllLocations(response)
            }catch (e) {
                console.log(e)
            }
        }
        getLocations()
        //trying without useEffect
    //     if(thisUser){
    //         getLocations()
    //     }
    //})  

    console.log("all locations:" + allLocations)
    

    return(
        (thisUser)?
            <div>{ 
                (allLocations)?
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
                                    subtitle={<span> {tile.realm}<br/>
                                        <Rating size="small" color="white" value={tile.rating} precision={0.5} readOnly emptyIcon={<StarIcon fontSize="inherit"/>}/>
                                        <br/> {tile.numVisited} have visited </span>}
                                />
                            </Link>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                :
                <div>
                    No Locations Found
                </div>
            }</div>
        :
        <div>
            <h3> Must log in to view content </h3>
        </div>
            
    )
}


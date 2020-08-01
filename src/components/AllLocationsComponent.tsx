import React, { FunctionComponent, useEffect, useState } from 'react'
import { getAllLocations } from '../remote/getAllLocations'
import { Location } from '../models/Location'
import { DisplayLOTRLocationComponent } from './DisplayLOTRLocationComponent'


export const AllLocationsComponent:FunctionComponent<any> = (props) => {

    let [allLocations, changeAllLocations] = useState<Location[]>([])

    //query the server
    useEffect(()=>{

        const getUsers = async ()=>{
            let response = await getAllLocations()
            changeAllLocations(response)
        }

        if(allLocations.length === 0){
            getUsers()
        }
    })  

    let locationDisplays = allLocations.map((location)=>{
        return <DisplayLOTRLocationComponent key={'location-key-' + location.locationId} location={location}/>
    })

    return(
        //we should turn this into a grid to make it look nicer
        <div>
            {locationDisplays}
        </div>
        
        
    )
}
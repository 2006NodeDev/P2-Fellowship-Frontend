import React, { FunctionComponent, useEffect, useState } from 'react'
import { getAllLocations } from '../remote/getAllLocations'
import { Location } from '../models/Location'
import { DisplayLOTRLocationComponent } from './DisplayLocationComponent'


export const AllLocationsComponent:FunctionComponent<any> = (props) => {

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

    let locationDisplays = allLocations.map((location)=>{
        return <DisplayLOTRLocationComponent key={'location-key-' + location.locationId} location={location}/>
    })

    return(
        <div>
            {locationDisplays}
        </div>
        
        
    )
}
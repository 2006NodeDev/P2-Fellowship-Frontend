import React, { FunctionComponent, useEffect, useState } from 'react'
import { getAllLocations } from '../../remote/location-service/getAllLocations'
import { Location } from '../../models/Location'
import { DisplayLocationCardComponent } from '../Location-Display-Components/LocationCardDisplayComponent'

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
        return <DisplayLocationCardComponent key={'location-key-' + location.locationId} location={location}/>
    })

    return(
        <div>
            {locationDisplays}
        </div>
        
        
    )
}
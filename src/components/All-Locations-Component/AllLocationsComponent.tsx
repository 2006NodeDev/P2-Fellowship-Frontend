import React, { FunctionComponent, useEffect, useState } from 'react'
import { getAllLocations } from '../../remote/location-service/getAllLocations'
import { Location } from '../../models/Location'
import { LocationCardDisplayComponent } from '../Location-Display-Components/LocationCardDisplayComponent'
import { FullLocationDisplayComponent } from '../Location-Display-Components/FullLocationDisplayComponent'
import { useSelector } from 'react-redux'
import { IState } from '../../reducers'

export const AllLocationsComponent:FunctionComponent<any> = (props) => {
    const thisUser = useSelector((state:IState) => {
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

    // let locationDisplays = allLocations.map((location)=>{
    //     return <LocationCardDisplayComponent key={'location-key-' + location.locationId} location={location}/>
    // })

    let locationDisplays = allLocations.map((location)=>{
        return (
            (thisUser?.role === 'Admin')?
            <FullLocationDisplayComponent key={'location-key-' + location.locationId} location={location}/>
            :
            <LocationCardDisplayComponent key={'location-key-' + location.locationId} location={location}/>            
        )
    })

    return(
        <div>
            {locationDisplays}
        </div>
        
        
    )
}


import React, { FunctionComponent, useEffect, useState } from 'react'
import { getAllLocations } from '../../remote/location-service/getAllLocations'
import { Location } from '../../models/Location'
import { LocationCardDisplayComponent } from '../Location-Display-Components/LocationCardDisplayComponent'
import { FullLocationProfileComponent } from '../Location-Display-Components/FullLocationDisplayComponent'
import { useSelector } from 'react-redux'
import { IState } from '../../reducers'

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

    // let locationDisplays = allLocations.map((location)=>{
    //     return <LocationCardDisplayComponent key={'location-key-' + location.locationId} location={location}/>
    // })

    let locationDisplays = allLocations.map((location)=>{
        return (
            (currUser?.role === 'Admin')?
            <FullLocationProfileComponent key={'location-key-' + location.locationId} location={location}/>
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

const currUser = useSelector((state:IState) => {
    return state.loginState.currUser
})
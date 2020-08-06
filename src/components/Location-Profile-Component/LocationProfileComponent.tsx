//this will use the FullLocationDisplayComponent to show all information to a user (and update?)
import React from "react"
import { Location } from "../../models/Location"
import { useState, FunctionComponent, useEffect } from "react"
import { useParams } from "react-router"
import { getLocationProfile } from "../../remote/location-service/getLocationProfile"
import { FullLocationDisplayComponent } from '../Location-Display-Components/FullLocationDisplayComponent'
import { FullUserDisplayComponent } from "../User-Display-Components/FullUserDisplayComponent"


export const LocationProfileComponent:FunctionComponent<any> = (props) => {

    let[locationProfile, changeLocationProfile] = useState<any>(null)
    let {locationId} = useParams()


    //query the server
    useEffect(()=>{

        const getUser = async ()=>{
            let response = await getLocationProfile(locationId)
            changeLocationProfile(response)
        }

        if(!locationProfile){
            getUser()
        }
    })  

    
    // let locationDisplays = locationProfile.map((location: Location)=>{
    //     return <FullLocationProfileComponent key={'user-key-' + location.locationId} location={location}/>
    // })
    
    

    return(
        (locationProfile)?
        <div>
            <FullLocationDisplayComponent location={locationProfile} />
        </div>
        :
        <div>
            Location Not Found
        </div>
        
        
    )
}


  
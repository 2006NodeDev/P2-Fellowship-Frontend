//this will use the FullLocationDisplayComponent to show all information to a user (and update?)
import React from "react"
import { FunctionComponent, useEffect } from "react"
import { useParams } from "react-router"
import { FullLocationDisplayComponent } from '../Location-Display-Components/FullLocationDisplayComponent'
import { locationProfileActionMapper, locationProfileErrorReset } from "../../action-mappers/location-profile-action-mapper"
import { useDispatch, useSelector } from "react-redux"
import { IState } from "../../reducers"
import { toast } from "react-toastify"


export const LocationProfileComponent:FunctionComponent<any> = (props) => {

    let {locationId} = useParams()

    const dispatch = useDispatch()
    
    //get the current user to display page 
    const thisUser = useSelector((state: IState) => {
        return state.loginState.currUser
    })

    const locationProfile = useSelector((state: IState)=>{
        return state.locationProfileState.profLocation
    })
    const errorMessage = useSelector((state: IState)=>{
        return state.locationProfileState.errorMessage
    })

    //set the locationProfile state using the action mapper
    //hopefully it's ok to be in a useEffect
    useEffect(()=>{
        const getLocation = async ()=>{
            //sending to action mapper
            let thunk = locationProfileActionMapper(locationId)
            dispatch(thunk)
        }
        if(!locationProfile){ //should this be in a seperate useEffect?
            //call the action mapper function if there is no current location profile
            getLocation()
        }
    })  
    //if there's an error
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(locationProfileErrorReset())
        }
    })
   

    return(
        (thisUser)? 
        <div>{
            (locationProfile)?
                <FullLocationDisplayComponent location={locationProfile} />
            :
            <div>
                Location Not Found
            </div>
        }</div>
       : 
        <div>
            <h3> Please log in to view</h3>
        </div>
    
        
    )
}


  
import { Location } from "../models/Location";
import { updateLocation } from "../remote/updateLocation";
import { LocationImage } from "../models/LocationImage";


export const newLocationTypes = {
    CREATION_SUCCESSFUL: 'P2_CREATED_NEW_LOCATION',
    BAD_CREDENTIALS: 'P2_BAD_CREDENTIALS',
    NAME_TAKEN:'P2_NAME_TAKEN',
    SERVER_ERROR:'P2_LOCATION_SERVER_ERROR',
    RESET_ERROR:'P2_RESET_ERROR'

}

export const newLocationActionMapper = (locationId:number, name:string, image:LocationImage[], realm:string, governance:string, primaryPopulation: string, description: string, rating:number, numVisited:number)=> async (dispatch:any) => {
   
    let location:Location = {
        locationId,
        name,
        image,
        realm,
        governance,
        primaryPopulation,
        description,
        rating,
        numVisited

    }
   
    try{
        let newLocation = await updateLocation(location)
        console.log(newLocation)
        dispatch({
            type:newLocationTypes.CREATION_SUCCESSFUL,
            payload:{
                newLocation
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('400')){
            dispatch({
                type:newLocationTypes.BAD_CREDENTIALS
            })
        }else if (err.message.includes('405')){
            dispatch({
                type:newLocationTypes.NAME_TAKEN
            })
        } else{
            dispatch({
                type:newLocationTypes.SERVER_ERROR
            })
        }        
    }
}


export const newLocationErrorReset = () => {
    return{
        type:newLocationTypes.RESET_ERROR

    }

}


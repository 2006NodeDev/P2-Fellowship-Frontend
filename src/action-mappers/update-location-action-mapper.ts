import { Location } from "../models/Location";
import { updateLocation } from "../remote/location-service/updateLocation";
import { LocationImage } from "../models/LocationImage";


export const updateLocationTypes = {
    UPDATE_SUCCESSFUL: 'P2_UPDATE_LOGIN',
    BAD_CREDENTIALS: 'P2_BAD_CREDENTIALS',
    NAME_TAKEN:'P2_NAME_TAKEN',
    SERVER_ERROR:'P2_LOCATION_SERVER_ERROR',
    RESET_ERROR:'P2_RESET_ERROR'

}

export const updateLocationActionMapper = (locationId:number, name:string, image:LocationImage[], realm:string, governance:string, primaryPopulation: string, description: string, rating:number, numVisited:number)=> async (dispatch:any) => {
   
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
        let updateLoc = await updateLocation(location)
        console.log(updateLoc)
        dispatch({
            type:updateLocationTypes.UPDATE_SUCCESSFUL,
            payload:{
                updateLoc
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('400')){
            dispatch({
                type:updateLocationTypes.BAD_CREDENTIALS
            })
        }else if (err.message.includes('405')){
            dispatch({
                type:updateLocationTypes.NAME_TAKEN
            })
        } else{
            dispatch({
                type:updateLocationTypes.SERVER_ERROR
            })
        }        
    }
}


export const updateLocationErrorReset = () => {
    return{
        type:updateLocationTypes.RESET_ERROR

    }

}


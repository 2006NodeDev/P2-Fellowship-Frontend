import { Location } from "../models/Location";
import { LocationImage } from "../models/LocationImage";
import { adminUpdateLocation } from "../remote/location-service/adminUpdateLocation";

export const userUpdateLocationTypes = {
    UPDATE_SUCCESSFUL: 'P2_UPDATE_LOGIN',
    BAD_CREDENTIALS: 'P2_BAD_CREDENTIALS',
    NAME_TAKEN:'P2_NAME_TAKEN',
    SERVER_ERROR:'P2_LOCATION_SERVER_ERROR',
    RESET_ERROR:'P2_RESET_ERROR'
}

export const userUpdateLocationActionMapper = (locationId:number, name:string, image:LocationImage[], realm:string, governance:string, primaryPopulation: string, description: string, rating:number, numVisited:number)=> async (dispatch:any) => {
   
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
        let updateLoc = await adminUpdateLocation(location)
        console.log(updateLoc)
        dispatch({
            type:userUpdateLocationTypes.UPDATE_SUCCESSFUL,
            payload:{
                updateLoc
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('400')){
            dispatch({
                type:userUpdateLocationTypes.BAD_CREDENTIALS
            })
        }else if (err.message.includes('405')){
            dispatch({
                type:userUpdateLocationTypes.NAME_TAKEN
            })
        } else{
            dispatch({
                type:userUpdateLocationTypes.SERVER_ERROR
            })
        }        
    }
}


export const updateLocationErrorReset = () => {
    return{
        type:userUpdateLocationTypes.RESET_ERROR

    }

}


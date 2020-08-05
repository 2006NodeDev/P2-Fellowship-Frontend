import { Location } from "../models/Location";
import { LocationImage } from "../models/LocationImage";
import { userUpdateLocation } from "../remote/location-service/userUpdateLocation";

export const userUpdateLocationTypes = {
    UPDATE_SUCCESSFUL: 'P2_UPDATE_LOGIN',
    BAD_CREDENTIALS: 'P2_BAD_CREDENTIALS',
    NAME_TAKEN:'P2_NAME_TAKEN',
    SERVER_ERROR:'P2_LOCATION_SERVER_ERROR',
    RESET_ERROR:'P2_RESET_ERROR'
}

export const userUpdateLocationActionMapper = (locationId:number, visited: boolean, rating:number, image:string)=> async (dispatch:any) => {
   
    try{
        let updateLoc = await userUpdateLocation(locationId, visited, rating, image)
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


import { Location } from "../models/Location";
import { adminUpdateLocation } from "../remote/location-service/adminUpdateLocation";

export const adminUpdateLocationTypes = {
    UPDATE_SUCCESSFUL: 'P2_UPDATE_LOGIN',
    NAME_TAKEN:'P2_NAME_TAKEN',
    SERVER_ERROR:'P2_LOCATION_SERVER_ERROR',
    RESET_ERROR:'P2_RESET_ERROR'
}

export const adminUpdateLocationActionMapper = (locationToUpdate: Location)=> async (dispatch:any) => {
   
    try{
        let updateLoc = await adminUpdateLocation(locationToUpdate)
        console.log(updateLoc)
        dispatch({
            type:adminUpdateLocationTypes.UPDATE_SUCCESSFUL,
            payload:{
                updateLoc
            }
        })
    }catch (err) {
        console.log(err.message)
        if (err.message.includes('405')){
            dispatch({
                type:adminUpdateLocationTypes.NAME_TAKEN
            })
        } else{
            dispatch({
                type:adminUpdateLocationTypes.SERVER_ERROR
            })
        }        
    }
}


export const updateLocationErrorReset = () => {
    return{
        type:adminUpdateLocationTypes.RESET_ERROR

    }

}


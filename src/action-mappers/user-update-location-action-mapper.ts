import { userUpdateLocation } from "../remote/location-service/userUpdateLocation";

export const userUpdateLocationTypes = {
    UPDATE_SUCCESSFUL: 'P2_UPDATE_LOGIN',
    NOT_VISITED: 'P2_LOCATION_NOT_VISITED',
    SERVER_ERROR:'P2_LOCATION_SERVER_ERROR',
    RESET_ERROR:'P2_RESET_ERROR'
}

export const userUpdateLocationActionMapper = (locationId:number, userId: number, visited: boolean, rating:number, image:string)=> async (dispatch:any) => {
   
    try{
        let updateLoc = await userUpdateLocation(locationId, userId, visited, rating, image)
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
                type:userUpdateLocationTypes.NOT_VISITED
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


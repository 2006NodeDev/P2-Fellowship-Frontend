import { User } from "../models/User";
import { getUserProfile } from "../remote/getUserProfile";
import { getLOTRLocationProfile } from "../remote/getLOTRLocationProfile";


export const locationProfileTypes = {
    PROFILE_FOUND: 'P2_PROFILE_FOUND',
    BAD_CREDENTIALS: 'P2_BAD_CREDENTIALS',
    PROFILE_NOT_FOUND: 'P2_PROFILE_NOT_FOUND',
    SERVER_ERROR:'P2_LOGIN_SERVER',
    RESET_ERROR:'P2_RESET_ERROR'

}

export const locationProfileActionMapper = (locationId:number)=> async (dispatch:any) => {
    
    try{
        let currLocation = await getLOTRLocationProfile(locationId)
        console.log(currLocation)
        dispatch({
            type:locationProfileTypes.PROFILE_FOUND,
            payload:{
                currLocation
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('400')){
            dispatch({
                type:locationProfileTypes.BAD_CREDENTIALS
            })
        }else if (err.message.includes('404')){
            dispatch({
                type:locationProfileTypes.PROFILE_NOT_FOUND
            })
        } else{
            dispatch({
                type:locationProfileTypes.SERVER_ERROR
            })
        }        
    }
}


export const locationProfileErrorReset = () => {
    return{
        type:locationProfileTypes.RESET_ERROR

    }

}


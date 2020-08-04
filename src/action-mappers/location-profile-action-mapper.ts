import { User } from "../models/User";
import { getUserProfile } from "../remote/user-service/getUserProfile";
import { getLocationProfile } from "../remote/location-service/getLocationProfile";


//tells you with a string, what the action is that happened
//if you need to do something with this action (e.g. return an error or return a profile in this case),
//then this is the place to state that
export const locationProfileTypes = {
    PROFILE_FOUND: 'P2_PROFILE_FOUND',
    BAD_CREDENTIALS: 'P2_BAD_CREDENTIALS',
    PROFILE_NOT_FOUND: 'P2_PROFILE_NOT_FOUND',
    SERVER_ERROR:'P2_LOGIN_SERVER',
    RESET_ERROR:'P2_RESET_ERROR'

}

//action mappers are functions to define actions, just so that you don't have to define them inline (~neater code)
//the action mapper function will return the action object
export const locationProfileActionMapper = (locationId:number)=> async (dispatch:any) => {
    
    try{
        let currLocation = await getLocationProfile(locationId)
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


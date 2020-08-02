import { User } from "../models/User";
import { getUserProfile } from "../remote/user-service/getUserProfile";


export const userProfileTypes = {
    PROFILE_FOUND: 'P2_PROFILE_FOUND',
    BAD_CREDENTIALS: 'P2_BAD_CREDENTIALS',
    PROFILE_NOT_FOUND: 'P2_PROFILE_NOT_FOUND',
    SERVER_ERROR:'P2_LOGIN_SERVER',
    RESET_ERROR:'P2_RESET_ERROR'

}

export const userProfileActionMapper = (userId:number)=> async (dispatch:any) => {
    
    try{
        let currUser = await getUserProfile(userId)
        console.log(currUser)
        dispatch({
            type:userProfileTypes.PROFILE_FOUND,
            payload:{
                currUser
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('400')){
            dispatch({
                type:userProfileTypes.BAD_CREDENTIALS
            })
        }else if (err.message.includes('404')){
            dispatch({
                type:userProfileTypes.PROFILE_NOT_FOUND
            })
        } else{
            dispatch({
                type:userProfileTypes.SERVER_ERROR
            })
        }        
    }
}


export const userProfileErrorReset = () => {
    return{
        type:userProfileTypes.RESET_ERROR

    }

}


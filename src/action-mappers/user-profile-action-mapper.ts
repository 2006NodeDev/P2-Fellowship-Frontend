
import { getUserProfile } from "../remote/user-service/getUserProfile";


export const userProfileTypes = {
    PROFILE_FOUND: 'P2_PROFILE_FOUND',
    PROFILE_NOT_FOUND: 'P2_PROFILE_NOT_FOUND',
    SERVER_ERROR:'P2_SERVER_ERROR',
    RESET_ERROR:'P2_RESET_ERROR'

}

export const userProfileActionMapper = (userId:number)=> async (dispatch:any) => {
    
    try{
        let userProfile = await getUserProfile(userId)
        console.log(userProfile)
        dispatch({
            type:userProfileTypes.PROFILE_FOUND,
            payload:{
                userProfile
            }
        })
    }catch (err) {
        console.log(err.message)
        if (err.message.includes('404')){
            dispatch({
                type:userProfileTypes.PROFILE_NOT_FOUND
            })
        } else {
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


import { User } from "../models/User";
import { updateUser } from "../remote/user-service/updateUser";


export const userUpdateProfileTypes = {
    UPDATE_SUCCESSFUL: 'P2_UPDATE_PROFILE',
    BAD_CREDENTIALS: 'P2_BAD_CREDENTIALS',
    USERNAME_TAKEN:'P2_USERNAME_TAKEN',
    SERVER_ERROR:'P2_SERVER_ERROR',
    RESET_ERROR:'P2_RESET_ERROR'

}

export const updateUserActionMapper = (updatedUser:User)=> async (dispatch:any) => {
   
    try{
        let userUpdateProfile = await updateUser(updatedUser)
        console.log(userUpdateProfile)
        dispatch({
            type:userUpdateProfileTypes.UPDATE_SUCCESSFUL,
            payload:{
                userUpdateProfile
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('400')){
            dispatch({
                type:userUpdateProfileTypes.BAD_CREDENTIALS
            })
        }else if (err.message.includes('405')){
            dispatch({
                type:userUpdateProfileTypes.USERNAME_TAKEN
            })
        } else{
            dispatch({
                type:userUpdateProfileTypes.SERVER_ERROR
            })
        }        
    }
}


export const updateUserErrorReset = () => {
    return{
        type:userUpdateProfileTypes.RESET_ERROR
    }
}


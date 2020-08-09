import { User } from "../models/User";
import { updateUser } from "../remote/user-service/updateUser";


export const updateUserTypes = {
    UPDATE_SUCCESSFUL: 'P2_UPDATE_LOGIN',
    BAD_CREDENTIALS: 'P2_BAD_CREDENTIALS',
    USERNAME_TAKEN:'P2_USERNAME_TAKEN',
    SERVER_ERROR:'P2_LOGIN_SERVER',
    RESET_ERROR:'P2_RESET_ERROR'

}

export const updateUserActionMapper = (updatedUser:User)=> async (dispatch:any) => {
   
    try{
        let userProfile = await updateUser(updatedUser)
        console.log(userProfile)
        dispatch({
            type:updateUserTypes.UPDATE_SUCCESSFUL,
            payload:{
                userProfile
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('400')){
            dispatch({
                type:updateUserTypes.BAD_CREDENTIALS
            })
        }else if (err.message.includes('405')){
            dispatch({
                type:updateUserTypes.USERNAME_TAKEN
            })
        } else{
            dispatch({
                type:updateUserTypes.SERVER_ERROR
            })
        }        
    }
}


export const updateUserErrorReset = () => {
    return{
        type:updateUserTypes.RESET_ERROR
    }
}


import { User } from "../models/User";
import { adminUpdateUser } from "../remote/user-service/adminUpdateUser";


export const adminUpdateProfileTypes = {
    UPDATE_SUCCESSFUL: 'P2_ADMIN_UPDATE_PROFILE',
    BAD_CREDENTIALS: 'P2_BAD_CREDENTIALS',
    USERNAME_TAKEN:'P2_USERNAME_TAKEN',
    SERVER_ERROR:'P2_SERVER_ERROR',
    RESET_ERROR:'P2_RESET_ERROR'

}

export const adminUpdateUserActionMapper = (updatedUser:User)=> async (dispatch:any) => {
   
    try{
        let adminUpdateProfile = await adminUpdateUser(updatedUser)
        console.log(adminUpdateProfile)
        dispatch({
            type:adminUpdateProfileTypes.UPDATE_SUCCESSFUL,
            payload:{
                adminUpdateProfile
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('400')){
            dispatch({
                type:adminUpdateProfileTypes.BAD_CREDENTIALS
            })
        }else if (err.message.includes('405')){
            dispatch({
                type:adminUpdateProfileTypes.USERNAME_TAKEN
            })
        } else{
            dispatch({
                type:adminUpdateProfileTypes.SERVER_ERROR
            })
        }        
    }
}


export const updateUserErrorReset = () => {
    return{
        type:adminUpdateProfileTypes.RESET_ERROR
    }
}


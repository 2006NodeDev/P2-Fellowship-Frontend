import { fellowshipLogout } from "../remote/user-service/fellowshipLogout";
import { User } from "../models/User";
import { getUserProfile } from "../remote/user-service/getUserProfile";


export const logoutTypes = {
    LOGOUT_SUCCESSFUL: 'P2_SUCCESSFUL_LOGOUT',
    NO_USER_LOGGED_IN: 'P2_NO_USER_LOGGED_IN',
    SERVER_ERROR:'P2_LOGOUT_SERVER',
    RESET_ERROR:'P2_RESET_ERROR'
}

export const logoutActionMapper = () => async (dispatch:any) => {
    try{
        // let currUser = await getUserProfile(userId)
        // console.log(currUser)
        // //check current user
        let noUser = await fellowshipLogout()
        console.log("current User is now: " + noUser)
        //get back null
        
        dispatch({
            type:logoutTypes.LOGOUT_SUCCESSFUL,
            payload:{
                noUser
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('404')){
            dispatch({
                type:logoutTypes.NO_USER_LOGGED_IN
            })
        } else{
            dispatch({
                type:logoutTypes.SERVER_ERROR
            })
        }        
    }
}

export const logoutErrorReset = () => {
    return{
        type:logoutTypes.RESET_ERROR

    }

}


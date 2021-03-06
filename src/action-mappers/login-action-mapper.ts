import { fellowshipLogin } from "../remote/user-service/fellowshipLogin";
import { User } from "../models/User";


export const loginTypes = {
    LOGIN_SUCCESSFUL: 'P2_SUCCESSFUL_LOGIN',
    AUTH_ERROR: 'P2_AUTH_ERROR',
    BAD_CREDENTIALS: 'P2_BAD_CREDENTIALS',
    SERVER_ERROR:'P2_SERVER_ERROR',
    USER_NOT_FOUND:'P2_LOGIN_USER_NOT_FOUND',
    RESET_ERROR:'P2_RESET_ERROR'
}

export const loginActionMapper = (username:string, password:string) => async (dispatch:any) => {
    try{
        let loggedInUser:User = await fellowshipLogin(username, password)
        console.log("current User is now: " + loggedInUser)
        //console.log(loggedInUser[1])
        dispatch({
            type:loginTypes.LOGIN_SUCCESSFUL,
            payload:{
                loggedInUser
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('404')){
            dispatch({
                type:loginTypes.USER_NOT_FOUND
            })
        } else if(err.message.includes('401')){
            dispatch({
                type:loginTypes.AUTH_ERROR
            })
        } else if(err.message.includes('400')){
            dispatch({
                type:loginTypes.BAD_CREDENTIALS
            })
        } else{
            dispatch({
                type:loginTypes.SERVER_ERROR
            })
        }        
    }
}

export const loginErrorReset = () => {
    return{
        type:loginTypes.RESET_ERROR

    }

}


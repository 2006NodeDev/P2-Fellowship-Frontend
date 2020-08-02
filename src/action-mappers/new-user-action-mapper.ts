import { User } from "../models/User";
import { createNewUser } from "../remote/createNewUser";


export const newuserTypes = {
    LOGIN_SUCCESSFUL: 'P2_SUCCESSFUL_LOGIN',
    BAD_CREDENTIALS: 'P2_BAD_CREDENTIALS',
    USERNAME_TAKEN:'P2_USERNAME_TAKEN',
    SERVER_ERROR:'P2_LOGIN_SERVER',
    RESET_ERROR:'P2_RESET_ERROR'

}

export const newuserActionMapper = (username:string, password:string, firstName:string, lastName:string, affiliation:string, placesVisited: number, address:string, email:string, image:string)=> async (dispatch:any) => {
    let default_role = "User"
    let userId = 0
    try{
        let currUser = await createNewUser(username, password, firstName, lastName, affiliation, placesVisited, address, email, default_role, image)
        console.log(currUser)
        dispatch({
            type:newuserTypes.LOGIN_SUCCESSFUL,
            payload:{
                currUser
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('400')){
            dispatch({
                type:newuserTypes.BAD_CREDENTIALS
            })
        }else if (err.message.includes('405')){
            dispatch({
                type:newuserTypes.USERNAME_TAKEN
            })
        } else{
            dispatch({
                type:newuserTypes.SERVER_ERROR
            })
        }        
    }
}


export const newuserErrorReset = () => {
    return{
        type:newuserTypes.RESET_ERROR

    }

}


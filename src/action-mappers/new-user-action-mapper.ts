import { createNewUser } from "../remote/user-service/createNewUser";
import { User } from "../models/User";


export const newUserTypes = {
    CREATION_SUCCESSFUL: 'P2_CREATION_SUCCESSFUL',
    BAD_CREDENTIALS: 'P2_BAD_CREDENTIALS',
    USERNAME_TAKEN:'P2_USERNAME_TAKEN',
    SERVER_ERROR:'P2_SERVER_ERROR',
    RESET_ERROR:'P2_RESET_ERROR'

}

export const newUserActionMapper = (newUser:User)=> async (dispatch:any) => {
    try{
        let newUserResults = await createNewUser(newUser)
        console.log(`created user: ${newUserResults}`)
        dispatch({
            type:newUserTypes.CREATION_SUCCESSFUL,
            payload:{
                newUserResults
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('400')){
            dispatch({
                type:newUserTypes.BAD_CREDENTIALS
            })
        }else if (err.message.includes('405')){
            dispatch({
                type:newUserTypes.USERNAME_TAKEN
            })
        } else{
            dispatch({
                type:newUserTypes.SERVER_ERROR
            })
        }        
    }
}


export const newuserErrorReset = () => {
    return{
        type:newUserTypes.RESET_ERROR

    }

}


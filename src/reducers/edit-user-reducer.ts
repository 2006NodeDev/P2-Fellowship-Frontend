import { IEdittedUserState } from "./index";
import { AnyAction } from "redux";
import { userUpdateProfileTypes } from "../action-mappers/update-user-action-mapper"
import { adminUpdateProfileTypes } from "../action-mappers/admin-user-update-actionampper";


const initialState:IEdittedUserState = {
    edittedUser: undefined,
    errorMessage:''
}

export const editUserReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        //update the profUser with the userUpdateProfile
        case userUpdateProfileTypes.UPDATE_SUCCESSFUL :{
            return {
                ... state,
                edittedUser:action.payload.userUpdateProfile
            }
        }
        //bad creds for either update
        case (userUpdateProfileTypes.BAD_CREDENTIALS || adminUpdateProfileTypes.BAD_CREDENTIALS):{
            return { 
                ... state,
                errorMessage: 'Please fill out all required fields'
            }
        }
        //supposedly prevents repeat usernames in both updates
        case (userUpdateProfileTypes.USERNAME_TAKEN || adminUpdateProfileTypes.USERNAME_TAKEN):{
            return {
                ...state,
                errorMessage:'Username Taken'
            }
        }
        //admin update is successful, updating profUser with adminUpdateProfile
        case adminUpdateProfileTypes.UPDATE_SUCCESSFUL :{
            return {
                ... state,
                edittedUser:action.payload.adminUpdateProfile
            }
        }
       
        //server error
        case (userUpdateProfileTypes.SERVER_ERROR || adminUpdateProfileTypes.SERVER_ERROR) :{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        //reset error
        case (userUpdateProfileTypes.RESET_ERROR || adminUpdateProfileTypes.RESET_ERROR):{
            return {
                ...state,
                errorMessage:''
            }        
        }
        default:{
            return state
        }

    }
 


}

import { IUserProfileState } from "./index";
import { AnyAction } from "redux";
import { userProfileTypes } from "../action-mappers/user-profile-action-mapper";
import { logoutTypes } from "../action-mappers/logout-action-mapper";
import { newUserTypes } from "../action-mappers/new-user-action-mapper";
import { userUpdateProfileTypes } from "../action-mappers/update-user-action-mapper"
import { adminUpdateProfileTypes } from "../action-mappers/admin-user-update-actionampper";


//this is the reducer for the user profile.  
//Different from current user, like in the case of an admin viewing and updating a user that is not themselves
const initialState:IUserProfileState = {
    profUser: undefined,
    errorMessage:''

}

export const userProfileReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        //profile not found
        case userProfileTypes.PROFILE_NOT_FOUND:{
            return {
                ...state,
                errorMessage:'Profile Not Found'
            }
        }
        //get userProfile and return as profUser
        case userProfileTypes.PROFILE_FOUND:{
            return {
                ...state,
                profUser:action.payload.profUser
            }
        }
        //update the profUser with the userUpdateProfile
        case userUpdateProfileTypes.UPDATE_SUCCESSFUL :{
            return {
                ... state,
                pforUser:action.payload.userUpdateProfile
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
                pforUser:action.payload.adminUpdateProfile
            }
        }
        //set profUser to newUser when you create an account
        case newUserTypes.CREATION_SUCCESSFUL:{
            return {
                ... state,
                profUser:action.payload.newUserResults
            }
        }
        //set profUser to null at logout
        case logoutTypes.LOGOUT_SUCCESSFUL:{
            return {
                ...state,
                profUser:action.payload.noUser
            }
        }
        //server error
        case (userProfileTypes.SERVER_ERROR || userUpdateProfileTypes.SERVER_ERROR || adminUpdateProfileTypes.SERVER_ERROR) :{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        //reset error
        case (userProfileTypes.RESET_ERROR || userUpdateProfileTypes.RESET_ERROR || adminUpdateProfileTypes.RESET_ERROR):{
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
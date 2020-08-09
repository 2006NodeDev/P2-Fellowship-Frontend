import { IUserProfileState } from "./index";
import { AnyAction } from "redux";
import { userProfileTypes } from "../action-mappers/user-profile-action-mapper";
import { logoutTypes } from "../action-mappers/logout-action-mapper";


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
        // actually let's not do this so that our function for the action mapper is always called upon log in/after creation
        //set profUser to newUser when you create an account
        // case newUserTypes.CREATION_SUCCESSFUL:{
        //     return {
        //         ... state,
        //         profUser:action.payload.newUserResults
        //     }
        // }
        // //set profUser to loggedInUser 

        //do we have to reset to null/undefined every time? or does it do that automatically?

        //set profUser to null at logout
        case logoutTypes.LOGOUT_SUCCESSFUL:{
            return {
                ...state,
                profUser:action.payload.noUser
            }
        }
        //server error
        case userProfileTypes.SERVER_ERROR :{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        //reset error
        case userProfileTypes.RESET_ERROR:{
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
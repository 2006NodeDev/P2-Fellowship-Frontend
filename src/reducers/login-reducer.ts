import { ILoginState } from "./index";
import { AnyAction } from "redux";
import { loginTypes } from "../action-mappers/login-action-mapper";
import { logoutTypes } from "../action-mappers/logout-action-mapper";
import { newUserTypes } from "../action-mappers/new-user-action-mapper";

//this is the reducer for the current user
//only affected by logging in or out, or creating a new user
//not the same as user profile

//when running reducer for the first time this initializes it to null
const initialState:ILoginState = {
    currUser:undefined,
    errorMessage:''
}

export const loginReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        //can't log in (auth error)
        case loginTypes.AUTH_ERROR:{
            return {
                ...state,
                errorMessage:'Incorrect Username or Password'
            }
        }
        //user does not exist
        case loginTypes.USER_NOT_FOUND:{
            return {
                ...state,
                errorMessage:'User Not Found'
            }
        }
        //user new user create or user logs in, current user set
        case (loginTypes.LOGIN_SUCCESSFUL):{
            return {
                ...state,
                currUser:action.payload.loggedInUser
            }
        }
        //bad credentials when creating a new user/logging in
        case (loginTypes.BAD_CREDENTIALS || newUserTypes.BAD_CREDENTIALS): {
            return { 
                ... state,
                errorMessage: 'Please fill out all required fields'
            }
        }
        //the same as USER NOT FOUND but for logout
        case logoutTypes.NO_USER_LOGGED_IN:{
            return {
                ...state,
                errorMessage:'User must be logged in to log out'
            }
        }
        //user logs out, current user set to null
        case logoutTypes.LOGOUT_SUCCESSFUL:{
            return {
                ...state,
                currUser:action.payload.noUser
            }
        }
        //supposedly preventing a user from taking someone else's username
        case newUserTypes.USERNAME_TAKEN:{
            return {
                ...state,
                errorMessage:'Username Taken'
            }
        }
        //newUser creation successful, returns user as current user
        case newUserTypes.CREATION_SUCCESSFUL: {
            return {
                ...state,
                currUser:action.payload.newUserResults
            }
        }

        //server error
        case (loginTypes.SERVER_ERROR || logoutTypes.SERVER_ERROR || newUserTypes.SERVER_ERROR):{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        //reset error
        case (loginTypes.RESET_ERROR || logoutTypes.RESET_ERROR || newUserTypes.RESET_ERROR):{
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
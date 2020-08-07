import { ILoginState, ILogoutState } from "./index";
import { AnyAction } from "redux";
import { logoutTypes } from "../action-mappers/logout-action-mapper";

//I'm not sure this is what I have to do, since initially there is a current user
const initialState:ILogoutState = {
    noUser:undefined,
    errorMessage:''
}

export const logoutReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        case logoutTypes.NO_USER_LOGGED_IN:{
            return {
                ...state,
                errorMessage:'User must be logged in to log out'
            }
        }
        case logoutTypes.SERVER_ERROR:{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        case logoutTypes.RESET_ERROR:{
            return {
                ...state,
                errorMessage:''
            }        
        }
        case logoutTypes.LOGOUT_SUCCESSFUL:{
            return {
                ...state,
                noUser:action.payload.noUser
            }
        }
        default:{
            return state
        }
    } 
}
import { IUserProfileState, ILoginState } from "./index";
import { AnyAction } from "redux";
import { newUserTypes } from "../action-mappers/new-user-action-mapper";


//when running reducer for the first time this initializes it to null
//since creating a new user is just logging in as a new object, i left this as loginstate
const initialState:ILoginState = {
    currUser:undefined,
    errorMessage:''

}

export const newUserReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        case newUserTypes.BAD_CREDENTIALS:{
            return {
                ...state,
                errorMessage:'Please Fill Out All Fields'
            }
        }
        case newUserTypes.USERNAME_TAKEN:{
            return {
                ...state,
                errorMessage:'Username Taken'
            }
        }
        case newUserTypes.SERVER_ERROR:{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        case newUserTypes.RESET_ERROR:{
            return {
                ...state,
                errorMessage:''
            }        
        }
        case newUserTypes.LOGIN_SUCCESSFUL:{
            return {
                ...state,
                currUser:action.payload.currUser
            }
        }
        default:{
            return state
        }

    }
 
    
}
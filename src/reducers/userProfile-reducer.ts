import { ILoginState, state, IUserState } from "./index";
import { AnyAction } from "redux";
import { userProfileTypes } from "../action-mappers/user-profile-action-mapper";



//when running reducer for the first time this initializes it to null
//since creating a new user is just logging in as a new object, i left this as loginstate
const initialState:IUserState = {
    currUser:undefined,
    errorMessage:''

}

export const userProfileReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        case userProfileTypes.BAD_CREDENTIALS:{
            return {
                ...state,
                errorMessage:'Please Fill Out All Fields'
            }
        }
        case userProfileTypes.PROFILE_NOT_FOUND:{
            return {
                ...state,
                errorMessage:'Profile Not Found'
            }
        }
        case userProfileTypes.SERVER_ERROR:{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        case userProfileTypes.RESET_ERROR:{
            return {
                ...state,
                errorMessage:''
            }        
        }
        case userProfileTypes.PROFILE_FOUND:{
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
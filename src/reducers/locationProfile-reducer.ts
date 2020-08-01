import { ILoginState, state, ILocationState } from "./index";
import { AnyAction } from "redux";
import { locationProfileTypes } from "../action-mappers/location-profile-action-mapper";



//when running reducer for the first time this initializes it to null
//since creating a new user is just logging in as a new object, i left this as loginstate
const initialState:ILocationState = {
    currLocation:undefined,
    errorMessage:''

}

export const locationProfileReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        case locationProfileTypes.BAD_CREDENTIALS:{
            return {
                ...state,
                errorMessage:'Please Fill Out All Fields'
            }
        }
        case locationProfileTypes.PROFILE_NOT_FOUND:{
            return {
                ...state,
                errorMessage:'Profile Not Found'
            }
        }
        case locationProfileTypes.SERVER_ERROR:{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        case locationProfileTypes.RESET_ERROR:{
            return {
                ...state,
                errorMessage:''
            }        
        }
        case locationProfileTypes.PROFILE_FOUND:{
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
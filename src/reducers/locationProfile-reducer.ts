import { ILocationProfileState } from "./index";
import { AnyAction } from "redux";
import { locationProfileTypes } from "../action-mappers/location-profile-action-mapper";

//this is the reducer for the locationProfile
//affected when someone views a location

//when running reducer for the first time this initializes it to null
const initialState:ILocationProfileState = {
    profLocation:undefined,
    errorMessage:''
}

export const locationProfileReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        //location not found
        case locationProfileTypes.PROFILE_NOT_FOUND:{
            return {
                ...state,
                errorMessage:'Profile Not Found'
            }
        }
        //location found and returned
        case locationProfileTypes.PROFILE_FOUND:{
            return {
                ...state,
                profLocation:action.payload.currLocation
            }
        }
        //server error
        case locationProfileTypes.SERVER_ERROR:{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        //reset error
        case locationProfileTypes.RESET_ERROR:{
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
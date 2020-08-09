import { ILocationProfileState } from "./index";
import { AnyAction } from "redux";
import { locationProfileTypes } from "../action-mappers/location-profile-action-mapper";
import { adminUpdateLocationTypes } from "../action-mappers/admin-update-location-action-mapper";
import { userUpdateLocationTypes } from "../action-mappers/user-update-location-action-mapper";

//this is the reducer for the locationProfile
//affected when someone views a location or updates it

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
        //user "visited" is set to false
        case userUpdateLocationTypes.NOT_VISITED:{
            return {
                ...state,
                errorMessage:'You must visit to rate or upload a photo'
            }
        }
        //if admin tries to set the name of a location to one that already exists
        case adminUpdateLocationTypes.NAME_TAKEN:{
            return {
                ...state,
                errorMessage:'Name Taken'
            }
        }
        //user or admin update successful (should work, may have to change payload)
        case (userUpdateLocationTypes.UPDATE_SUCCESSFUL || adminUpdateLocationTypes.UPDATE_SUCCESSFUL): {
            return {
                ...state,
                profLocation:action.payload.updateLoc
            }
        }
        //server error
        case (locationProfileTypes.SERVER_ERROR || userUpdateLocationTypes.SERVER_ERROR || adminUpdateLocationTypes.SERVER_ERROR) :{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        //reset error
        case (locationProfileTypes.RESET_ERROR || userUpdateLocationTypes.RESET_ERROR || adminUpdateLocationTypes.RESET_ERROR):{
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
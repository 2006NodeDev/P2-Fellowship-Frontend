import { IEdittedLocationState } from "./index"
import { AnyAction } from "redux";
import { adminUpdateLocationTypes } from "../action-mappers/admin-update-location-action-mapper";
import { userUpdateLocationTypes } from "../action-mappers/user-update-location-action-mapper";
import { updateTypes } from "../action-mappers/reset-update-action-mapper";


const initialState:IEdittedLocationState = {
    edittedLocation:undefined,
    errorMessage:''
}

//for any eddited location
export const editLocationReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
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
                edittedLocation:action.payload.updateLoc
            }
        }
        //reset it (for profile component)
        case updateTypes.RESET_UPDATE_STATE:{
            return {
                ... state,
                edittedLocation:action.payload.reset
            }
        }
        //server error
        case (userUpdateLocationTypes.SERVER_ERROR || adminUpdateLocationTypes.SERVER_ERROR):{
            return {
                ...state,
                errorMessage:''
            }        
        }      
        //reset error
        case (userUpdateLocationTypes.RESET_ERROR || adminUpdateLocationTypes.RESET_ERROR):{
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
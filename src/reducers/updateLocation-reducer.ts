import { ILocationProfileState } from "./index";
import { AnyAction } from "redux";
import { adminUpdateLocationTypes } from "../action-mappers/admin-update-location-action-mapper";


//when running reducer for the first time this initializes it to null
//since creating a new user is just logging in as a new object, i left this as loginstate
const initialState:ILocationProfileState = {
    profLocation:undefined,
    errorMessage:''

}

export const updateLocationReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        case adminUpdateLocationTypes.BAD_CREDENTIALS:{
            return {
                ...state,
                errorMessage:'Please Fill Out All Fields'
            }
        }
        case adminUpdateLocationTypes.NAME_TAKEN:{
            return {
                ...state,
                errorMessage:'Username Taken'
            }
        }
        case adminUpdateLocationTypes.SERVER_ERROR:{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        case adminUpdateLocationTypes.RESET_ERROR:{
            return {
                ...state,
                errorMessage:''
            }        
        }
        case adminUpdateLocationTypes.UPDATE_SUCCESSFUL:{
            return {
                ...state,
                profLocation:action.payload.updateLoc
            }
        }
        default:{
            return state
        }

    }
 
    
}
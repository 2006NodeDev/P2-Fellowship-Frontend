import { ILocationProfileState } from "./index";
import { AnyAction } from "redux";
import { userUpdateLocationTypes } from "../action-mappers/user-update-location-action-mapper";


//when running reducer for the first time this initializes it to null
//since creating a new user is just logging in as a new object, i left this as loginstate
const initialState:ILocationProfileState = {
    profLocation:undefined,
    errorMessage:''
}

export const userUpdateLocationReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        case userUpdateLocationTypes.NOT_VISITED:{
            return {
                ...state,
                errorMessage:'You must visit a location to update its information!'
            }
        }
        case userUpdateLocationTypes.SERVER_ERROR:{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        case userUpdateLocationTypes.RESET_ERROR:{
            return {
                ...state,
                errorMessage:''
            }        
        }
        case userUpdateLocationTypes.UPDATE_SUCCESSFUL:{
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
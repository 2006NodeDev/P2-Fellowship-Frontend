import { ILoginState, state, ILocationProfileState } from "./index";
import { AnyAction } from "redux";
import { updateLocationTypes } from "../action-mappers/update-location-action-mapper";



//when running reducer for the first time this initializes it to null
//since creating a new user is just logging in as a new object, i left this as loginstate
const initialState:ILocationProfileState = {
    profLocation:undefined,
    errorMessage:''

}

export const updateLocationReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        case updateLocationTypes.BAD_CREDENTIALS:{
            return {
                ...state,
                errorMessage:'Please Fill Out All Fields'
            }
        }
        case updateLocationTypes.NAME_TAKEN:{
            return {
                ...state,
                errorMessage:'Username Taken'
            }
        }
        case updateLocationTypes.SERVER_ERROR:{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        case updateLocationTypes.RESET_ERROR:{
            return {
                ...state,
                errorMessage:''
            }        
        }
        case updateLocationTypes.UPDATE_SUCCESSFUL:{
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
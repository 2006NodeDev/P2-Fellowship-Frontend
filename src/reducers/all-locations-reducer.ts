import { AnyAction } from "redux";
import { IAllLocationsState } from ".";

const initialState:IAllLocationsState = {
    locationsArray:undefined,
    errorMessage:''
}

export const allLocationsReducer = (state = initialState, action:AnyAction) => {
    switch(action.type){
        default:{
            return state
        }
    }
}

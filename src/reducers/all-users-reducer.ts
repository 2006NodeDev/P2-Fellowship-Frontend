import { AnyAction } from "redux";
import { IAllUsersState } from ".";

const initialState:IAllUsersState = {
    usersArray:undefined,
    errorMessage:''
}

export const allUsersReducer = (state = initialState, action:AnyAction) => {
    switch(action.type){
        default:{
            return state
        }
    }
}

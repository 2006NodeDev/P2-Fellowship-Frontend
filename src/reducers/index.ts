import { combineReducers } from "redux";
import { User } from "../models/User";
import { loginReducer } from "./login-reducer";
import { newLocationReducer } from "./newLocation-reducer";
import { userProfileReducer } from "./userProfile-reducer";
import { locationProfileReducer } from "./locationProfile-reducer";

//login interface
export interface ILoginState{
    currUser:User | undefined,
    errorMessage:string

}

//user interface
export interface IUserState{
    currUser:User | undefined,
    errorMessage:string

}
//location interface
export interface ILocationState{
    currLocation:Location | undefined,
    errorMessage:string

}


//type def for state
export interface IState{
    loginState:ILoginState
    locationState:ILocationState
    userState:IUserState

}

//the whole state of the store
export const state = combineReducers <IState>({
    //takes in an object that is all of the reducers
    loginState:loginReducer,
    locationState:locationProfileReducer,
    userState:userProfileReducer



})
import { combineReducers } from "redux";
import { User } from "../models/User";
import {Location} from "../models/Location";
import { loginReducer } from "./login-reducer";
import { userProfileReducer } from "./userProfile-reducer";
import { locationProfileReducer } from "./locationProfile-reducer";

//login interface
//user who is currently logged in
export interface ILoginState{
    currUser:User | undefined,
    errorMessage:string

}

//user interface
//profile that we are viewing/editing (Admin)
export interface IUserProfileState{
    profUser:User | undefined,
    errorMessage:string

}
//location interface
//current Location that we are viewing/editing (Admin)
export interface ILocationProfileState{
    profLocation:Location | undefined,
    errorMessage:string

}




//def of the total state i.e. what sub-states it SHOULD have
export interface IState{
    loginState:ILoginState
    locationProfileState:ILocationProfileState
    userProfileState:IUserProfileState

}

//the whole state i.e. combination of all the mini states
export const state = combineReducers <IState>({
    //takes in an object that is all of the reducers
    loginState:loginReducer,
    locationProfileState:locationProfileReducer,
    userProfileState:userProfileReducer
})
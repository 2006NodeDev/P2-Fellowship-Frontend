// import { ILoginState, state } from "./index";
// import { AnyAction } from "redux";
// import { newLocationTypes } from "../action-mappers/new-location-action-mapper";



// //when running reducer for the first time this initializes it to null
// //since creating a new user is just logging in as a new object, i left this as loginstate
// const initialState:ILoginState = {
//     currUser:undefined,
//     errorMessage:''

// }

// export const newLocationReducer=(state = initialState, action:AnyAction) => {
//     switch(action.type){
//         case newLocationTypes.BAD_CREDENTIALS:{
//             return {
//                 ...state,
//                 errorMessage:'Please Fill Out All Fields'
//             }
//         }
//         case newLocationTypes.NAME_TAKEN:{
//             return {
//                 ...state,
//                 errorMessage:'Username Taken'
//             }
//         }
//         case newLocationTypes.SERVER_ERROR:{
//             return {
//                 ...state,
//                 errorMessage:'Oops...Internal Server Error'
//             }        
//         }
//         case newLocationTypes.RESET_ERROR:{
//             return {
//                 ...state,
//                 errorMessage:''
//             }        
//         }
//         case newLocationTypes.CREATION_SUCCESSFUL:{
//             return {
//                 ...state,
//                 currUser:action.payload.currUser
//             }
//         }
//         default:{
//             return state
//         }

//     }
 
    
// }
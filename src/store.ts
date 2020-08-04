import { compose, applyMiddleware, createStore } from "redux"
import reduxThunk from 'redux-thunk'
import { state } from "./reducers"
//copied directly from Alec cause he said to :P
//this is the whole state of the application - we build it in here

//a state needs: 
//1. the object that is our total state and 
//2. any enhancers we need to make it work better


//browser window
const w:any = window

//if the window has react/redux dev tools, allow to use them, else use the default composer 
const composeEnhancers = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

//make an enhancer to apply redux thunk 
const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk)
)

//making the store
export const store = createStore(
    state,  //this is the state object
    enhancer    //this is the enhancer 
)
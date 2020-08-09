//display return from Full User Card Display Component
import React, { FunctionComponent, useEffect } from 'react'
import { FullUserDisplayComponent } from '../User-Display-Components/FullUserDisplayComponent'
import { useParams } from 'react-router'
import { userProfileActionMapper, userProfileErrorReset } from '../../action-mappers/user-profile-action-mapper'
import { useDispatch, useSelector } from 'react-redux'
import { IState } from '../../reducers'
import { toast } from 'react-toastify'


export const UserProfileComponent:FunctionComponent<any> = (props) => {

    let { userId } = useParams()

    const dispatch = useDispatch()

    //the current user
    const currentUser = useSelector((state: IState) => {
        return state.loginState.currUser
    })

    //the user profile they want to see 
    const userProfile = useSelector((state: IState) => {
        return state.userProfileState.profUser
    })
    const errorMessage = useSelector((state: IState) => {
        return state.userProfileState.errorMessage
    })
    useEffect(()=>{
        const getUser = async ()=>{
            //sending to action mapper
            let thunk = userProfileActionMapper(userId)
            dispatch(thunk)
        }
        if(!userProfile){ //should this be in a seperate useEffect?
            //call the action mapper function if there is no current user profile
            getUser()
        }
    })  
    //if there's an error
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(userProfileErrorReset())
        }
    })
   
 
    return(
        (userProfile)? 
        <FullUserDisplayComponent user={userProfile} />
        :
        <div>
           <h3> User not found </h3>
        </div>
        
    )
}


  
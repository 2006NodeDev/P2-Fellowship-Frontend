//display return from Full User Card Display Component
import React, { FunctionComponent, useEffect, useState } from 'react'
import { FullUserDisplayComponent } from '../User-Display-Components/FullUserDisplayComponent'
import { useParams } from 'react-router'
import { userProfileActionMapper, userProfileErrorReset } from '../../action-mappers/user-profile-action-mapper'
import { useDispatch, useSelector } from 'react-redux'
import { IState } from '../../reducers'
import { toast } from 'react-toastify'
import { resetUpdateActionMapper } from '../../action-mappers/reset-update-action-mapper'


export const UserProfileComponent:FunctionComponent<any> = (props) => {

    let { userId } = useParams()

    const dispatch = useDispatch()

    //the current user
    const currentUser = useSelector((state: IState) => {
        return state.loginState.currUser
    })

    //for check and reset
    const updatedUser = useSelector((state:IState) => {
        return state.userEditState.edittedUser
    })

    //the user profile they want to see 
    const userProfile = useSelector((state: IState) => {
        return state.userProfileState.profUser
    })
    const errorMessage = useSelector((state: IState) => {
        return state.userProfileState.errorMessage
    })

    useEffect(()=> {
        if (updatedUser){
            dispatch(resetUpdateActionMapper())
        }
        if (!userProfile && currentUser?.role === "Admin"){ //does this work?
            dispatch(userProfileActionMapper(userId))
        }
        else if (!userProfile && currentUser) {
            dispatch(userProfileActionMapper(currentUser?.userId))
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
        (currentUser)? 
        <FullUserDisplayComponent user={ userProfile || currentUser} />
        :
        <div>
           <h3> User not found </h3>
        </div>
        
    )
}


  
//display return from Full User Card Display Component
import React, { FunctionComponent, useEffect, useState } from 'react'
import { FullUserDisplayComponent } from '../User-Display-Components/FullUserDisplayComponent'
import { useParams } from 'react-router'
import { userProfileActionMapper, userProfileErrorReset } from '../../action-mappers/user-profile-action-mapper'
import { useDispatch, useSelector } from 'react-redux'
import { IState } from '../../reducers'
import { toast } from 'react-toastify'

//navbar - admin update location 
export const UserProfileComponent:FunctionComponent<any> = (props) => {

    let { userId } = useParams()

    const currentUser = useSelector((state: IState) => {
        return state.loginState.currUser
    })

    const dispatch = useDispatch()

    const userProfile = useSelector((state: IState) => {
        return state.userProfileState.profUser
    })

    const errorMessage = useSelector((state: IState) => {
        return state.userProfileState.errorMessage
    })
    const openProfile = async () => {
        let thunk = userProfileActionMapper(userId)
        dispatch(thunk)
    }
    if (currentUser !== userProfile || !userProfile){
        openProfile();
    }
    //the userProfile state is not the current user state in the case of admin, so we need to get both of them to use
    
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(userProfileErrorReset())
        }
    })
    //make sure we are actually calling the action mapper
    // useEffect(() => {
    //     if(userProfile){
    //         console.log(userProfile.username);
    //     }
    // })
 
    return(
        (userProfile)? 
        <FullUserDisplayComponent user={userProfile} />
        :
        <div>
           <h3> User not found </h3>
        </div>
        
    )
}


  
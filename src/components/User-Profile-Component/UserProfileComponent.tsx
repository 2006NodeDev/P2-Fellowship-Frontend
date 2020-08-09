//display return from Full User Card Display Component
import React, { FunctionComponent, useEffect, useState } from 'react'
import { FullUserDisplayComponent } from '../User-Display-Components/FullUserDisplayComponent'
import { getUserProfile } from '../../remote/user-service/getUserProfile'
import { useParams } from 'react-router'

//navbar - admin update location 
export const UserProfileComponent:FunctionComponent<any> = (props) => {
    

    let[userProfile, changeUserProfile] = useState<any>(null)
    let {userId} = useParams()
    console.log("user Id of profile comp = " + userId)


    //query the server
    useEffect(()=>{

        const getUser = async ()=>{
            let response = await getUserProfile(userId)
            console.log("getUsers response: " + response)
            changeUserProfile(response)
        }

        if(!userProfile){
            getUser()
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


  
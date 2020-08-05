//display return from Full User Card Display Component
import React, { FunctionComponent, useEffect, useState } from 'react'
import { FullUserDisplayComponent } from '../User-Display-Components/FullUserDisplayComponent'
import { UserCardDisplayComponent } from '../User-Display-Components/UserCardDisplayComponent'
import { getAllUsers } from '../../remote/user-service/getAllUsers'
import { User } from '../../models/User'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { IState } from '../../reducers'




export const AllUsersComponent:FunctionComponent<any> = (props) => {

    const thisUser = useSelector((state:IState) => {
        return state.loginState.currUser
    })

    let [allUsers, changeAllUsers] = useState<User[]>([])

    //query the server
    useEffect(()=>{

        const getUsers = async ()=>{
            let response = await getAllUsers()
            changeAllUsers(response)
        }

        if(allUsers.length === 0){
            getUsers()
        }
    })  

    //if the user's rols is an admin, give them the full display
    let userDisplays = allUsers.map((user)=>{
        return (
            (thisUser?.role === 'Admin')?
            <FullUserDisplayComponent key={'user-key-' + user.userId} user={user}/>
            :
            <UserCardDisplayComponent key={'user-key-' + user.userId} user={user}/>            
        )
    })
    
    return(
        <div>
            {userDisplays}
        </div>
        
        
    )
}


  
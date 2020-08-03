import React, { FunctionComponent, useEffect, useState } from 'react'
import { getAllUsers } from '../../remote/user-service/getAllUsers'
import { User } from '../../models/User'
import { DisplayUserCardComponent } from '../User-Display-Components/UserCardDisplayComponent'


export const AllUsersComponent:FunctionComponent<any> = (props) => {

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

    let userDisplays = allUsers.map((user)=>{
        return <DisplayUserCardComponent key={'user-key-' + user.userId} user={user}/>
    })

    return(
        //we should turn this into a grid to make it look nicer
        <div>
            {userDisplays}
        </div>
        
        
    )
}
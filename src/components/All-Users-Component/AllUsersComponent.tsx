//display return from Full User Card Display Component
import React, { FunctionComponent, useEffect, useState } from 'react'
import { FullUserDisplayComponent } from '../User-Display-Components/FullUserDisplayComponent'
import { UserCardDisplayComponent } from '../User-Display-Components/UserCardDisplayComponent'
import { getAllUsers } from '../../remote/user-service/getAllUsers'
import { User } from '../../models/User'
import { useSelector } from 'react-redux'
import { IState } from '../../reducers'
import { Card } from '@material-ui/core'

export const AllUsersComponent: FunctionComponent<any> = (props) => {

    const thisUser = useSelector((state: IState) => {
        return state.loginState.currUser
    })

    let [allUsers, changeAllUsers] = useState<User[]>([])

    //query the server
    useEffect(() => {

        const getUsers = async () => {
            let response = await getAllUsers() //returning undefined
            console.log(response);
            changeAllUsers(response)
        }

        if (allUsers.length === 0) {
            getUsers()
        }
    })

    console.log(allUsers);
    
    if (thisUser && thisUser.role==="Admin"){ 
        return (
            (allUsers) ?
            <div>
                {allUsers.map((user) => {
                    return <FullUserDisplayComponent key={'user-key-' + user.userId} user={user} />
                })}
            </div>
            :
            <div>
                No Users Found
            </div>
        )
    } else if (thisUser){
        return (
            (allUsers) ?
            <div>
                {allUsers.map((user) => {
                    return <UserCardDisplayComponent key={'user-key-' + user.userId} user={user} />
                })}
            </div>
            :
            <div>
                No Users Found
            </div>
        )
    } else {
        return (
            <div>
                No Users Found
            </div>
        )
    }

   
}



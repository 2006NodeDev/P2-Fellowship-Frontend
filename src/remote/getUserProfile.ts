import { FunctionComponent } from "react"
import { User } from '../models/User'
import { fellowshipClient } from "."



export const getUserProfile = async (userId:number) => {
    
    try{
        let response = await fellowshipClient.get(`/users/${userId}`)
        console.log(response)
        return response.data

    }catch(err){
        console.log(err)

    }
    

}
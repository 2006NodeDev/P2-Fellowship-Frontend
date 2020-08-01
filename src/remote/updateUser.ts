import { fellowshipClient } from ".";
import { User } from "../models/User";

export const updateUser = async (user:User) => {
    
    try{
        console.log(user)
        let response = await fellowshipClient.patch(`/users/update/${user.userId}`, user) //for the update endpoint
        console.log(response);
        return response.data
    } catch(e){
        console.log(e);
        throw e
    }
}
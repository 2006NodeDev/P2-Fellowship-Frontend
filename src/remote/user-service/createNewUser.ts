
import { fellowshipClient } from ".."
import { User } from "../../models/User"

export const createNewUser = async (newUser:User) => {

    try{
        let response = await fellowshipClient.post('/P2-Fellowship-User-Service/register', newUser)
        return response.data
        
    } catch(err){
        console.log('new user error: ' + err)
    }   
}
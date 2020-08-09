
import { fellowshipClient } from ".."
import { User } from "../../models/User"
import { log } from "console"

export const createNewUser = async (newUser:User) => {

    try{
        let response = await fellowshipClient.post('/P2-Fellowship-User-Service/register', newUser)
        console.log(`We got the user ${response}`);
        return response.data
    } catch(err){
        console.log('new user error: ' + err)
    }   
}
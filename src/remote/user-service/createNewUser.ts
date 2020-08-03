import { FunctionComponent } from "react"
import { fellowshipClient } from ".."

export const createNewUser = async (username:string, password:string, firstName:string, lastName:string,  affiliation:string, address:string, email:string, role:string, image:string) => {
    
    let credentials = {
        username,
        password,
        firstName,
        lastName,
        affiliation,
        placesVisited:0,
        address,
        email,
        role,
        image 
    } 
    try{
        let response = await fellowshipClient.put('/P2-Fellowship-User-Service/users/newuser', credentials)
        return response.data
        
    } catch(err){
        console.log('new user error: ' + err)
    }   
}
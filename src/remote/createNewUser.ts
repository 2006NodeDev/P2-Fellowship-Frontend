import { FunctionComponent } from "react"
import { fellowshipClient } from "."



export const createNewUser = async (userId: number, username:string, password:string, firstName:string, lastName:string,  address:string, email:string, role:string, image:string) => {
    
    let credentials = {
        userId,
        username,
        password,
        firstName,
        lastName,
        address,
        affiliation:null,
        placesVisited:0,
        email,
        role,
        image 
    }
    try{
        let response = await fellowshipClient.put('/users/newuser', credentials)
        return response.data

    }catch(err){
        console.log('new user error: ' + err)

    }
    

}
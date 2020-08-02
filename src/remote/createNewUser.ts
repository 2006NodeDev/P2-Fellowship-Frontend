import { FunctionComponent } from "react"
import { fellowshipClient } from "."



export const createNewUser = async (username:string, password:string, firstName:string, lastName:string,  affiliation:string, placesVisited:number, address:string, email:string, role:string, image:string) => {
    
    let credentials = {
        username,
        password,
        firstName,
        lastName,
        affiliation:null,
        placesVisited:0,
        address,
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
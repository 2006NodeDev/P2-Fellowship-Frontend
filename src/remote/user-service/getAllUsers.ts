import { FunctionComponent } from "react"
import { fellowshipClient } from ".."



export const getAllUsers = async () => {
    
    try{
        let response = await fellowshipClient.get('/users')
        console.log(response)
        return response.data

    }catch(err){
        console.log(err)

    }
    

}
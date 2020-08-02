import { FunctionComponent } from "react"
import { fellowshipClient } from ".."



export const getAllLocations = async () => {
    
    try{
        let response = await fellowshipClient.get('/locations')
        console.log(response)
        return response.data

    }catch(err){
        console.log(err)

    }
    

}
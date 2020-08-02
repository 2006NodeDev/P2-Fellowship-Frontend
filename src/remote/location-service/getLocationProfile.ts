import { FunctionComponent } from "react"
import { Location } from '../../models/Location'
import { fellowshipClient } from ".."



export const getLocationProfile = async (locationId:number) => {
    
    try{
        let response = await fellowshipClient.get(`/users/${locationId}`)
        console.log(response)
        return response.data

    }catch(err){
        console.log(err)

    }
    

}
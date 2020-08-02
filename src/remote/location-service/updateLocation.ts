import { fellowshipClient } from "..";
import { Location } from "../../models/Location";

export const updateLocation = async (location:Location) => {
    
    try{
        console.log(location)
        let response = await fellowshipClient.patch(`/locations/update/${location.locationId}`, location) //for the update endpoint
        console.log(response);
        return response.data
    } catch(e){
        console.log(e);
        throw e
    }
}
import { fellowshipClient } from "..";
import { Location } from "../../models/Location";

export const adminUpdateLocation = async (location:Location) => {
    
    try{
        console.log(location)
        let response = await fellowshipClient.patch(`/P2-Fellowship-Location-Service/locations/update/${location.locationId}`, location) //for the update endpoint
        console.log(response);
        return response.data
    } catch(e) {
        console.log(e);
        throw e
    }
}
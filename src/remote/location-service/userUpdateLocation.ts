import { fellowshipClient } from "..";

export const userUpdateLocation = async (locationId:number, userId: number, visited:Boolean, rating:number, image:string) => {
    //should this be sending the user id to the backend? 
    //But we should be able to get it with the token
    try{
        console.log(locationId) //check anything else?
        let response = await fellowshipClient.patch(`/P2-Fellowship-Location-Service/locations/user/update/${locationId}`, {userId, visited, rating, image}) //for the update endpoint
        console.log(response);
        //should just be the success code/message
        return response.data
    } catch(e){
        console.log(e);
        throw e
    }
}
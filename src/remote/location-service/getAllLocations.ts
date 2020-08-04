import { fellowshipClient } from ".."

export const getAllLocations = async () => {
    
    try{
        let response = await fellowshipClient.get('/P2-Fellowship-Location-Service/locations')
        console.log(response)
        return response.data
    } catch(err){
        console.log(err)
    }
}
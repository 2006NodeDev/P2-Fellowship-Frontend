import { fellowshipClient } from ".."

export const getLocationProfile = async (locationId:number) => {
    
    try{
        let response = await fellowshipClient.get(`/P2-Fellowship-Location-Service/locations/${locationId}`)
        console.log(response)
        return response.data
    } catch(err) {
        console.log(err)
    }
}
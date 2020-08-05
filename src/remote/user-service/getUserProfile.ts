import { fellowshipClient } from ".."

export const getUserProfile = async (userId:number) => {
    
    try{
        let response = await fellowshipClient.get(`/P2-Fellowship-User-Service/users/${userId}`)
        console.log("get request returns: " + response.data)
        return response.data

    } catch(err){
        console.log(err)
    }
}
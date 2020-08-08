import { fellowshipClient } from ".."

export const fellowshipLogout = async () =>{
    try {
        let response = await fellowshipClient.delete('/P2-Fellowship-User-Service/logout')
        fellowshipClient.defaults.headers.common['Authorization'] = null       
        console.log("response: " + response);
        return response.data //should be null
    } catch (e) {
        console.log(e)
        throw e
    }

    
}


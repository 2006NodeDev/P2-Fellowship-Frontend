import { fellowshipClient } from ".."

export const fellowshipLogout = async () =>{
    try {
        let response = await fellowshipClient.delete('/logout')
        console.log(response);
        return response.data //should be null?
    } catch (e) {
        console.log(e)
        throw e
    }
}
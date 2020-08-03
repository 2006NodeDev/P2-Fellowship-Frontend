import { fellowshipClient } from ".."

export const fellowshipLogin = async (username:string, password:string) => {
    
    let credentials = {
        username,
        password
    }
    console.log("creds into backend login:" + credentials)
    try{
        let response = await fellowshipClient.post('/P2-Fellowship-User-Service/login', credentials)
        fellowshipClient.defaults.headers.common['Authorization'] = response.headers.authorization
        document.cookie = `token=${response.headers.authorization}`

        console.log(response)
        return response.data

    } catch(err){
        console.log('login error ' + err)
        throw (err)
    }
}
import { FunctionComponent } from "react"
import { fellowshipClient } from ".."



export const fellowshipLogin = async (username:string, password:string) => {
    
    let credentials = {
        username,
        password
    }
    console.log("creds into backeng login:" + credentials)
    try{
        let response = await fellowshipClient.post('/login', credentials)
        console.log(response)
        return response.data

    }catch(err){
        console.log('login error ' + err)
        throw (err)

    }
    

}
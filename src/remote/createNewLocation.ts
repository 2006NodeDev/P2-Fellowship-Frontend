import { FunctionComponent } from "react"
import { fellowshipClient } from "."



export const createNewLocation = async (name:string, image:string, realm:string, governance:string,  primaryPopulation:string, type:string, description:string, rating: number, visited:number) => {
    
    let credentials = {
        name, // not null
        image,
        realm,
        governance,
        primaryPopulation,
        type,
        description,
        rating,
        visited
    }
    try{
        let response = await fellowshipClient.put('/location/newlocation', credentials)
        //this doesnt exist yet (7/28/2020 9:50pm EST)
        return response.data

    }catch(err){
        console.log('new location error: ' + err)

    }
    

}
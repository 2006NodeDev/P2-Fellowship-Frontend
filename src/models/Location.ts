import { LocationImage } from "./LocationImage";

export interface Location{
    locationId: number // primary key
    name: string // not null unique
    image?:LocationImage[]
    realm:string //not null
    governance:string 
    primaryPopulation:string
    description:string
    rating:number
    numVisited:number
   

}




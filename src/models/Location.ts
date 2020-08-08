import { LocationImage } from "./LocationImage";

//naming conflicts with img
export interface Location{
    locationId: number //primary key
	name: string //not null unique
	realm:string //not null
	governance:string 
	primaryPopulation: string 
	description: string
	rating: number //the average of ratings from the locations/users joint table
	numVisited:number //based on rows in locations/users joint table
	latitude:number
	longitude:number
	image?:LocationImage[]
    
    /*
    locationId: number // primary key
    name: string // not null unique
    image?:LocationImage[]
    realm:string //not null
    governance:string 
    primaryPopulation:string
    description:string
    rating:number
    numVisited:number
   */

}




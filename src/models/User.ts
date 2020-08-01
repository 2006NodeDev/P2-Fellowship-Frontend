import { Location } from "./Location";

export interface User{
    userId: number // primary key
    username: string // not null, unique
    password: string // not null
    firstName: string // not null
    lastName: string 
    affiliation:string  //not null
    placesVisited:number
    address:string
    email: string // not null
    role:string //not null
    image?:string
}
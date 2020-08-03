import axios from 'axios'
import {fellowshipBaseURL} from '../environment'

export const fellowshipClient = axios.create({
    baseURL:fellowshipBaseURL,
    headers:{
        'Content-Type':'application/json'
    },
    // withCredentials:true
})
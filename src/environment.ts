export let fellowshipBaseURL:string

if(process.env['NODE_ENV'] === 'production'){
    fellowshipBaseURL='http://35.201.87.115'
    //change this

}else{ //need access to location service too though???
    fellowshipBaseURL='http://localhost:80'
}
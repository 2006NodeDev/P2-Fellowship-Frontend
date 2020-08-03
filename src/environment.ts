export let fellowshipBaseURL:string

if(process.env['NODE_ENV'] === 'production'){
    fellowshipBaseURL='http://35.190.10.193'
    //change this

}else{ //need access to location service too though???
    fellowshipBaseURL='http://localhost:80'
}
export let fellowshipBaseURL:string

if(process.env['NODE_ENV'] === 'production'){
    fellowshipBaseURL='http://35.190.10.193'
    //change this

}else{
    fellowshipBaseURL='http://localhost:2020'
}
export let fellowshipBaseURL:string

if(process.env['NODE_ENV'] === 'production'){
    fellowshipBaseURL='http://35.190.10.193'
    //change this

}else{
<<<<<<< HEAD
    fellowshipBaseURL='http://localhost:2006'
=======
    fellowshipBaseURL='http://localhost:80/P2-Fellowship-User-Service'
>>>>>>> master
}
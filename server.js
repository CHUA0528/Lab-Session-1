const express = require('express');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.listen(port,()=>{
    console.log('Server listening at http://localhost:3000');
})

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post( '/', (req, res) =>{
    let data=req.body;
    res.send(data.name+req.body.email) }); 
    
    
//Data from client
let users = [
    {
        username: "Soo",
        password:bcrypt.hashSync("password",saltRounds)

    }

]

//function to register
function register( newusername,newpassword){
    //To do:Check if username is already taken
    let found=users.find(element=>element.username==newusername) 
    if (found)
    {
        return "Username already taken"
    }

    //hash password
    bcrypt.hash(newpassword, saltRounds, function(err, hash) {
        //Store the newusername and hashed password to the users array (database)
        users.push({
            username: newusername,
            password: hash
        })

    });     //function(err, hash) is used to check if there is any error in hashing

  return "Register successfully"
  //if the username is accepted and there is no error in hashing, return "Register successfully" 
}

//function to login
function login(username,password){

    //Search for the username in the users array
    let matched=users.find(element=>element.username==username)
    if(matched)
    {
        //if the username is found, compare the password with the hashed password in the users array
        bcrypt.compare(password, matched.password, function(err, result){console.log(result)})  
        if(true)  
        {
            return matched
        }
        else
        {
            return "Password not matched"
        }   
    
    
    }
    return "Username not found";
}

//user interface
app.post('/Register', (req, res) => 
{
    let data=req.body;
    res.send(register(data.username,data.password));
});

app.post('/Login',(req,res)=>{
    let data=req.body;
    res.send(login(data.username,data.password));
})

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
        password:"password"

    }

]

//function to register
function register( newusername,newpassword)
{
    //To do:Check
    let found=users.find(element=>element.username==newusername) 
    if (found)
    {
        let matched=users.find(element=>element.password==newpassword)
        if(matched)
        {
            return "no hashed password"
        }
        return "password is hashed"
  
    }

    //hash password
  
    bcrypt.hash(newpassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        
        users.push({
            username: newusername,
            password: hash
        })
    });
  
  
  return "Register successfully"



}

//function to login
function login(username,password){
    console.log("someone try to login with",username,password)
    users.find(element=>{
        console.log(element)

    })

    let matched=users.find(element=>element.username==username)
    if(matched)
    {
        bcrypt.compare(password, matched.password, function(err, result){console.log(result)})  
        if(true)
        {
            return "matched"
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

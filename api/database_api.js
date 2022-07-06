var express = require('express')
var cors = require('cors')
var mysql = require('mysql')

var app = express()
app.use(cors())

app.all('/',(req,res)=>{
    var params = req.query;
    if(! ('task_name' in params)){
        res.send(JSON.stringify({
            error : 'task name is missing in your request'
        }))
    }else{
        var connection = mysql.createConnection({
            user:"root",
            password:"mysqlpassword",
            host:"localhost",
            port:3306
        })
        connection.query("create database if not exists start_talking_in_english;",(error)=>{
            if(error){
                console.log('there was an error in creating database')
                console.log(error)
            }
            
        })
        connection.end()
        connection = mysql.createConnection({
            user:'root',
            password:'mysqlpassword',
            host:"localhost",
            port:3306,
            database:"start_talking_in_english"
        })
        connection.query(`create table if not exists users(
            id int primary key auto_increment,
            username varchar(50),
            password varchar(50)
        )`,(error)=>{
            if(error){
                console.log('an error happened while creating users table')
                console.log(error)
            }
        })
        switch(params.task_name){
            case 'register_new_user':
                //todo : check here if that username is taken or not
                mysql_query = `insert into users (username,password) values ('${params.username}','${params.password}')`;
                connection.query(mysql_query,(error)=>{
                    if(error){
                        res.send(JSON.stringify({
                            error
                        }))
                    }else{
                        res.send(JSON.stringify({}))
                    }
                })
                break;
            case 'verify_user_password':
                connection.query(`select password from users where username = '${params.username}'`,(error,result)=>{
                    if(error){
                        res.json({
                            error
                        })
                    }
                    var correct_password = result[0]['password']
                    var verified = ((correct_password == params.password) ? true : false )
                    res.send(JSON.stringify({
                        result : verified
                    }))
                })
                
            case 'is_username_available':
                connection.query(`select username from users where username = '${params.username}'`,(error,result)=>{
                    if(error){
                        res.json({
                            error
                        })
                    }else{
                        res.json({
                            result : (result.length == 0 ? true : false)
                        })
                    }
                })
            break;

        }
    }
    
})
app.listen(4000,()=>{
    console.log("database api is listening on port 4000")
})
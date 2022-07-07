var express = require('express')
var cors = require('cors')
var mysql = require('mysql')
var fs = require('fs')
var app = express()
app.use(cors())

app.post('/',(req,res)=>{
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
            database:"start_talking_in_english",
            multipleStatements:true
        })
        var config_tables_mysql_query = `
            create table if not exists users(
                id int primary key auto_increment,
                username varchar(50),
                password varchar(50)
            );
            create table if not exists podcasts(
                id int primary key auto_increment,
                username varchar(50),
                name varchar(50),
                description varchar(200)
            );
            create table if not exists support_tickets(
                id int primary key auto_increment,
                username varchar(50),
                text varchar(200),
                is_proceed varchar(20) default 'false'
                
            );
        `
        connection.query(config_tables_mysql_query,(error)=>{
            if(error){
                console.log('an error happened while configuring tables - error is ->')
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
            case 'upload_new_podcast':
                connection.query(`insert into podcasts (username,name,description) values ('${params.username}','${params.name}','${params.description}')`)
                connection.query(`select id from podcasts where username = '${params.username}' `,(error,result)=>{
                    res.json({
                        id_of_inserted_row : result[result.length -1]
                    })
                })
                break;
            case 'write_or_update_podcast_text': 
                fs.mkdirSync('./uploaded_podcasts_texts')
                fs.writeFileSync('./uploaded_podcasts_texts/' + params.podcast_row_id + ".txt",params.text,(error)=>{
                    if(error){
                        res.json({
                            error
                        })
                    }else{
                        res.json({})
                    }
                    
                })
                break;
            case 'new_support_ticket':
                connection.query(`insert into support_tickets (username,text) values ('${params.username}','${params.text}'))`,(error)=>{
                    if(error){
                        res.json({
                            error
                        })
                    }else{
                        res.json({})
                    }
                })
                break;
            case 'toggle_support_ticket_proceeding_status':
                connection.query(`update support_tickets set is_proceed = 'true' where id = ${Number(params.support_ticket_id)}`,error=>{
                    if(error){
                        res.json({error})
                    }else{
                        res.json({})
                    }
                })
                break;
            case 'get_podcast_data' :
                var file_content = fs.readFileSync('./uploaded_podcasts_texts/'+params.podcast_row_id+".txt")
                connection.query(`select * from podcasts where id=${params.podcast_row_id}`,(error,result)=>{
                    if(error){
                        res.json({error})
                    }else{
                        res.json({
                            podcast_row_id,
                            text : file_content,
                            ...result
                        })
                    }
                })
                res.json({
                    result:file_content
                })
                break;
        }
    }
    
})
app.listen(4000,()=>{
    console.log("database api is listening on port 4000")
})
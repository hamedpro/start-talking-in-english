var express = require('express')
var cors = require('cors')
var mysql = require('mysql')
var fs = require('fs')
var app = express()
app.use(cors())
class response_manager{
    // i have code it like this to have a standard about what server will send in diffrent siturations 
    // todo : i have to also handle response in front-end in same way
    response;
    errors = [];
    result;
    constructor(response){
        this.response = response
    }
    append_to_response = data =>{
        this.response.write(data)
    }
    add_error = error => {
        this.errors.push(error)
    }
    set_result = result => this.result = result
    send = ()=>{
        // write all data to response and with send it ends the connection
        this.response.send(JSON.stringify({
            errors: this.errors ,
            result : this.result 
        }))
        //standard for "result" field => (bool for when we mean the task is done completely or not) 
        //or (array or ... if we had requested data from server )
    }
}
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

app.all('/',(req,res)=>{
    var response_manager_1 = new response_manager(res)
    var params = req.query;
    if(! ('task_name' in params)){
        res.send(JSON.stringify({
            error : 'task name is missing in your request'
        }))
    }
    switch(params.task_name){
        case 'register_new_user':
            //todo : check here if that username is taken or not
            mysql_query = `insert into users (username,password) values ('${params.username}','${params.password}')`;
            connection.query(mysql_query,(error)=>{
                if(error){
                    response_manager_1.add_error(error)
                }
                response_manager_1.set_result(true)
                response_manager_1.send() 
            })
            
            break;
        case 'verify_user_password':
            connection.query(`select password from users where username = '${params.username}'`,(error,result)=>{
                if(error){
                    response_manager_1.add_error(error)
                }
                //todo : here check if the username is not even taken
                console.log(result)
                var correct_password = result[0]['password']
                var verified = ((correct_password == params.password) ? true : false )
                response_manager_1.set_result(verified)
                response_manager_1.send()
            })
            break;
        case 'is_username_available':
            connection.query(`select username from users where username = '${params.username}'`,(error,result)=>{
                if(error){
                    response_manager_1.add_error(error)
                }else{
                    response_manager_1.set_result(result.length == 0 ? true : false)
                    response_manager_1.send()
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
        case 'set_podcast_text': 
            console.log('llll')
            var dir = __dirname + '/uploaded_podcasts_texts'
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir)
            }
            fs.writeFileSync(dir +`/`+ params.podcast_row_id + ".txt",params.text,(error)=>{
                if(error){
                    (response_manager_1.add_error(error))
                }
                response_manager_1.set_result({})
                response_manager_1.send()
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
            var podcast_text_file_path = './uploaded_podcasts_texts/'+params.podcast_row_id+".txt"
            var file_content = (fs.existsSync(podcast_text_file_path) ?  fs.readFileSync() : "")
            connection.query(`select * from podcasts where id=${params.podcast_row_id}`,(error,results)=>{
                podcast_data = {
                    podcast_row_id : params.podcast_row_id,
                    text : file_content
                }
                for(key in results[0]){
                    podcast_data[key] = results[0][key]
                }
                if(error){(response_manager_1.add_error(error))}
                response_manager_1.set_result(podcast_data)
                response_manager_1.send()
            })
            break;
        
        case "get_ids_of_podcasts" :
            connection.query(`select id from podcasts`,(error,results)=>{
                var ids = []
                results.forEach(result=>{
                    ids.push(result.id)
                })
                if(error){
                    response_manager_1.add_error(error)
                }
                response_manager_1.set_result(ids)
                response_manager_1.send()
            })
            
    }
    
})
app.listen(4000,()=>{
    console.log("database api is listening on port 4000")
})
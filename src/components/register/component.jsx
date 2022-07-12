import "./styles.css"
import { object_to_url ,customAjax} from "../../../common-codes/custom_ajax/dev/custom_ajax"
export default function Register(){
    
    var register_new_user_button = () =>{
        var entered_username = document.querySelector('#register_page #username_input').value
        var entered_password = document.querySelector('#register_page #password_input').value
        customAjax({
            params:{
                task_name : "is_username_available",
                username : entered_username
            }
        }).then(res=>res.json()).then(json=>{
            if(json.errors.length == 0){
                if(json.result){
                    if(json.result){
                        customAjax({
                            params:{
                                task_name :"register_new_user",
                                username : entered_username,
                                password : entered_password
                            }
                        }).then(res=>res.json())
                        .then(json=>{
                            if(json.errors.length == 0){
                                alert('new user registered successfuly')
                            }else{
                                alert('there was an error in registering new user - open console to see details')
                                console.error(json.errors)
                            }
                        })
                    }
                }else{
                    alert('username is taken by another user please pick up another username')
                }
                
            }else {
                alert('error while checking if username is taken or not - details are in dev console ')
                console.log(json.errors)
            }
        })
        
    }
    return(
        <div id="register_page" className="mx-auto flex flex-col justify-center w-80 p-2">
            <b>username :</b>
            <input id="username_input" className="border border-solid focus:border-blue-400" />

            <b>password :</b>
            <input id="password_input" type="password" className="border border-solid focus:border-blue-400" />

            <button onClick={register_new_user_button} id="register_new_user_button" className="button bg-green-500 text-white rounded mt-3 py-1">register new user</button>
        </div>
    )
}
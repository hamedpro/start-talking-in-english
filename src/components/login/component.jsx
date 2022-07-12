import { useNavigate } from "react-router-dom"
import {customAjax} from "../../../common-codes/custom_ajax/dev/custom_ajax"

export default function Login(){
    function login(nav){
        var entered_username = document.querySelector('#login_page #username_input').value
        var entered_password = document.querySelector('#login_page #password_input').value
        customAjax({
            params : {
                task_name : "verify_user_password",
                username : entered_username,
                password : entered_password
            }
        }).then(res=>res.json())
        .then(json=>{
            if(json.result){
                alert('you are logged in')
                window.localStorage.setItem('username',entered_username)
                nav('/')
            }else{
                alert('usename or password was not correct')
            }
        })
    }
    var nav = useNavigate()
    return(
        <div id="login_page" className="mx-auto flex flex-col justify-center w-80 p-2">
            <b>username :</b>
            <input id="username_input" className="border border-solid focus:border-blue-400" />

            <b>password :</b>
            <input id="password_input" type="password" className="border border-solid focus:border-blue-400" />

            <button onClick={()=>login(nav)} className="button bg-green-500 text-white rounded mt-3 py-1">register new user</button>
        </div>
    )
}
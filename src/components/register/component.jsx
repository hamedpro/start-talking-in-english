import "./styles.css"
export default function Register(){
    var register_new_user_button = () =>{
        var entered_username = document.querySelector('#register_page #username_input').value
        var entered_password = document.querySelector('#register_page #password_input').value
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
import { customAjax } from "../../custom_ajax"
export default function NewSupportTicket(){
    function submit_support_ticket(){
        var username = window.localStorage.getItem('username')
        var support_ticket_text = document.getElementById('support_ticket_text_input').value
        customAjax({
            params:{
                task_name : "new_support_ticket",
                username,
                text : support_ticket_text
            },
            method : "POST"
        }).then(res=>res.json()).then(res=>{
            if(res.result){
                alert('done successfuly')
            }else{
                alert('something went wrong')
            }
        })

    }
    return(
        <div className="bg-blue-400 mx-auto mt-2 p-2 w-80 rounded">
            <p>username: </p>
            <input defaultValue={window.localStorage.getItem('username')} className="w-full block rounded" disabled/>

            <p>text:</p>
            <textarea className="w-full rounded" id="support_ticket_text_input" placeholder="enter text here"></textarea>

            <button type="button" className="bg-green-500 text-white p-1 rounded mt-3" onClick={submit_support_ticket}>submit support_ticket</button>

        </div>
    )
}
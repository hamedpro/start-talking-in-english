import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {customAjax} from "../../custom_ajax"
export default function SupportTicket(){
    var params = useParams()
    var support_ticket_id = params.support_ticket_id
    const [support_ticket_data,set_support_ticket_data] = useState({
        username:"loading ...",
        text:"loading ...",
        is_proceed : true,
        id:"loading ..."
    })
    function update_state(){
        customAjax({
            params:{
                task_name : "get_support_tickets"
            }
        }).then(res=>res.json()).then(response=>{
            var tmp = response.result.filter(item=>item.id == support_ticket_id)[0]
            set_support_ticket_data(tmp)
        })
    }
    useEffect(()=>{
        update_state()
    },[])
    var toggle_proceeding_state = ()=>{
        customAjax({
            params:{
                task_name : "toggle_support_ticket_proceeding_status",
                support_ticket_id
            }
        }).then(res=>res.json()).then(res=>{
            if(res.result){
                update_state()
            }
        })
    }
    return(
        <>
            <div className="w-80 mx-auto rounded bg-blue-400 mt-3">
                <p>usename : {support_ticket_data["username"]}</p>
                <p>text : {support_ticket_data["text"]}</p>
                <p>peoceeding_state : {support_ticket_data["is_proceed"] == "true" ? "support ticket is peoceeded":"support ticket is not proceeded"}</p>
                <p>id : {support_ticket_data["id"]}</p>
            </div>
            <button onClick={toggle_proceeding_state}>toggle proceeding status</button>
            
        </>
    )
}
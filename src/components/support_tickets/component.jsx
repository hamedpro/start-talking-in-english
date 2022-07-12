import { useEffect, useState } from "react"
import ListItem from "../../common_components/ListItem/comp"
import { customAjax } from "../../../common-codes/custom_ajax/dev/custom_ajax"

export default function SupportTickets(){
    const [support_tickets,set_support_tickets] = useState([])
    useEffect(()=>{
        customAjax({
            params:{
                task_name : "get_support_tickets"
            }
        }).then(res=>res.json()).then(res=>{
            set_support_tickets(res.result)
        })
    },[])

    return(
        <div className="mx-auto w-80 bg-yellow-400 rounded p-2 mt-3">
            {support_tickets.map(support_ticket=>{
                return(
                    <ListItem title={support_ticket.text.slice(0,15) + "..."} info={support_ticket.username} path={"/support_ticket/"+support_ticket.id}/>
                )
            })}
        </div>
      
    )
}
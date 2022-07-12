import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {customAjax} from "../../../common-codes/custom_api_system/dev/custom_ajax"
export default function Podcast(){
    var podcast_id = useParams().podcast_id
    const [podcast_data,set_podcast_data] = useState({})
    useEffect(()=>{
        customAjax({
            params:{
                task_name : "get_podcast_data",
                podcast_row_id : podcast_id
            }
        }).then(res=>res.json())
        .then(response=>{
            set_podcast_data(response.result)
        })
    },[])
    return(
        <div className="w-80 mx-auto bg-blue-400 rounded mt-4 p-2">
            <p className="text-white bg-blue-500 w-fit rounded">{"podcast_id : " + podcast_data.podcast_row_id}</p>
            <p className="text-white bg-blue-500 w-fit rounded">{"text : " + podcast_data.text}</p>
            <p className="text-white bg-blue-500 w-fit rounded">{"description : " + podcast_data.description}</p>
            <p className="text-white bg-blue-500 w-fit rounded">{"username : " + podcast_data.username}</p>
            <p className="text-white bg-blue-500 w-fit rounded">{"name : " + podcast_data.name}</p>
        </div>
    )
}
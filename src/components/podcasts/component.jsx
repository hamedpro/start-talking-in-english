import { useEffect, useState } from "react"
import ListItem from "../../common_components/ListItem/comp"
import {customAjax} from "../../../common-codes/custom_ajax/dev/custom_ajax"

export default function Podcasts(){
    const [ids_of_podcasts,set_ids_of_podcasts] = useState([])
    useEffect(()=>{
        customAjax({
            params:{
                task_name : "get_ids_of_podcasts"
            }
        }).then(res=>res.json())
        .then(response=>{
            set_ids_of_podcasts(response.result)
        })
    },[])
    
    var PodcastListItem = props =>{
        //its a custom edited version of ListItem component 
        //which is designed to show podcast_items in podcasts list
        const [podcast_data,refresh_podcast_data] = useState({})
        useEffect(()=>{
            customAjax({
                params:{
                    task_name : "get_podcast_data",
                    podcast_row_id : props.podcast_row_id
                }
            }).then(res=>res.json())
            .then(response=>{
                refresh_podcast_data(response.result)
            })
        },[])
       
        return(
            <ListItem title={podcast_data.name} info={podcast_data.description} path={`/podcast/${podcast_data.id}`} />
        )

    }
    
    return(
        <>
        <h1>podcasts</h1>
        {ids_of_podcasts.map(id_of_podcast=>{
            return (
                <PodcastListItem key={id_of_podcast} podcast_row_id={id_of_podcast} />
            )
        })}
        </>
    )
}
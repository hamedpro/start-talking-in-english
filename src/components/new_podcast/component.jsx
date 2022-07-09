import "./styles.css"
import {customAjax} from "../../custom_ajax"
export default function NewPodcast(){
    function save_new_podcast(){
        customAjax({
            params: {
                task_name : "upload_new_podcast",
                username : window.localStorage.getItem('username'),
                name : document.getElementById('podcast_name_input').value,
                description : document.getElementById('description_input').value
            }
        }).then(res=>res.json()).then(response=>{
            var inserted_podcast_id = response.id_of_inserted_row.id
            customAjax({
                params:{
                    task_name : "set_podcast_text",
                    podcast_row_id : inserted_podcast_id,
                    text : document.getElementById('text_of_podcast_textarea').value 
                }, 
                method: "POST" // becuse its possible for podcast's text to pass valid length which GET request can handle 
            }).then(res=>res.json()).then(response=>{
                console.log(response)
            })
        })
        
    }
    return(
        <div id="new_podcast_page">
            <div className="mx-auto w-80 rounded">
                <h1 className="bg-gray-100 px-1 rounded my-2 w-fit text-xl">podcast data</h1>
            </div>
            
            <div className="box bg-blue-500 text-white mx-auto w-80 rounded p-2">
                <b>username :</b>
                <input id="username_input" className="text-black" defaultValue={window.localStorage.getItem('username')} disabled/>
                
                <b>podcast_name :</b>
                <input className="text-black" id="podcast_name_input" />
                <b>description of podcast :</b>
                <input id="description_input" className="text-black"  />
            </div>
            <div className="mx-auto w-80 rounded mt-4">
                <h1 className="bg-gray-100 px-1 rounded my-2 w-fit text-xl">podcast complete text :</h1>
            </div>

            <div className="box bg-blue-500 mx-auto w-80 rounded p-2">
                <textarea 
                className="w-full rounded p-1 mb-0"
                id="text_of_podcast_textarea" placeholder="enter podcast's text here ... ">
                </textarea>
            </div>
            <div className="mx-auto w-80 mt-4">
                <button className="bg-blue-400 p-1 rounded text-yellow-100">go to "upload podcast's file" page </button>
            </div>

            <button type="button" className="w-80 mx-auto block bg-green-500 text-white rounded mt-5 py-2 text-lg" onClick={save_new_podcast}>submit all changes </button>

        </div>
        
    )
}
import { useNavigate } from "react-router-dom"
import "./styles.css"
export default function MainHeader(){
    var navigate = useNavigate()
    return(
        <div id="main_header_component" className="flex flex-row mx-auto mt-4 bg-blue-400 rounded">
            <div className="basis-8/12 flex items-center">
                <h1 onClick={()=>{navigate(`/`)}} className="text-blue-400 text-lg">start-talking-in-english</h1>
            </div>
            <div className="basis-3/12"></div>
            <div className="basis-1/12">
                <div id="profile_button" className="flex justify-center items-center">
                    <b>ok</b>
                </div>
            </div>
            
        </div>

        
    )
}
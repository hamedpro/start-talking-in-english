import { useNavigate } from "react-router-dom"
import "./styles.css"
export default function ListItem(props){
    //props should be like this struc : title , info , path
    var nav = useNavigate()
    return (
        <div className="w-80 mx-auto flex items-center mt-2 bg-blue-500 rounded p-2">
            <div className="w-2/3">
                <p className="text-white bg-blue-900 w-fit px-1">{props.title}</p>
                <p className="text-gray-100 w-fit px-1 mt-1">{props.info}</p>
            </div>
            <div className="w-1/3 flex justify-center">
                <a onClick={()=>nav(props.path)} className='text-white'>open it</a>
            </div>
            
        </div>

    )
}
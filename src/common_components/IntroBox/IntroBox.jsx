import "./IntroBox.css"
export default function IntroBox(props){
    return(
        <div className="intro_box w-80 bg-blue-700 mx-auto mt-3 rounded">
            <div className="p-3">
                <h1 className="text-gray-50 text-xl mb-1">{props.title}</h1>
                <p className="text-gray-300">{props.text}</p>
            </div>
            
            <a className="bg-green-500 rounded-b flex justify-center w-full text-black py-1 cursor-pointer" onClick={props.click_func}>go to link</a>
        </div>
    )
}
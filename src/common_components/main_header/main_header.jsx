import "./styles.css"
export default function MainHeader(){
    return(
        <div id="main_header_component" className="flex flex-row mx-auto mt-4">
            <div className="basis-8/12 flex items-center">
                <h1>start-talking-in-english</h1>
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
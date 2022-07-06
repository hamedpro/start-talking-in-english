import IntroBox from "../../common_components/IntroBox/IntroBox"
export default function RootComponent(){
    var test_items = [
        {
            index:0,
            title:'info',
            text:'click here to see a description of why we have created this platform',
            click_func : ()=>{window.setCurrentPath("/info")}
        }
        ,{
            index:1,
            title:'support',
            text:'click here here and contact our support part if you have any issue with our platform',
            click_func : ()=>{window.setCurrentPath("/support")}
        },{
            index:2,
            title:'podcasts',
            text:'here you can access to full collection of all uploaded podcasts and thier informations',
            click_func : ()=>{window.setCurrentPath("/podcasts")}
        },{
            index:3,
            title:'new_podcast',
            text:'click here if you want to upload a podcast that you have created',
            click_func : ()=>{window.setCurrentPath("/new_podcast")}
        },{
            index:4,
            title:'login',
            text:'click here to login to your existing account',
            click_func : ()=>{window.setCurrentPath("/login")}
        },{
            index:5,
            title:'register',
            text:'if you have not an account in our platform you can register here for free',
            click_func : ()=>{window.setCurrentPath("/register")}
        }
    ]
    return(
        <div id="root_component">
           {test_items.map(item=>{
            return(<IntroBox key={item.index} title={item.title} text={item.text} click_func={item.click_func}/>)
           })}
        </div>
    )
}
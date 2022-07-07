import IntroBox from "../../common_components/IntroBox/IntroBox"
export default function RootComponent(){
    var test_items = [
        {
            index:0,
            title:'info',
            text:'click here to see a description of why we have created this platform',
            path : "/info"
        }
        ,{
            index:1,
            title:'support',
            text:'click here here and contact our support part if you have any issue with our platform',
            path : '/support'
        },{
            index:2,
            title:'podcasts',
            text:'here you can access to full collection of all uploaded podcasts and thier informations',
            path : "/podcasts"
        },{
            index:3,
            title:'new_podcast',
            text:'click here if you want to upload a podcast that you have created',
            path : "/new_podcast"
        },{
            index:4,
            title:'login',
            text:'click here to login to your existing account',
            path : "/login"
        },{
            index:5,
            title:'register',
            text:'if you have not an account in our platform you can register here for free',
            path : "/register"
        }
    ]
    return(
        <div id="root_component">
           {test_items.map(item=>{
            return(<IntroBox key={item.index} title={item.title} text={item.text} path={item.path}/>)
           })}
        </div>
    )
}
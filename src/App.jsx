import { useState} from 'react'
import './App.css'
import MainHeader from './common_components/main_header/main_header'
import RootComponent from './components/root_component/comp'
import Info from "./components/info_component/info"
import Support from './components/support_component/component'
import Podcast from './components/podcast/component'
import Podcasts from './components/podcasts/component'
import NewPodcast from './components/new_podcast/component'
import Login from './components/login/component'
import Register from "./components/register/component"

function App(){
  const [currentPath , setCurrentPath] = useState('/')
  //above state values pattern : { "/" for root } and { "/home" for home }
  window.setCurrentPath = setCurrentPath
  return(
    <div>
      <MainHeader />
      {currentPath == "/" ? RootComponent(): <div></div>}
      {currentPath == "/info" ? Info(): <div></div>}
      {currentPath == "/support" ? Support(): <div></div>}
      {currentPath == "/podcasts" ? Podcasts(): <div></div>}
      {currentPath == "/podcast" ? Podcast(): <div></div>}
      {currentPath == "/new_podcast" ? NewPodcast(): <div></div>}
      {currentPath == "/login" ? Login(): <div></div>}
      {currentPath == "/register" ? Register(): <div></div>}
    </div>
  )
}

export default App

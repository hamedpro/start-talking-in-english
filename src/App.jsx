import { useState} from 'react'
import './App.css'
import MainHeader from './common_components/main_header/main_header'
import RootComponent from './root_component/comp'
function App(){
  const [currentPath , setCurrentPath] = useState('/')
  //above state values pattern : { "/" for root } and { "/home" for home }
  window.setCurrentPath = setCurrentPath
  return(
    <div>
      {MainHeader()}
      {currentPath == "/" ? RootComponent(): <div></div>}
    </div>
  )
}

export default App

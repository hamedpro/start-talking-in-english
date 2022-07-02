import { useState} from 'react'
import logo from './logo.svg'
import './App.css'

function RootComponent(){
  return(
    <button onClick={()=>{window.setCurrentPath("/home")}}>go to home component</button>
  )
}
function HomeComponent(){
  return(
    <button onClick={()=>{window.setCurrentPath("/")}}>go to root</button>
  )
}
function App(){
  const [currentPath , setCurrentPath] = useState('/')
  //above state values pattern : { / for root } and { /home for home }
  window.setCurrentPath = setCurrentPath
  
  switch(currentPath){
    case "/" :
      return RootComponent()
    case "/home":
      return HomeComponent()
      break;
  } 
 
}

export default App

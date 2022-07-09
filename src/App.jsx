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
import {BrowserRouter,Route,Routes} from "react-router-dom"

function App(){
  return(
    <BrowserRouter>
      <MainHeader />
      <Routes>
        <Route path="/" element={<RootComponent />} />
        <Route path="/info" element={<Info />} />
        <Route path="/support" element={<Support />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/podcast/:podcast_id" element={<Podcast />} />
        <Route path="/new_podcast" element={<NewPodcast />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

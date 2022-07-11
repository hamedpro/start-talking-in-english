import { useState} from 'react'
import './App.css'
import MainHeader from './common_components/main_header/main_header'
import RootComponent from './components/root_component/comp'
import Info from "./components/info_component/info"
import Podcast from './components/podcast/component'
import Podcasts from './components/podcasts/component'
import NewPodcast from './components/new_podcast/component'
import Login from './components/login/component'
import Register from "./components/register/component"
import SupportTickets from './components/support_tickets/component.jsx'
import SupportTicket from "./components/support_ticket/comp.jsx"
import NewSupportTicket from "./components/new_support_ticket/comp.jsx"
import UploadPodcastFile from "./components/upload_podcast_file/comp.jsx"
import {BrowserRouter,Route,Routes} from "react-router-dom"

function App(){
  return(
    <BrowserRouter>
      <MainHeader />
      <Routes>
        <Route path="/" element={<RootComponent />} />
        <Route path="/info" element={<Info />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/podcast/:podcast_id" element={<Podcast />} />
        <Route path="/new_podcast" element={<NewPodcast />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/support_tickets" element={<SupportTickets />} />
        <Route path="/support_ticket/:support_ticket_id" element={<SupportTicket />} />
        <Route path="/new_support_ticket" element={<NewSupportTicket />} />
        <Route path="/upload_podcast_file/:podcast_id" element={<UploadPodcastFile />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App

import React,{useEffect} from "react";
import "./App.css";
// import Chatlayout from "./Chatapplication/chatlayout/Chatlayout";
import Login from "./componentss/Login/Login";
import Register from "./Register/Register";
import Leftnav from "./componentss/leftsidebar";
import MiddileSide from "./componentss/middilecontainer/middileside";
import Rightnav from "./componentss/rightcontainer/rightcontainer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./componentss/home";
import Vedios from "./uploaded/vedios";
import { auth } from "./firebase/firebase";
import useUser from "./useStore/userstore";

import ChatRoom from "./Chatapplication/Chat/Chat"; 

import SearchComponent from "./Searchuser/searchuser";
import Chatbot from "./Chatbot/Chatbot";

function App() {

  return (
    <>
      <BrowserRouter>
       
        <Routes>
          <Route path="/reels" element={<Vedios />} />
          <Route path="/userprofile" element={<SearchComponent/>}/>

          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

          <Route path="/" element={<Register />} />

          <Route path="/message" element={<ChatRoom />} />
          <Route path="/help" element={<Chatbot/>}/>

          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;



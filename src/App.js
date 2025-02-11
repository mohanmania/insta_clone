import React,{Suspense, useEffect} from "react";
import "./App.css";
import Login from "./componentss/Login/Login";
import Register from "./Register/Register";
import Leftnav from "./componentss/leftsidebar";
import MiddileSide from "./componentss/middilecontainer/middileside";
import Rightnav from "./componentss/rightcontainer/rightcontainer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./componentss/home";
import ErrorPage from "./componentss/ErrorPage";


import useUser from "./useStore/userstore";

import ChatRoom from "./Chatapplication/Chat/Chat"; 

import SearchComponent from "./Searchuser/searchuser";
import Chatbot from "./Chatbot/Chatbot";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useUserStore } from "./useStore/userstore";
const Vedios = React.lazy(()=> import("./uploaded/vedios"))


function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
 return(
      <BrowserRouter>
        <Suspense 
          fallback={
            <div className="flex items-center justify-center h-screen text-lg font-semibold">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/reels" element={<Vedios />} />
            <Route path="/home" element={<Home />} />
            <Route path="/userprofile" element={<SearchComponent />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/message" element={<ChatRoom />} />
            <Route path="/help" element={<Chatbot />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }

export default App;
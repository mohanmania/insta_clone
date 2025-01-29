import React,{useState} from "react";
import "../App.css";
import Leftnav from "../componentss/leftsidebar"; 
import MiddileSide from "../componentss/middilecontainer/middileside";
import Rightnav from "../componentss/rightcontainer/rightcontainer";

export default function Home() {
 
  return (

   
    
<div className="App">
  <div className="leftSideHome">
  <Leftnav/>
  </div>
  <div className="middileSide">
    <MiddileSide/>
  </div>
  <div className="rightSide">
  < Rightnav />
  </div>


</div>


  );
}

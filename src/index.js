import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css"; 

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { UserProvider } from "./useStore/userstore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
 
);

reportWebVitals();

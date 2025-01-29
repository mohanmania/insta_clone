
import "./leftSide.css";
import React, { useState, createContext, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import ligthed from "../images/ligthed.png";
import { db } from "../firebase/firebase";
import HomeIcon from "@mui/icons-material/HomeTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import PlayArrowIcon from "@mui/icons-material/PlayArrowTwoTone";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AddIcon from "@mui/icons-material/Add";
import { Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Chatbot from "../Chatbot/Chatbot";
import { 
  Button, Dialog, DialogActions, DialogContent, 
  DialogContentText, DialogTitle, IconButton, Slide
} from '@mui/material'; 
export const SearchUserProvider = createContext();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Leftnav({ userId }) {
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showNotificationDetails, setShowNotificationDetails] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(null);
  const [timer, setTimer] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const notifications = [
    {
      username: 'Mohan_Mania_1',
      photo: 'https://images.pexels.com/photos/938639/pexels-photo-938639.jpeg?auto=compress&cs=tinysrgb&w=600',
      message: 'Mohan_Mania_1 started following you',
      details: 'Mohan is a travel enthusiast and loves sharing photos from his adventures.'
    },
    {
      username: 'Anviyth@let-one',
      photo: 'https://images.pexels.com/photos/30092632/pexels-photo-30092632/free-photo-of-young-man-overlooking-scenic-lake-in-india.jpeg?auto=compress&cs=tinysrgb&w=600',
      message: 'Anviyth@let-one started following you',
      details: 'Anviyth is a fitness coach who shares tips and motivation for a healthy lifestyle.'
    },
  ];

 const handleSearch = async () => {
  if (!searchInput.trim()) {
    setErrorMessage("Please enter a valid username.");
    return;
  }

  
    try {
      setErrorMessage("");
      setSearchResult(null);
      const usersRef = collection(db, "usersdetails");
      const q = query(usersRef, where("name", "==", searchInput.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setSearchResult("User not found");
      } else {
        const userData = querySnapshot.docs.map((doc) => doc.data());
        setSearchResult(userData[0]);
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleNotificationClick = (content) => {
    setNotificationContent(content);
    setShowNotificationDetails(true);
  };

  const closeNotificationDetails = () => {
    setShowNotificationDetails(false);
  };

  const handleDailyLimitChange = (limit) => {
    clearTimeout(timer);
    const currentTime = Date.now(); 
    const endTime = currentTime + limit; 
    const remainingTime = endTime - currentTime; 

    setTimer(setTimeout(() => {
      setOpenDialog(true); 
    }, remainingTime));
     
    setDailyLimit(limit);
  };

  const handleLogout = () => {
    setOpenConfirm(true);
  };

  const handleConfirmLogout = () => {
    setOpenConfirm(false);
    alert('Your logout is successful.');
    navigate("/");
  };

  const handleCancelLogout = () => {
    setOpenConfirm(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    
  };

  const handleDialogContinue = () => {
    setOpenDialog(false);
 
  };

  return (
    <div className="leftSidepart">
      <div className="logo">
        <h2>instagram</h2>
      </div>
      <div className="navLinkpart">
      <div className="navlink" onClick={() => navigate("/home")}>
          <HomeIcon sx={{ fontSize: "30px", margin: "0px 10px" }} />
          <div className="navName">Home</div>
        </div>
        <div className="navlink" onClick={() => setShowSearchBar(!showSearchBar)}>
          <SearchTwoToneIcon sx={{ fontSize: "30px", margin: "0px 10px" }} />
          <div className="navName">Search</div>
        </div>
        <div className="navlink" onClick={() => navigate("/reels")}>
          <PlayArrowIcon sx={{ fontSize: "30px", margin: "0px 10px" }} />
          <div className="navName">Feed</div>
        </div>
        <div className="navlink" onClick={() => navigate("/message")}>
          <MessageOutlinedIcon sx={{ fontSize: "30px", margin: "0px 10px" }} />
          <div className="navName">Messages</div>
        </div>
        <div className="navlink" onClick={() => handleNotificationClick('Sample Notification Content')}>
          <FavoriteBorderRoundedIcon sx={{ fontSize: "30px", margin: "0px 10px" }} />
          <div className="navName">Notifications</div>
        </div>
        <div className="navlink" onClick={()=> navigate("/help")}>
          <AddIcon sx={{ fontSize: "30px", margin: "0px 10px" }} />
          <div className="navName">Help</div>
        </div>
        <div className="navlink" onClick={() => navigate("/userprofile")} style={{marginLeft:"15px"}}>
          <Avatar alt="Profile" src="https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg" sx={{ width: 24, height: 24 }} />
          <div className="navName">Profile</div>
        </div>
        <div className="navlink" onClick={() => setShowDrawer(!showDrawer)}>
          <MenuIcon sx={{ fontSize: "30px", margin: "0px 10px" }} />
          <div className="navName">More</div>
        </div>

      </div>

      {showDrawer && (
        <div className={`drawer ${showDrawer ? 'open' : ''}`} style={{cursor:"pointer"}}>
          <div className="drawer-option" onClick={handleLogout}>Logout</div>
          <div className="drawer-option" >Account Details</div>
          <div className="drawer-option" onClick={()=>navigate("/help")}>Help</div>
          <div className="drawer-option">
            <strong>Daily Limit</strong>
            <div className="daily-limit-options">
              <Button onClick={() => handleDailyLimitChange(10000)}>10 seconds</Button>
              <Button onClick={() => handleDailyLimitChange(600000)}>10 minutes</Button>
              <Button onClick={() => handleDailyLimitChange(1800000)}>30 minutes</Button>
            </div>
          </div>
        </div>
      )}

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Daily Limit Reached</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your daily limit has been reached. Do you want to continue or close?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
          <Button onClick={handleDialogContinue}>Continue</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirm} onClose={handleCancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {showNotificationDetails && (
        <div className={`notificationDetails ${showNotificationDetails ? 'open' : ''}`}>
          <h2>Notification Details</h2>
          <p>{notificationContent}</p>
          <div className="notifications">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="notification"
                onClick={() => handleNotificationClick(`${notification.message} - ${notification.details}`)}
              >
                <img
                  src="https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg"
                  alt={notification.username}
                  className="follower-photo"
                />
                <span>{notification.message}</span>
              </div>
            ))}
          </div>
          <button onClick={closeNotificationDetails}>Close</button>
        </div>
      )}
       {/* <div className="navlink" onClick={() => setShowSearchBar(!showSearchBar)}>
        <SearchTwoToneIcon sx={{ fontSize: "30px", margin: "0px 10px" }} />
        <div className="navName">Search</div>
      </div> */}

{showSearchBar && (
        <div className="searchBarOverlay">
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search username"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <div className="searchResults">
              {errorMessage && <p className="errorMessage">{errorMessage}</p>}
              {searchResult && typeof searchResult === "string" ? (
                <p>{searchResult}</p>
              ) : searchResult ? (
                <div className="userResult">
                  <img
                    src={searchResult.photoURL}
                    alt={searchResult.username}
                    className="userPhoto"
                  />
                  {console.log(searchResult.id)}
                  <p onClick={() => navigate("/userprofile")}>{searchResult.name}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leftnav;








import React, { useState } from "react";
import { Snackbar, Button } from "@mui/material";
import "./rightcontainer.css";
import { useNavigate } from "react-router-dom";
import { 
   Dialog, DialogActions, DialogContent, 
  DialogContentText, DialogTitle, IconButton, Slide
} from '@mui/material'; 

export default function Rightnav() {
  const navigate = useNavigate()
  const [hoveredProfile, setHoveredProfile] = useState(null);
  const [followedProfiles, setFollowedProfiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
    const [openConfirm, setOpenConfirm] = useState(false);
  

  const handleMouseEnter = (profile) => {
    setHoveredProfile(profile);
  };
  const handleLogout = () => {
    setOpenConfirm(true);
  };
  const handleCancelLogout = () => {
    setOpenConfirm(false);
  };

  const handleConfirmLogout = () => {
    setOpenConfirm(false);
    alert('Your logout is successful.');
    navigate("/");
  };

  const handleMouseLeave = () => {
    setHoveredProfile(null);
  };

  const handleFollow = (username) => {
    if (!followedProfiles.includes(username)) {
      setFollowedProfiles([...followedProfiles, username]);
      setMessage(`${username} followed successfully!`);
      setOpen(true);
    } else {
      setFollowedProfiles(followedProfiles.filter((profile) => profile !== username));
      setMessage(`${username} unfollowed!`);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="right-container">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
      <div className="profile-section">
        <div className="profile-info">
          <img
            src="https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg"
            alt="Profile"
          />
          <div className="profile-details">
            <span className="username">mohan_mania51</span>
            <span className="status">m0han mania 51 :(((</span>
          </div>
        </div>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Switch
        </Button>
      </div>
      <div className="suggestions-section">
        <div className="suggestions-header">
          <span>Suggested for you</span>
          <a href="/see-all">See All</a>
        </div>
        <ul className="suggestions-list">
          {[{
  imgSrc:
    "https://media.istockphoto.com/id/1325880673/photo/young-indian-man-using-laptop.jpg?s=2048x2048&w=is&k=20&c=eSMZRe-odUEBOhYBptkN5yFKgW2_yhqUkR-FaIaoT2g=",
  username: "nandunandu06",
  mutualFollow: "Followed by saiharika__2225",
},
{
  imgSrc:
    "https://cdn.pixabay.com/photo/2016/01/24/12/53/boys-1158803_960_720.jpg",
  username: "kancharla_sara_",
  mutualFollow: "Followed by _sirisha_dasari + 5 more",
},
{
  imgSrc:
    "https://images.pexels.com/photos/938639/pexels-photo-938639.jpeg?auto=compress&cs=tinysrgb&w=600",
  username: "frnds_call_bakka",
  mutualFollow: "Following sumapriya_perla_2129_",
},
{
  imgSrc:
    "https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg",
  username: "hema_angel_575",
  mutualFollow: "Followed by saiharika__2225",
},
{
  imgSrc:
    "https://cdn.pixabay.com/photo/2016/01/03/09/50/boy-1119239_960_720.jpg",
  username: "anu_varma_7702",
  mutualFollow: "Followed by saiharika__2225",
},].map((profile, index) => (
            <li
              className={`suggestion-item ${hoveredProfile === profile.username ? "hovered" : ""}`}
              key={index}
              onMouseEnter={() => handleMouseEnter(profile.username)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={profile.imgSrc} alt={profile.username} />
              <div className="suggestion-details">
                <span className="username">{profile.username}</span>
                <span className="mutual-follow">{profile.mutualFollow}</span>
              </div>
              <button
                className={followedProfiles.includes(profile.username) ? "following" : "follow"}
                onClick={() => handleFollow(profile.username)}
              >
                {followedProfiles.includes(profile.username) ? "Following" : "Follow"}
              </button>
              {hoveredProfile === profile.username && (
                <div className="hover-profile-info">
                  <span>{profile.username}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-section">
        <a href="/about">About</a> · <a href="/help">Help</a> · <a href="/press">Press</a> ·
        <a href="/api">API</a> · <a href="/jobs">Jobs</a> · <a href="/privacy">Privacy</a> ·
        <a href="/terms">Terms</a> · <a href="/locations">Locations</a> ·
        <a href="/language">Language</a> · <a href="/meta-verified">Meta Verified</a>
      </div>
      <div className="copyright">© 2025 INSTAGRAM FROM Mygram</div>
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
    </div>

  );
}

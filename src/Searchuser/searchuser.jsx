

import React, { useState,useEffect } from 'react';
import './searcheuser.css';
import FaceIcon from '@mui/icons-material/Face';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CakeIcon from '@mui/icons-material/Cake';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Leftnav from '../componentss/leftsidebar';
import { Menu } from 'lucide-react'; 
import { message } from 'antd';



const followers = [
  { username: 'mohanmania51 ', photo: 'https://images.pexels.com/photos/938639/pexels-photo-938639.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { username: 'Anviyth@le-0 t- ', photo: 'https://images.pexels.com/photos/30092632/pexels-photo-30092632/free-photo-of-young-man-overlooking-scenic-lake-in-india.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { username: ' H eartles_s k@N ', photo: 'https://images.pexels.com/photos/301952/pexels-photo-301952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { username: 'Mahesh Babu-N ', photo: 'https://images.pexels.com/photos/674268/pexels-photo-674268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { username: 'imthee_mt_04.N ', photo: 'https://images.pexels.com/photos/354951/pexels-photo-354951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { username: 'pullaraomul099 ', photo: 'https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg' },
  { username: 'M..triveni_/N624 ', photo: 'https://1.bp.blogspot.com/-uT-iKtRIHGA/Tgnqs8ZLMgI/AAAAAAAALKI/EfOhxGBwD4Y/s1600/Sam.JPG' },
  { username: 'shiva__3575Ns$   ', photo: 'https://images.pexels.com/photos/674268/pexels-photo-674268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { username: 'D..దుర్గ దుర్గ89  ', photo: 'https://thumbs.dreamstime.com/z/portrait-indian-people-street-puducherry-india-december-circa-years-woman-smiling-face-village-front-view-vibrant-174351620.jpg' },
  { username: 'sumathi8698_N  ', photo: 'https://thumbs.dreamstime.com/b/indian-villager-pics-jamshedpur-jharkhand-poor-people-femeli-photos-beach-rivers-indian-villager-pics-jamshedpur-poor-pepple-176242972.jpg' },
  { username: 'N-9sod-dal.la1_ ', photo: 'https://thumbs.dreamstime.com/b/portrait-old-unidentified-indian-man-his-village-tikamgarh-madhya-pradesh-india-february-173191045.jpg' },
  { username: 'chukkaankb..Ba ', photo: 'https://cdn.pixabay.com/photo/2016/01/03/09/50/boy-1119239_960_720.jpg' },
  { username: 'kar_@Nthikj6-61  ', photo: 'https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg' },
  { username: 'social_armyed9  ', photo: 'https://cms.qz.com/wp-content/uploads/2016/03/7.jpg?quality=75&strip=all&w=940' },
  { username: 'dad_litle-priyas  ', photo: 'https://media.istockphoto.com/id/1313390800/photo/multiple-exposure-of-young-man-and-nature.jpg?s=2048x2048&w=is&k=20&c=BjQsumF29u57nnQhub5RV0H_c-Ai8nOBY83IR9sVlac=' },
  { username: 'ParshuBaby_23  ', photo: 'https://cdn.pixabay.com/photo/2016/03/27/19/20/indian-1283789_1280.jpg' },
  { username: 'MBashaMalik_3 ', photo: 'https://media.istockphoto.com/id/1325880673/photo/young-indian-man-using-laptop.jpg?s=2048x2048&w=is&k=20&c=eSMZRe-odUEBOhYBptkN5yFKgW2_yhqUkR-FaIaoT2g=' },
  { username: 'K_Rakeshdd _1_  ', photo: 'https://cdn.pixabay.com/photo/2016/01/24/12/53/boys-1158803_960_720.jpg' },
];




const InstagramProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [notification, setNotification] = useState('');
  const [showFollowers, setShowFollowers] = useState(false);
  const [followingStatus, setFollowingStatus] = useState({});
   const [isLeftNavOpen, setIsLeftNavOpen] = useState(false);
       const [position, setPosition] = useState({ x: 20, y: 20 });
       const [isDragging, setIsDragging] = useState(false);
       const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
       const [isActive, setIsActive] = useState(false);
     
       useEffect(() => {
       
         if (isDragging) {
           document.addEventListener('mousemove', handleMouseMove);
           document.addEventListener('mouseup', handleMouseUp);
           document.addEventListener('touchmove', handleTouchMove);
           document.addEventListener('touchend', handleMouseUp);
         }
     
         return () => {
           document.removeEventListener('mousemove', handleMouseMove);
           document.removeEventListener('mouseup', handleMouseUp);
           document.removeEventListener('touchmove', handleTouchMove);
           document.removeEventListener('touchend', handleMouseUp);
         };
       }, [isDragging]);
     
      
       const handleMouseDown = (e) => {
         e.preventDefault();
         setIsDragging(true);
         setDragOffset({
           x: e.clientX - position.x,
           y: e.clientY - position.y
         });
       };
     
  
       const handleMouseMove = (e) => {
         if (isDragging) {
           e.preventDefault();
           const newX = e.clientX - dragOffset.x;
           const newY = e.clientY - dragOffset.y;
           
          
           const maxX = window.innerWidth - 50;
           const maxY = window.innerHeight - 50;
           
           setPosition({
             x: Math.min(Math.max(0, newX), maxX),
             y: Math.min(Math.max(0, newY), maxY)
           });
         }
       };
     
    
       const handleMouseUp = () => {
         setIsDragging(false);
       };
     
 
       const handleTouchStart = (e) => {
         const touch = e.touches[0];
         handleMouseDown({ 
           preventDefault: () => e.preventDefault(),
           clientX: touch.clientX, 
           clientY: touch.clientY 
         });
       };
     
       const handleTouchMove = (e) => {
         const touch = e.touches[0];
         handleMouseMove({ 
           preventDefault: () => e.preventDefault(),
           clientX: touch.clientX, 
           clientY: touch.clientY 
         });
       };
     
       const handleToggleClick = (e) => {
         if (!isDragging) {
           setIsLeftNavOpen(!isLeftNavOpen);
           setIsActive(!isActive);
         }
       };
     
   

       const handleFollow = () => {
        if (isFollowing) {
          setIsFollowing(false);
          message.loading("You unfollowed ");
        } else {
          setIsFollowing(true);
          message.success("You started following ");
        }
      };

  const handleShowFollowers = () => {
    setShowFollowers(true);
    document.body.style.backgroundColor = '#000000aa';
  };

  const handleCloseFollowers = () => {
    setShowFollowers(false);
    document.body.style.backgroundColor = '';
  };

  const handleFollowFollower = (username) => {
    setFollowingStatus((prevState) => ({
      ...prevState,
      [username]: true,
    }));
    setNotification(`You started following ${username}`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div style={{ display: "flex" }}>
       <div
           className={`toggle-button ${isActive ? 'active' : ''}`}
           style={{
             position: 'fixed',
             left: `${position.x}px`,
             top: `${position.y}px`,
             zIndex: 1000,
             cursor: isDragging ? 'grabbing' : 'grab',
             display: 'none',
           }}
           onMouseDown={handleMouseDown}
           onTouchStart={handleTouchStart}
           onClick={handleToggleClick}
         >
           <Menu size={24} color={isActive ? "white" : "currentColor"} />
         </div>
         <div className={`leftSideHome ${isLeftNavOpen ? 'open' : ''}`}>
        <Leftnav />
      </div>
  
      <div className="profile-container">
      <div className="profile-header" style={{ cursor: "pointer" }}>
        <div className="profile-pic">
          <img
            src="https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg"
            alt="Profile"
          />
        </div>
        <h2 className="profile-name">Krishna</h2>
        <button
          onClick={handleFollow}
          className={`follow-btn ${isFollowing ? "following" : ""}`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>

          <div className="profile-stats">
            <div>Posts: 3</div>
            <div><button onClick={handleShowFollowers} className="followers-button">Followers: 90</button></div>
            <div>Following: 13</div>
          </div>
        </div>

        <div className="profile-bio">
          <p>Anvi's world 💕</p>
          <p>Video creator</p>
          <p>Mom's princess 💖</p>
          <p>Love to dance💃 and act💞</p>
          <p>If you can dream about it, you can do it</p>
        </div>

        <div className="story-highlights">
          <h4>Story Highlights:</h4>
          <ul>
            <li><FaceIcon /> me😊❤️</li>
            <li><FavoriteIcon /> ❤️❤️❤️</li>
            <li><CakeIcon /> it's my birthday</li>
            <li><EmojiEventsIcon /> 👑✨</li>
            <li><FaceIcon /> reels 😊🥰</li>
          </ul>
        </div>

        <div className="posts-section">
          <h4>Posts:</h4>
          <div className="posts">
            <img src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg" alt="Post 1" />
            <img src="http://www.pixelstalk.net/wp-content/uploads/2016/07/Cute-Baby-Animal-Pictures-HD.jpg" alt="Post 2" />
          </div>
        </div>

        {notification && <div className="notification">{notification}</div>}

        {showFollowers && (
          <div className="followers-list-overlay">
            <div className="followers-list-container">
              <div className="followers-list-header">
                <h3>Followers</h3>
                <button onClick={handleCloseFollowers}>Close</button>
              </div>
              <ul className="followers-list">
                {followers.map((follower) => (
                  <li key={follower.username}>
                    <img src={follower.photo} alt={follower.username} className="follower-photo" />
                    {follower.username}
                    <button
                      onClick={() => handleFollowFollower(follower.username)}
                      disabled={followingStatus[follower.username]}
                      className={`follow-follower-btn ${followingStatus[follower.username] ? 'following' : ''}`}
                    >
                      {followingStatus[follower.username] ? 'Following' : 'Follow'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramProfile;

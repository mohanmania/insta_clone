

import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase/firebase";
import Leftnav from "../../componentss/leftsidebar";
import { Menu } from "lucide-react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { Snackbar, Alert } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import "./Chat.css";
import { useUserStore } from "../../useStore/userstore";

// import { useStore } from "zustand";

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [file, setFile] = useState(null);
  const [expiryTime, setExpiryTime] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);const [isLeftNavOpen, setIsLeftNavOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const { currentUser } = useUserStore();

  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };


  const handleMouseMove = (e) => {
    if (isDragging) {
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
    handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
  };

 
    
  const navigate = useNavigate();

  useEffect(() => {
    const loadRooms = async () => {
      const roomsSnapshot = await getDocs(collection(db, "rooms"));
      setRooms(roomsSnapshot.docs.map((doc) => doc.id));
    };
    loadRooms();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (message !== "" && roomName !== "" && username !== "") {
      try {
        let fileURL = null;
        if (file) {
          const storageRef = ref(storage, `files/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          fileURL = await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              null,
              (error) => reject(error),
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(resolve);
              }
            );
          });
        }

        await addDoc(collection(db, roomName), {
          username: username,
          profilePhoto: auth.currentUser.photoURL,
          roomName: roomName,
          message: message,
          fileURL: fileURL,
          timestamp: new Date(),
        });
        setMessage("");
        setFile(null);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      setNotification({
        open: true,
        message: "Please enter a valid message, room name, and username.",
        severity: "warning",
      });
    }
  };

  const handleCreateRoom = async () => {
    const roomRef = doc(db, "rooms", roomName);
    const roomDoc = await getDoc(roomRef);

    if (roomDoc.exists()) {
      setNotification({
        open: true,
        message: "Room already exists. Please choose a different room name.",
        severity: "warning",
      });
    } else {
      if (roomName !== "" && username !== "" && password !== "") {
        try {
          await setDoc(roomRef, {
            roomName: roomName,
            creator: username,
            password: password,
          });
          const loadRooms = async () => {
            const roomsSnapshot = await getDocs(collection(db, "rooms"));
            setRooms(roomsSnapshot.docs.map((doc) => doc.id));
          };
          loadRooms();
          setIsCreatingRoom(false);
          setIsValidated(true);
        } catch (error) {
          console.error("Error creating room: ", error);
        }
      } else {
        setNotification({
          open: true,
          message: "Please enter a valid room name, username, and password.",
          severity: "warning",
        });
      }
    }
  };

  const handleJoinRoom = async () => {
    const roomRef = doc(db, "rooms", roomName);
    const roomDoc = await getDoc(roomRef);
    if(password.length>0 && username.length>0){
      setNotification({
        open: true,
        message: "c",
        severity: "warning",
      });
    }
    if (roomDoc.exists()) {
      const roomData = roomDoc.data();
      if (roomData.password === password && roomData.creator === username) {
        setIsValidated(true);
        const q = query(collection(db, roomName), orderBy("timestamp"));
        onSnapshot(q, (querySnapshot) => {
          setMessages(
            querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });
        setIsJoiningRoom(false);
      } else {
        setNotification({
          open: true,
          message: "Incorrect username or password.",
          severity: "warning",
        });
      }
    
    } else {
      setNotification({
        open: true,
        message: "Room does not exist. Please create the room first.",
        severity: "warning",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const addEmoji = (e, emojiObject) => {
    setMessage(message + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="main-container">

        <div
        className="toggle-button"
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 1000,
          cursor: 'move',
          display: 'none', 
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onClick={() => setIsLeftNavOpen(!isLeftNavOpen)}
      >
        <Menu size={24} />
      </div>

     
      <div className={`leftSideHome ${isLeftNavOpen ? 'open' : ''}`}>
        <Leftnav />
      </div>
    <div className="chatroom-container">
     
      <div className="sidebar">
        <h3>Rooms</h3>
        <ul>
          {rooms.map((room, index) => (
            <li key={index} onClick={() => setRoomName(room)}>
              {room}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-content">
      <h2  style={{color:"red" ,justifyContent:"center",alignItems:"center"}}>{currentUser?.name|| "Guest-Login"}'s..Room</h2>
        <div className="create-room">
          <input
            type="text"
            placeholder="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button
            onClick={() => {
              setIsCreatingRoom(true);
              setIsJoiningRoom(false);
            }}
            disabled={!roomName}
          >
            Create Room
          </button>
          <button
            onClick={() => {
              setIsCreatingRoom(false);
              setIsJoiningRoom(true);
            }}
            disabled={!roomName}
          >
            Join Room
          </button>
        </div>

        {isCreatingRoom && !isValidated && (
          <div className="username-prompt">
            <input
              type="text"
              placeholder="Ex: Mybatch"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleCreateRoom}
              disabled={!username || !password}
            >
              Create Room
            </button>
          </div>
        )}

        {isJoiningRoom && !isValidated && (
          <div className="password-prompt">
            <input
              type="text"
              placeholder="Room Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder=" room password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleJoinRoom} disabled={!username || !password}>
              Join Room
            </button>
          </div>
        )}

        {roomName && isValidated && (
          <div className="chat-box">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className="message">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                    alt="Profile"
                    width="30"
                    height="30"
                  />
                  <strong>
                    {msg.username}:{" "}
                  </strong>
                  {msg.message}
                </div>
              ))}
            </div>

            <form onSubmit={handleSend}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                //  style={{width:"90vw"}}
                disabled={!roomName || !username}
              />
            
              <button
                type="submit"
                disabled={!message || !roomName || !username}
              >
                Send
              </button>
            </form>

            <div className="message-expiry">
              <label style={{color:"black"}}>Message Expiry Time:</label>
              <select onChange={(e) => setExpiryTime(Number(e.target.value))}>
                <option value="">Select</option>
                <option value={5}>5 seconds</option>
                <option value={3600}>1 hour</option>
                <option value={86400}>24 hours</option>
              </select>
            </div>

            {showEmojiPicker && <EmojiPicker onEmojiClick={addEmoji} />}
          </div>
        )}

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
    </div>
  );
};

export default ChatRoom;

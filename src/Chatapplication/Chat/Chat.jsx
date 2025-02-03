// import React, { useEffect, useRef, useState } from "react";
// import "./Chat.css";
// import EmojiPicker from "emoji-picker-react";
// import { onSnapshot, doc } from "firebase/firestore";
// import { db } from "../../firebase/firebase";
// import { UseChatStore } from "../../useStore/useChatStore";

// export default function Chat() {
//   const [chat, setChat] = useState();
//   const [open, setOpen] = useState(false);
//   const [text, setText] = useState("");
//   // const { chatId } = UseChatStore(); // Obtain chatId from UseChatStore
//   const endRef = useRef(null);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   // useEffect(() => {
//   //   const unSub = onSnapshot(
//   //     doc(db, "chats", id),
//   //     (res) => {
//   //       setChat(res.data());
//   //     }
//   //   );

//   //   return () => {
//   //     unSub();
//   //   };
//   // }, [id]);

//   const HandleEmoji = (e) => {
//     setText((prev) => prev + e.emoji);
//   };

//   return (
//     <div className="Chat">
//       <div className="top">
//         <div className="user">
//           <img src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png" alt="User Avatar" />
//           <div className="texts">
//             <span>mohan krishna</span>
//             <p>lorem ispon loder</p>
//           </div>
//         </div>
//         <div className="icons">
//           <img src="https://static.vecteezy.com/system/resources/previews/000/442/172/original/vector-video-camera-icon.jpg" alt="Video Icon" />
//           <img src="https://tse2.mm.bing.net/th?id=OIP.d1sTN41laBxAg-Uy_pXvmgHaHx&pid=Api&P=0&h=180" alt="Voice Icon" />
//           <img src="https://cdn3.iconfinder.com/data/icons/roundies-icons/32/more-512.png" alt="More Icon" />
//         </div>
//       </div>
//       <div className="center">
//         {chat?.messages.map((message, index) => (
//           <div className={`message ${message.own ? "own" : ""}`} key={index}>
//             <img src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png" alt="User Avatar" />
//             <div className="texts">
//               {/* <p>{message.text}</p> */}
//               <p>kjhgfdsa</p>
//               {/* <span>{message.timestamp}</span> */}
//               <span>imin ago</span>
//             </div>
//           </div>
//         ))}
//         <div ref={endRef}></div>
//       </div>
//       <div className="bottom">
//         <div className="icons">
//           <img src="https://static.vecteezy.com/system/resources/previews/000/349/672/original/camera-vector-icon.jpg" alt="Camera Icon" />
//           <img src="https://tse2.mm.bing.net/th?id=OIP.mtK8ri_QmETloVRiJCqkhAHaHa&pid=Api&P=0&h=180" alt="Attach Icon" />
//           <img src="https://static.vecteezy.com/system/resources/previews/000/420/512/original/microphone-icon-vector-illustration.jpg" alt="Microphone Icon" />
//         </div>
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <div className="emoji">
//           <img
//             src="https://w7.pngwing.com/pngs/174/558/png-transparent-black-sad-emoji-illustration-face-sadness-smiley-computer-icons-sad-child-people-emoticon.png"
//             alt="Emoji Picker"
//             onClick={() => setOpen((prev) => !prev)}
//           />
//           <div className="picker">
//             {open && <EmojiPicker onEmojiClick={HandleEmoji} />}
//           </div>
//         </div>
//         <button className="sendButton">Send</button>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";
// import "./Chat.css";
// import EmojiPicker from "emoji-picker-react";
// import { onSnapshot, doc } from "firebase/firestore";
// import { db } from "../../firebase/firebase";
// import { UseChatStore } from "../../useStore/useChatStore";
// import { sendMessage, subscribeToMessages } from "../../firebase/firebaseutilz";
// import { useUserStore } from "../../useStore/userstore";

// export default function Chat() {
//   const [chat, setChat] = useState({ messages: [] });
//   const [text, setText] = useState("");
//   const [open, setOpen] = useState(false);
//   const endRef = useRef(null);
//   const { currentUser } = useUserStore();
//   const { chatId } = UseChatStore();
//   // console.log("chatId",chatId)

//   // Scroll to the latest message
//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   useEffect(() => {
//     if (!chatId) return;

//     const unsubscribe = onSnapshot(doc(db, "chats", chatId), (res) => {
//       setChat(res.data());
//     });

//     return () => unsubscribe();
//   }, [chatId]);

//   const handleSend = () => {
//     if (text.trim() && currentUser && chatId) {
//       sendMessage(text, currentUser.id, chatId);
//       setText("");
//     }
//   };

//   const handleEmoji = (e) => {
//     setText((prev) => prev + e.emoji);
//   };

//   return (
//     <div className="Chat">
//       <div className="top">
//         <div className="user">
//           <img
//             src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png"
//             alt="User Avatar"
//           />
//           <div className="texts">
//             <span>mohan krishna</span>
//             <p>lorem ispon loder</p>
//           </div>
//         </div>
//         <div className="icons">
//           <img
//             src="https://static.vecteezy.com/system/resources/previews/000/442/172/original/vector-video-camera-icon.jpg"
//             alt="Video Icon"
//           />
//           <img
//             src="https://tse2.mm.bing.net/th?id=OIP.d1sTN41laBxAg-Uy_pXvmgHaHx&pid=Api&P=0&h=180"
//             alt="Voice Icon"
//           />
//           <img
//             src="https://cdn3.iconfinder.com/data/icons/roundies-icons/32/more-512.png"
//             alt="More Icon"
//           />
//         </div>
//       </div>
//       <div className="center">
//         <div className="message own">
//           <div className="texts">
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quam sunt non quisquam cupiditate tempora animi. Ad illo quidem repellat ut amet eligendi modi nihil accusantium reprehenderit, libero consequuntur possimus.
//             </p>
//             </div>
//           </div>
//           <div className="message ">
//           <div className="texts">
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quam sunt non quisquam cupiditate tempora animi. Ad illo quidem repellat ut amet eligendi modi nihil accusantium reprehenderit, libero consequuntur possimus.
//             </p>
//             </div>
//           </div>
//           <div className="message own">
//           <div className="texts">
//             <p>
//               rokkkkkkkkkkkkkhhhhhhhhhhhhhhytrds lkhr srtytf   yugtyds uhuy gfjuy sgdjg fhxhrrfsimus.
//             </p>
//             </div>
//           </div>
//           <div className="message own">
//           <div className="texts">
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quam sunt non quisquam cupiditate tempora animi. Ad illo quidem repellat ut amet eligendi modi nihil accusantium reprehenderit, libero consequuntur possimus.
//             </p>
//             </div>
//           </div>
//           <div className="message ">
//           <div className="texts">
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quam sunt non quisquam cupiditate tempora animi. Ad illo quidem repellat ut amet eligendi modi nihil accusantium reprehenderit, libero consequuntur possimus.
//             </p>
//             </div>
//           </div>

//         </div>

//        <div ref={endRef}></div>

//       <div className="bottom">
//         <div className="icons">
//           <img
//             src="https://static.vecteezy.com/system/resources/previews/000/349/672/original/camera-vector-icon.jpg"
//             alt="Camera Icon"
//           />
//           <img
//             src="https://tse2.mm.bing.net/th?id=OIP.mtK8ri_QmETloVRiJCqkhAHaHa&pid=Api&P=0&h=180"
//             alt="Attach Icon"
//           />
//           <img
//             src="https://static.vecteezy.com/system/resources/previews/000/420/512/original/microphone-icon-vector-illustration.jpg"
//             alt="Microphone Icon"
//           />
//         </div>
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <div className="emoji">
//           <img
//             src="https://w7.pngwing.com/pngs/174/558/png-transparent-black-sad-emoji-illustration-face-sadness-smiley-computer-icons-sad-child-people-emoticon.png"
//             alt="Emoji Picker"
//             onClick={() => setOpen((prev) => !prev)}
//           />
//           <div className="picker">
//             {open && <EmojiPicker onEmojiClick={handleEmoji} />}
//           </div>
//         </div>
//         <button className="sendButton" onClick={handleSend}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { db, auth, storage } from "../../firebase/firebase";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   where,
//   serverTimestamp,
// } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import EmojiPicker from "emoji-picker-react";
// import "../styles/Chat.css";

// export const Chat = ({ room }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [file, setFile] = useState(null);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   const messagesRef = collection(db, "messages");

//   useEffect(() => {
//     const queryMessages = query(
//       messagesRef,
//       where("room", "==", room),
//       orderBy("createdAt", "asc")
//     );

//     const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
//       let fetchedMessages = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));

//       console.log("Fetched Messages from Firestore:", fetchedMessages);

//       setMessages(fetchedMessages);
//     });

//     return () => unsubscribe();
//   }, [room]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!newMessage.trim() && !file) return;

//     let fileURL = null;

//     if (file) {
//       const fileRef = ref(storage, `chat_files/${file.name}`);
//       await uploadBytes(fileRef, file);
//       fileURL = await getDownloadURL(fileRef);
//       console.log("File Uploaded:", fileURL);
//     }

//     const message = {
//       text: newMessage || "",
//       file: fileURL || null,
//       createdAt: new Date(),
//       user: auth.currentUser?.displayName || "Unknown",
//       userProfilePhoto: auth.currentUser?.photoURL || "",
//       room,
//     };

//     setMessages((prevMessages) => [...prevMessages, message]);

//     await addDoc(messagesRef, {
//       ...message,
//       createdAt: serverTimestamp(),
//     });

//     setNewMessage("");
//     setFile(null);
//   };

//   return (
//     <div className="chat-app">
//       <div className="header">
//         <h1>Welcome to: {room.toUpperCase()}</h1>
//       </div>

//       <div className="messages">
//         {messages.length > 0 ? (
//           messages.map((message) => {
//             console.log("Rendering Message:", message);
//             console.log("Message Text:", message.text);

//             const isCurrentUser = message.user === auth.currentUser?.displayName;
//             const messageClass = isCurrentUser ? "current-user" : "other-user";

//             const timestamp =
//               message.createdAt?.seconds
//                 ? new Date(message.createdAt.seconds * 1000).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })
//                 : "Just now";

//             return (
//               <div key={message.id} className={`message ${messageClass}`}>
//                 <span className="user">{message.user}:</span>
//                 <img
//                   src={message.userProfilePhoto || "default-avatar.png"}
//                   alt="User profile"
//                   className="user-profile-photo"
//                 />
//                 <span className="text">{message.text || "[No Message]"}</span>

//                 {message.file && (
//                   <div className="file-container">
//                     {message.file.match(/\.(jpeg|jpg|png|gif)$/) ? (
//                       <img src={message.file} alt="Sent file" className="chat-image" />
//                     ) : (
//                       <a href={message.file} target="_blank" rel="noopener noreferrer" className="file-link">
//                         📎 Download File
//                       </a>
//                     )}
//                   </div>
//                 )}

//                 <span className="timestamp">{timestamp}</span>
//               </div>
//             );
//           })
//         ) : (
//           <p>No messages yet...</p>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="new-message-form">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(event) => setNewMessage(event.target.value)}
//           className="new-message-input"
//           placeholder="Type your message here..."
//         />

//         <button type="button" className="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
//           😀
//         </button>
//         {showEmojiPicker && <EmojiPicker onEmojiClick={(emojiObject) => setNewMessage((prev) => prev + emojiObject.emoji)} />}

//         <label htmlFor="file" className="file-label">📎</label>
//         <input type="file" style={{ display: "none" }} id="file" onChange={(e) => setFile(e.target.files[0])} />

//         <button type="submit" className="send-button">Send</button>
//       </form>
//     </div>
//   );
// };



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

  // Handle dragging
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

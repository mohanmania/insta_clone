import React, { useState } from "react";
import "./adduser.css";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, setDoc, serverTimestamp, doc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { message } from "antd";
import { useUserStore } from "../useStore/userstore";
const { currentUser } = useUserStore(); 

const AddUser = () => {
    const { currentUser } = useUserStore(); 
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        if (!username.trim()) {
            setError("Please enter a username");
            return;
        }

        try {
            setError(null);
            const userRef = collection(db, "usersdetails");
            const q = query(userRef, where("name", "==", username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                setUser(userData);
            } else {
                setUser(null);
                setError("User not found");
            }
        } catch (err) {
            setError("An error occurred while searching");
        }
    };

    const handleAdd = async () => {
        
        if (!user || !currentUser) {
            setError("Invalid user data or current user");
            return;
        }

     
        console.log("User ID:", user.id);
        console.log("Current User ID:", currentUser.id);

        
        if (!user.id || !currentUser.id) {
            setError("User ID or current user ID is missing");
            return;
        }

        const ChatRef = collection(db, "chats");
        const userChatRef = collection(db, "userchats");

        try {
          
            const newChatRef = doc(ChatRef); 
            console.log("New Chat Reference:", newChatRef); 

            
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

     
            console.log("Updating user chat reference for user:", user.id);
            console.log("Updating user chat reference for currentUser:", currentUser.id);

         
            await updateDoc(doc(userChatRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                }),
            });

           
            await updateDoc(doc(userChatRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                }),
            });

            console.log("New Chat Created with ID:", newChatRef.id);
        } catch (error) {
            setError("Error creating chat or updating user chats");
            console.error(error);
        }
    };

    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username" />
                <button type="submit">Search</button>
            </form>

            {error && <div className="error">{error}</div>}

            {user && (
                <div className="user">
                    <div className="detail">
                        <img src={user.photoURL} alt="User" />
                        <span>{user.name}</span>
                    </div>
                    <button onClick={handleAdd}>Add User</button>
                </div>
            )}
        </div>
    );
};

export default AddUser;

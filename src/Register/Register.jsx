
import React, { useState } from "react";
import {useUserStore} from "../useStore/userstore"
import "./Register.css";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({ file: null, url: "" });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        dob: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfile({ file, url });
        }
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const age = calculateAge(formData.dob);
    
            if (age < 18) {
                message.warning({ content: "You're under 18, so you may have limited experience!", duration: 3 });
            }
           
        try {
            message.loading({ content: "Creating account...", duration: 2 });

            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            const userData = {
                id: user.uid,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                dob: formData.dob,
                age,
                photoURL: profile.url || null,
            };

       
            await setDoc(doc(db, "usersdetails", user.uid), userData);
            await setDoc(doc(db, "userchats", user.uid), { chats: [] });


            message.success({ content: "Account created successfully!", duration: 2 });
            navigate("/login");  
        } catch (error) {
            console.error("Error during registration: ", error);
            message.error({ content: error.message || "Error occurred. Try again!" });
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="file" className="profile-label">
                    <img
                        src={profile.url || "https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png"}
                        alt="Profile Preview"
                        className="profile-image"
                    />
                </label>
                <input type="file" id="file" style={{ display: "none" }} onChange={handleProfile} />
                <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required />
                <input type="date" name="dob" placeholder="Enter your Date of Birth" value={formData.dob} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                <Button type="primary" htmlType="submit">Submit</Button>
                {/* <Button type="danger" oncClick = {()=> navigate("/home")}>guest</Button> */}
                <p>Already have an account? <span style={{ textDecoration: "underline", color: "royalblue", cursor: "pointer" }} onClick={() => navigate("/")}>Login</span></p>
            </form>
        </div>
    );
}

export default Register;

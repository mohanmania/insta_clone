import React, { useState } from "react";
import "./Login.css"; 
import { Button, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const key = "updatable";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "  ",
        password: "",
    });
    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;
            // console.log("Logged in user:", user);

            message.success("Login successful..!");
            navigate("/home"); 
        } catch (error) {
            console.error("Login error:", error);
            message.error({ content: error.message || "Error occurred. Try again!", key });
        } finally {
            setLoading(false); 
        }
    };

    return (
      
            <div className="login-container">
                <div className="login-wrapper">
                    <div className="login-preview">
                        <img  src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/284478fe-fa3a-4338-a4ba-fdd431bbbeb6/3347703677/insta-downloader-video-phot-screenshot.png" alt="Instagram Preview"  style={{height:"500px"}}/>
                    </div>
                    <div className="login-form-container">
                        <form className="login-form" onSubmit={handleLogin}>
                            <h2>Login</h2>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <Button type="primary" htmlType="submit" disabled={loading}>
                                {loading ? <Spin size="small" /> : "Login"}
                            </Button>
                            <p>
                                New user?{" "}
                                <span onClick={() => navigate("/signup")}>
                                    Signup
                                </span>
                                <p onClick={()=> navigate("/home")} style={{color:"black" ,textDecoration:"underline",cursor:"pointer", font:"bold"}}>Guest LOgin</p>
                            </p>
                            

                        </form>
                       
                    </div>
                
                </div>
            </div>
        );
    
}

export default Login;









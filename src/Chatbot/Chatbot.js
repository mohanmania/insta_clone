import React, { useState,useEffect} from 'react';
import "./Chatbot.css";
import Leftnav from '../componentss/leftsidebar';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [showFAQs, setShowFAQs] = useState(false);
   const [isLeftNavOpen, setIsLeftNavOpen] = useState(false);
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate()
  
    useEffect(() => {
      // Add global mouse/touch event listeners
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
  
    // Handle drag start
    const handleMouseDown = (e) => {
      e.preventDefault();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    };
  
    // Handle dragging
    const handleMouseMove = (e) => {
      if (isDragging) {
        e.preventDefault();
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        // Keep toggle button within viewport bounds
        const maxX = window.innerWidth - 50;
        const maxY = window.innerHeight - 50;
        
        setPosition({
          x: Math.min(Math.max(0, newX), maxX),
          y: Math.min(Math.max(0, newY), maxY)
        });
      }
    };
  
    // Handle drag end
    const handleMouseUp = () => {
      setIsDragging(false);
    };
  
    // Touch event handlers
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
  
    // Handle toggle click
    const handleToggleClick = (e) => {
      if (!isDragging) {
        setIsLeftNavOpen(!isLeftNavOpen);
        setIsActive(!isActive);
      }
    };
  

  
  const faqs = [
    { 
        question: 'How can I reset my password?', 
        answer: 'To reset your password, go to settings and click on "Reset Password".' 
    },
    { 
        question: 'How do I get Room Chat?', 
        answer: 'To access Room Chat, go to the "Messages" section and select "Rooms". If you already have an existing room, you can select it from the room list. If you are a new user, click on "Create Room", enter your name, set a room name and password, then enter the chat room to start communicating with your friends.' 
    },
    { 
        question: 'How can I report an issue?', 
        answer: 'If you encounter any issues, you can report them by contacting us at our support email: mohanmania.m934@gmail.com.' 
    },
    { 
        question: 'How many hours will it take to get a response?', 
        answer: 'You will receive a response within 24 hours. For emergency inquiries, please tag "emergency" in your message, and we will respond as quickly as possible.' 
    },
    {
        question: 'How can I update my profile picture?',
        answer: 'To update your profile picture, go to your profile settings and click on "Change Profile Picture". You can upload a new image from your device or select one from the gallery.'
    },
    {
        question: 'How do I block or unblock someone?',
        answer: ' thank you for appreicate you question  unforntinatly we are currently woorking on thsi we get back soon To block someone, go to their profile, click on the "More Options" button, and select "Block User". To unblock them, follow the same steps and select "Unblock User".'
    },
    {
        question: 'Can I delete my account?',
        answer: 'Yes, you can delete your account from the settings page under "Account Settings". Once deleted, all your data will be removed permanently.'
    },
   
    {
        question: 'Is there a way to customize the app theme?',
        answer: 'Yes, you can customize the app theme by going to the "Settings" menu and selecting "Appearance". Here, you can choose from various light and dark themes.'
    },
    {
        question: 'How can I contact customer support?',
        answer: 'You can contact our customer support team by emailing us at -_"mohanmania.m934@gmail.com"_ or by using the live chat feature available in the app.'
    }
];

  const sendMessage = async () => {
    const newMessage = { sender: 'user', text: userMessage };
    setMessages([...messages, newMessage]);

   
    const botReply = { sender: `bot`, text: `bot: ${"any questions please contact mohan@gmail.com"}` };
    setMessages([...messages, newMessage, botReply]);

    setUserMessage('');
  };

  const showHelp = () => {
    setShowFAQs(!showFAQs);  
  };

  const handleFAQClick = (answer) => {
    const faqMessage = { sender: 'bot', text: answer };
    setMessages([...messages, faqMessage]);
    setShowFAQs(false); 
  };

  return (
    <div className="chatbot">
    <span onClick={()=> navigate("/home")}  style={{color:"blue"}}>close</span>
     
    


      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} style={{backgroundColor:"white",color:"black"}}>Send</button>
        <button onClick={showHelp} style={{backgroundColor:"red", color:"white"}}>Help</button>
      </div>

      {showFAQs && (
        <div className="faq-section">
          <h3>Frequently Asked Questions</h3>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item" onClick={() => handleFAQClick(faq.answer)}>
              <p>{faq.question}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Chatbot;

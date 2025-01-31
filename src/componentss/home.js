import React, { useState } from "react";
import "../App.css";
import Leftnav from "../componentss/leftsidebar";
import MiddileSide from "../componentss/middilecontainer/middileside";
import Rightnav from "../componentss/rightcontainer/rightcontainer";
import { Menu } from 'lucide-react'; // Import Menu icon for toggle

function Home() {
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Handle drag start
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

  // Add touch support for mobile devices
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
  };

  return (
    <div className="App">
      {/* Mobile Toggle Button */}
      <div
        className="toggle-button"
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 1000,
          cursor: 'move',
          display: 'none', // Hidden by default, shown on mobile via CSS
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onClick={() => setIsLeftNavOpen(!isLeftNavOpen)}
      >
        <Menu size={24} />
      </div>

      {/* Left Navigation */}
      <div className={`leftSideHome ${isLeftNavOpen ? 'open' : ''}`}>
        <Leftnav />
      </div>

      <div className="middileSide">
        <MiddileSide />
      </div>

      <div className="rightSide">
        <Rightnav />
      </div>
    </div>
  );
}

export default Home;
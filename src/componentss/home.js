import React, { useState, useEffect } from "react";
import { Menu } from 'lucide-react';
import Leftnav from "../componentss/leftsidebar"
import MiddileSide from "./middilecontainer/middileside";
import Rightnav from "./rightcontainer/rightcontainer";

const Home = () => {
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

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

  return (
    <div className="App">
      {/* Mobile Toggle Button */}
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

      <div className="middileSide">
        <MiddileSide />
      </div>

      <div className="rightSide">
        <Rightnav />
      </div>
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from "react";
import "./vedios.css";
import { IconButton, CircularProgress } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { db } from "../firebase/firebase";
import { Button, message, Spin } from "antd";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import CommentIcon from "@mui/icons-material/Comment";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import Leftnav from "../componentss/leftsidebar";
import { Menu } from "lucide-react";

const demoVideos = [
  {
    id: 11,
    title: "Food Video",
    category: "food",
    src: "https://videos.pexels.com/video-files/6726897/6726897-hd_1920_1080_25fps.mp4",
  },
  {
    id: 12,
    title: "Food Video",
    category: "food",
    src: "https://videos.pexels.com/video-files/6726897/6726897-hd_1920_1080_25fps.mp4",
  },

  {
    id: 1,
    title: "Sports Video",
    category: "sports",
    src: "https://videos.pexels.com/video-files/856132/856132-hd_1920_1080_30fps.mp4",
  },
  {
    id: 2,
    title: "Sports Video",
    category: "sports",
    src: "https://videos.pexels.com/video-files/8053662/8053662-uhd_1440_2560_25fps.mp4",
  },
  {
    id: 3,
    title: "Sports Video",
    category: "sports",
    src: "https://videos.pexels.com/video-files/3121459/3121459-uhd_2560_1440_24fps.mp4",
  },
  {
    id: 8,
    title: "Sports Video",
    category: "sports",
    src: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 8,
    title: "Sports Video",
    category: "sports",
    src: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 8,
    title: "Sports Video",
    category: "sports",
    src: "https://www.w3schools.com/html/movie.mp4",
  },

  {
    id: 8,
    title: "Sports Video",
    category: "sports",
    src: "https://www.w3schools.com/html/movie.mp4",
  },

  {
    id: 8,
    title: "Sports Video",
    category: "sports",
    src: "https://www.w3schools.com/html/movie.mp4",
  },

  {
    id: 3,
    title: "Song Video",
    category: "songs",
    src: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 4,
    title: "Comedy Video",
    category: "comedy",
    src: "https://www.w3schools.com/html/movie.mp4",
  },
];

const savedVedios = [];

export default function Videos() {
  const [liked, setLiked] = useState(new Array(demoVideos.length).fill(false));
  const [showCommentBox, setShowCommentBox] = useState(
    new Array(demoVideos.length).fill(false)
  );
  const [comment, setComment] = useState(new Array(demoVideos.length).fill(""));
  const [shareModal, setShareModal] = useState(false);
  const [shared, setShared] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(true);
  const [savedVideos, setSavedVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Add global mouse/touch event listeners
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  // Handle drag start
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
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
        y: Math.min(Math.max(0, newY), maxY),
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
      clientY: touch.clientY,
    });
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMouseMove({
      preventDefault: () => e.preventDefault(),
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
  };

  // Handle toggle click
  const handleToggleClick = (e) => {
    if (!isDragging) {
      setIsLeftNavOpen(!isLeftNavOpen);
      setIsActive(!isActive);
    }
  };

  const handleLike = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);
  };

  const handleCommentIconClick = (index) => {
    const newShowCommentBox = [...showCommentBox];
    newShowCommentBox[index] = !newShowCommentBox[index];
    setShowCommentBox(newShowCommentBox);
  };

  const handleCommentChange = (index, value) => {
    const newComments = [...comment];
    newComments[index] = value;
    setComment(newComments);
  };

  const handleCommentSubmit = async (index) => {
    if (comment[index].trim() === "") return;
    try {
      const commentData = {
        comment: comment[index],
        timestamp: new Date(),
      };
      await addDoc(collection(db, "comments"), commentData);
      const newComments = [...comment];
      newComments[index] = "";
      setComment(newComments);
      const newShowCommentBox = [...showCommentBox];
      newShowCommentBox[index] = false;
      setShowCommentBox(newShowCommentBox);
      message.success("comment added successfully");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const handleShare = () => {
    setShareModal(true);
    setOpen(true);
  };

  const handleShareSubmit = () => {
    setShared(true);
    setTimeout(() => {
      setShareModal(false);
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          vedio successfully shared
        </Alert>
      </Snackbar>;
    }, 500);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const filterVideos = (category) => {
    setSelectedCategory(category);
    setIsDoubleClicked(false);
  };

  const filteredVideos =
    selectedCategory === "all"
      ? demoVideos
      : demoVideos.filter((video) => video.category === selectedCategory);

  const handleVideoClick = (event) => {
    if (event.target.paused) {
      event.target.play();
    } else {
      event.target.pause();
    }
  };

  const handleVideoDoubleClick = (videoIndex) => {
    setIsDoubleClicked(true);
    setCurrentVideoIndex(videoIndex);
  };

  const playNextVideo = () => {
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < filteredVideos.length) {
      setCurrentVideoIndex(nextIndex);
    } else {
      alert("No more videos to play.");
    }
  };

  const handleSave = async (video) => {
    try {
      await addDoc(collection(db, "savedVideos"), video);

      message.success("vedio successfully saved");
    } catch (error) {
      console.error("Error saving video: ", error);
    }
  };

  const fetchSavedVideos = async () => {
    try {
      const q = query(collection(db, "savedVideos"));
      const querySnapshot = await getDocs(q);
      const savedVideosList = querySnapshot.docs.map((doc) => doc.data());
      setSavedVideos(savedVideosList);
    } catch (error) {
      console.error("Error fetching saved videos: ", error);
    }
  };

  useEffect(() => {
    fetchSavedVideos();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.src = video.dataset.src;
          observer.unobserve(video);
          setCanScroll(true);
        }
      });
    });

    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredVideos]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 600 && canScroll) {
        const videoElements = document.querySelectorAll(".video-item");
        let videoInView = false;

        videoElements.forEach((videoElement) => {
          const rect = videoElement.getBoundingClientRect();
          if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            videoInView = true;
          }
        });

        if (!videoInView) {
          setCanScroll(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [canScroll]);

  return (
    <div className="main-conatiner">
      <div className="leftSidenav">
        <div
          className={`toggle-button ${isActive ? "active" : ""}`}
          style={{
            position: "fixed",
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 1000,
            cursor: isDragging ? "grabbing" : "grab",
            display: "none",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={handleToggleClick}
        >
          <Menu size={24} color={isActive ? "white" : "currentColor"} />
        </div>
        <div className={`leftSideHome ${isLeftNavOpen ? "open" : ""}`}>
          <Leftnav />
        </div>
      </div>
      <div className="main-div">
        <div className="filter-options">
          <button
            onClick={() => filterVideos("all")}
            className={selectedCategory === "all" ? "active-filter" : ""}
          >
            All
          </button>
          <button
            onClick={() => filterVideos("food")}
            className={selectedCategory === "food" ? "active-filter" : ""}
          >
            Food
          </button>
          <button
            onClick={() => filterVideos("sports")}
            className={selectedCategory === "sports" ? "active-filter" : ""}
          >
            Sports
          </button>
          <button
            onClick={() => filterVideos("songs")}
            className={selectedCategory === "songs" ? "active-filter" : ""}
          >
            Songs
          </button>
          <button
            onClick={() => filterVideos("comedy")}
            className={selectedCategory === "comedy" ? "active-filter" : ""}
          >
            Comedy
          </button>
          <button onClick={fetchSavedVideos}>Saved Items</button>
        </div>

        {!isDoubleClicked ? (
          <div
            className={`video-container ${
              selectedCategory === "all" ? "grid" : "single-column"
            }`}
          >
            {filteredVideos.map((video, index) => (
              <div key={video.id} className="video-item">
                <div className="video-wrapper">
                  <video
                    data-src={video.src}
                    onClick={handleVideoClick}
                    onDoubleClick={() => handleVideoDoubleClick(index)}
                    muted
                    loop
                    className="uploaded-video"
                  ></video>
                </div>
                <div className="icon-container">
                  <IconButton onClick={() => handleLike(index)}>
                    {liked[index] ? (
                      <FavoriteIcon fontSize="small" style={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon fontSize="small" />
                    )}
                  </IconButton>
                  <IconButton onClick={handleShare}>
                    <ShareIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleSave(video)}>
                    <BookmarkBorderIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleCommentIconClick(index)}>
                    <CommentIcon fontSize="small" />
                  </IconButton>
                </div>
                {showCommentBox[index] && (
                  <div className="comment-box">
                    <textarea
                      placeholder="Add a comment..."
                      value={comment[index]}
                      onChange={(e) =>
                        handleCommentChange(index, e.target.value)
                      }
                      className="comment-textarea"
                    ></textarea>
                    <button
                      onClick={() => handleCommentSubmit(index)}
                      className="comment-button"
                    >
                      Send
                    </button>
                  </div>
                )}
                {shareModal && !shared && (
                  <div className="share-modal">
                    <div className="share-content">
                      <p>Share this video with a random account</p>
                      <button
                        onClick={handleShareSubmit}
                        className="share-button"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="double-click-video-container">
            <video
              src={filteredVideos[currentVideoIndex]?.src}
              autoPlay
              controls
              onEnded={playNextVideo}
              className="fullscreen-video"
            ></video>
          </div>
        )}

        <div className="saved-videos-section">
          <h2>Saved Items</h2>
          <div className="saved-videos-container">
            {savedVideos.map((video, index) => (
              <div key={index} className="video-item">
                <div className="video-wrapper">
                  <video
                    src={video.src}
                    controls
                    className="uploaded-video"
                  ></video>
                </div>
                <div className="video-title">{video.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

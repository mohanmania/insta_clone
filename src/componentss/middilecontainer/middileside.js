import React, { useState, useRef, useEffect } from "react";
import "./middile.css";
import Post from "./post";
import { getStorage, ref, getDownloadURL,uploadBytes} from "firebase/storage";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import{db,auth} from "../../firebase/firebase"

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useUserStore } from "../../useStore/userstore";

function MiddileSide() {
    const [selectedStory, setSelectedStory] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useUserStore();

const storage = getStorage();
const storyBlockRef = useRef(null);

  
const defaultImage = "https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg";
const defaultUsername = "Guest-Login";

useEffect(() => {
    const fetchUserImage = async () => {
        try {
            const userId = auth.currentUser?.uid;
            if (!userId) return;

            const imageRef = ref(storage, `users/${userId}/profile.jpg`);
            const imageURL = await getDownloadURL(imageRef); // Get the download URL

            setImageUrl(imageURL); // Set the URL to the state
        } catch (error) {
            console.error("Error fetching image:", error);
            setImageUrl(defaultImage); // fallback image
        }
    };
    fetchUserImage();
}, []);

  const handleStoryClick = (index) => {
    setSelectedStory(index);
    setProgress(0);
    setIsAtStart(true);
    setIsAtEnd(false);
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
      setIsAtStart(false);
    } else {
      setIsAtEnd(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
      setIsAtEnd(false);
    } else {
      setIsAtStart(true);
    }
  };
    const stories = [
        {
            image: imageUrl || defaultImage,
            username: currentUser?.name || defaultUsername
        },
        {
            image: "https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg",
            username: "mahesh"
        },
        {
            image: "https://cdn.pixabay.com/photo/2016/01/03/09/50/boy-1119239_960_720.jpg",
            username: "mahesh"
        },
        {
            image: "https://cdn.pixabay.com/photo/2016/01/24/12/53/boys-1158803_960_720.jpg",
            username: "mahesh"
        },
        {
            image: "https://cms.qz.com/wp-content/uploads/2016/03/7.jpg?quality=75&strip=all&w=940",
            username: "kjhgfdsmahesh"
        },
        {
            image: "https://1.bp.blogspot.com/-uT-iKtRIHGA/Tgnqs8ZLMgI/AAAAAAAALKI/EfOhxGBwD4Y/s1600/Sam.JPG",
            username: "kjhgfdsmahesh"
        },
        {
            image: "https://images.pexels.com/photos/674268/pexels-photo-674268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            username: "yogesgh"
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Mahesh_Babu_in_Spyder.jpg/800px-Mahesh_Babu_in_Spyder.jpg",
            username: "krishnanna"
        },
        {
            image: "https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg",
            username: "D..దుర్గ దుర్గ89"
        },
        {
            image: "https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg",
            username: "D..దుర్గ దుర్గ89"
        },
        {
            image: "https://cdn.pixabay.com/photo/2020/09/19/20/01/woman-5585332_1280.jpg",
            username: "D..దుర్గ దుర్గ89"
        }
    ];

  
    const scroll = (direction) => {
      if (storyBlockRef.current) {
          const scrollAmount = direction === 'left' ? -300 : 300; // Adjust for responsiveness
          storyBlockRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
  };
    const checkScrollPosition = () => {
      if (storyBlockRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = storyBlockRef.current;
          setIsAtStart(scrollLeft <= 0);
          setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
      }
  };
  
  // Add scroll event listener
  useEffect(() => {
    const storyBlock = storyBlockRef.current;
    if (storyBlock) {
        storyBlock.addEventListener('scroll', checkScrollPosition);
        checkScrollPosition(); // Run on mount to check position
    }
    return () => {
        if (storyBlock) {
            storyBlock.removeEventListener('scroll', checkScrollPosition);
        }
    };
}, []);



 
  useEffect(() => {
    if (selectedStory !== null) {
        document.body.classList.add("modal-open");
    } else {
        document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
}, [selectedStory]);

    useEffect(() => {
        let timer;
        if (selectedStory !== null) {
            timer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                       
                        if (currentIndex < stories.length - 1) {
                            setCurrentIndex(prev => prev + 1);
                            return 0;
                        } else {
                            setSelectedStory(null);
                            setCurrentIndex(0);
                            return 0;
                        }
                    }
                    return prev + 2;
                });
            }, 50);
        }
        return () => clearInterval(timer);
    }, [selectedStory, currentIndex]);

    return (
        <div className="MiddileHomeside">
          <button 
    className={`carousel-button left ${isAtStart ? 'hidden' : ''}`}
    onClick={() => scroll('left')}
>
    <ChevronLeft size={20} />
</button>

<button 
    className={`carousel-button right ${isAtEnd ? 'hidden' : ''}`}
    onClick={() => scroll('right')}
>
    <ChevronRight size={20} />
</button>
            <div className="storyBlock" ref={storyBlockRef}>
                {stories.map((story, index) => (
                    <div 
                        key={index} 
                        className="storyParticular"
                        onClick={() => {
                            setSelectedStory(story);
                            setCurrentIndex(index);
                            setProgress(0);
                        }}
                    >
                        <div className="imagediv">
                            <img 
                                className="statusImage" 
                                src={story.image} 
                                alt={story.username}
                                loading="lazy"
                            />
                        </div>
                        <div className="fontName">{story.username}</div>
                    </div>
                ))}
            </div>

       
            {selectedStory && (
                <div className="storyViewer">
                    <div className="progressBar">
                        <div 
                            className="progressFill" 
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    
                    <button 
                        className="closeButton"
                        onClick={() => {
                            setSelectedStory(null);
                            setCurrentIndex(0);
                            setProgress(0);
                        }}
                    >
                        <X />
                    </button>

                    <div className="storyContent">
                        <img 
                            className="storyImage" 
                            src={stories[currentIndex].image} 
                            alt={stories[currentIndex].username} 
                        />
                        
                        <div className="storyNavigation">
                            <button 
                                className="navButton"
                                onClick={() => {
                                    if (currentIndex > 0) {
                                        setCurrentIndex(prev => prev - 1);
                                        setProgress(0);
                                    }
                                }}
                                style={{ visibility: currentIndex === 0 ? 'hidden' : 'visible' }}
                            >
                                <ChevronLeft />
                            </button>
                            
                            <button 
                                className="navButton"
                                onClick={() => {
                                    if (currentIndex < stories.length - 1) {
                                        setCurrentIndex(prev => prev + 1);
                                        setProgress(0);
                                    }
                                }}
                                style={{ visibility: currentIndex === stories.length - 1 ? 'hidden' : 'visible' }}
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>

        </div>
    );
}

export default MiddileSide;
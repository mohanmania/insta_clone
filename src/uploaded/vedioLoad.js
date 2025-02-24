import React, { useEffect, useRef, useState } from "react";

const LazyVideo = ({ thumbnail, videoSrc }) => {
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(videoRef.current); // Stop observing once loaded
                }
            },
            { threshold: 0.5 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <div ref={videoRef} className="video-container">
            {!isVisible ? (
                <img src={thumbnail} alt="Video Thumbnail" className="video-thumbnail" />
            ) : (
                <video controls autoPlay>
                    <source src={videoSrc} type="video/mp4" />
                </video>
            )}
        </div>
    );
};

export default LazyVideo;

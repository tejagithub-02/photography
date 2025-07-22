// src/components/Preloader.js
import React, { useEffect, useState, useRef } from 'react';
import './Preloader.css';
import Welcome from './Welcome';

const Preloader = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [lightClicked, setLightClicked] = useState(false);
  const [shutterActive, setShutterActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const apertureRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLightClicked(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (lightClicked) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            triggerShutter();
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [lightClicked]);

  const triggerShutter = () => {
    setShutterActive(true);
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowWelcome(true), 800);
    }, 1200);
  };

  const handleLightClick = () => {
    if (!lightClicked) {
      setLightClicked(true);
    }
  };

  if (showWelcome) return <Welcome />;

  return (
    <div className={`preloader-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="camera-body">
        <div className="camera-top"></div>
        <div className="camera-grip"></div>
        <div className="camera-viewfinder"></div>
        
        <div className={`light-button ${lightClicked ? 'clicked' : ''}`} onClick={handleLightClick}>
          <div className="shutter-icon">📸</div>
          <div className="progress-ring" style={{ '--progress': `${progress}%` }}></div>
          {lightClicked && (
            <div className="loading-text">{progress}%</div>
          )}
        </div>
        
        <div className="camera-lens">
          <div className="lens-outer">
            <div className="lens-inner">
              <div 
                ref={apertureRef} 
                className={`aperture ${shutterActive ? 'shutter-active' : ''}`}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="film-strip">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="film-perf"></div>
          ))}
        </div>
      </div>
      
      <h1 className="preloader-title">
        <span className="title-word">Capturing</span>
        <span className="title-word">Moments</span>
      </h1>
      
      {shutterActive && (
        <div className="shutter-effect">
          <div className="shutter-top"></div>
          <div className="shutter-bottom"></div>
        </div>
      )}
    </div>
  );
};

export default Preloader;
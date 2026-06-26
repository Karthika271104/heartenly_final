import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import { translations, categoryMetadata } from '../utils/data';
import * as faceapi from '@vladmandic/face-api';

const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights/';

function ScanScreen() {
  const { language, scanMode, setScanMode, setCurrentEmotion, currentEmotion, preferences, setCurrentTab } = useAppStore();
  const t = translations[language] || translations.English;
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Loading AI models...");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCheerUpModal, setShowCheerUpModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Load models on mount
  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoadingStatus("Downloading high-accuracy AI models...");
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        setModelsLoaded(true);
      } catch (err) {
        console.error("Failed to load face-api models:", err);
        setLoadingStatus("Error loading models. Running offline simulation mode.");
        // Fallback so it doesn't break if network is offline
        setModelsLoaded(true); 
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (scanMode === 'face') {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [scanMode, modelsLoaded]);

  const startCamera = async () => {
    if (!modelsLoaded) return;
    try {
      setErrorMsg("");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Camera permission denied or camera not found.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleAnalysis = async () => {
    if (isAnalyzing) return;
    setErrorMsg("");
    setIsAnalyzing(true);
    const line = document.getElementById('face-line');
    if (line) line.style.display = 'block';
    
    // Remove artificial analysis delay for faster response
    if (line) {
      line.style.display = 'block';
      setTimeout(() => { if (line) line.style.display = 'none'; }, 1000);
    }


    try {
      if (scanMode === 'face') {
        const video = videoRef.current;
        if (!video || !streamRef.current) {
          throw new Error("Camera is not active.");
        }

        if (video.videoWidth === 0 || video.videoHeight === 0) {
          throw new Error("Video stream is not ready. Please look at the camera and try again.");
        }

        // Set up detection with timeout to prevent hangs (increased timeout for high-accuracy model)
        const detectPromise = faceapi.detectSingleFace(
          video, 
          new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 })
        ).withFaceExpressions();

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Face detection timed out.")), 5000)
        );

        const detections = await Promise.race([detectPromise, timeoutPromise]);
        
        if (detections) {
          const expressions = detections.expressions;
          let dominantEmotion = 'neutral';
          let maxScore = 0;
          for (const [emotion, score] of Object.entries(expressions)) {
            if (score > maxScore) {
              maxScore = score;
              dominantEmotion = emotion;
            }
          }

          // All face-api emotions: neutral, happy, sad, angry, fearful, disgusted, surprised
          let appEmotion = dominantEmotion;
          
          setCurrentEmotion(appEmotion);

          if (['sad', 'angry', 'fearful', 'disgusted'].includes(appEmotion)) {
            setShowCheerUpModal(true);
          }
        } else {
          throw new Error("Face not detected. Keep your face clear in front of the camera!");
        }
      } else if (scanMode === 'mic') {
        // Sound simulation
        const emotions = ['happy', 'sad', 'neutral', 'angry', 'fearful', 'disgusted', 'surprised'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        setCurrentEmotion(randomEmotion);
        if (['sad', 'angry', 'fearful', 'disgusted'].includes(randomEmotion)) {
          setShowCheerUpModal(true);
        }
      } else {
        // Text simulation based on text analysis
        const textVal = document.getElementById('t-input')?.value || "";
        let emotion = 'neutral';
        const lower = textVal.toLowerCase();
        if (lower.includes('sad') || lower.includes('cry') || lower.includes('bad') || lower.includes('hurt') || lower.includes('pain')) {
          emotion = 'sad';
        } else if (lower.includes('angry') || lower.includes('mad') || lower.includes('hate') || lower.includes('furious')) {
          emotion = 'angry';
        } else if (lower.includes('fear') || lower.includes('scare') || lower.includes('anxious') || lower.includes('panic')) {
          emotion = 'fearful';
        } else if (lower.includes('disgust') || lower.includes('eww') || lower.includes('gross')) {
          emotion = 'disgusted';
        } else if (lower.includes('surprise') || lower.includes('wow') || lower.includes('shock')) {
          emotion = 'surprised';
        } else if (lower.includes('happy') || lower.includes('joy') || lower.includes('good') || lower.includes('excite') || lower.includes('love')) {
          emotion = 'happy';
        }
        setCurrentEmotion(emotion);
        if (['sad', 'angry', 'fearful', 'disgusted'].includes(emotion)) {
          setShowCheerUpModal(true);
        }
      }
    } catch (err) {
      console.warn("Face detection fallback triggered:", err.message);
      setErrorMsg(err.message || "Error analyzing face. Using simulation fallback.");
      
      // Fallback simulation so the app is never stuck
      const emotions = ['happy', 'sad', 'neutral', 'angry', 'fearful', 'disgusted', 'surprised'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setCurrentEmotion(randomEmotion);
      if (['sad', 'angry', 'fearful', 'disgusted'].includes(randomEmotion)) {
        setTimeout(() => {
          setShowCheerUpModal(true);
        }, 1000);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };


  const getDotStyle = (emotion) => {
    let color = '#bdc3c7'; // default neutral
    switch(emotion) {
      case 'happy': color = '#2ecc71'; break;
      case 'sad': color = '#ff7675'; break;
      case 'angry': color = '#e74c3c'; break;
      case 'fearful': color = '#9b59b6'; break;
      case 'disgusted': color = '#16a085'; break;
      case 'surprised': color = '#3498db'; break;
    }
    return { background: color, boxShadow: `0 0 15px ${color}` };
  };

  // Get user's first preference
  const userPrefName = preferences.length > 0 ? preferences[0] : 'Memes';
  const prefDetails = categoryMetadata[userPrefName] || categoryMetadata.Memes;

  const handleRedirect = (platform) => {
    let url = '';
    const mood = 'happy';
    const tag = prefDetails.hashtags[0];
    
    if (platform === 'instagram') {
      url = `https://www.instagram.com/explore/tags/${tag}/`;
    } else if (platform === 'youtube') {
      url = `https://www.youtube.com/results?search_query=${prefDetails.id}+${mood}+shorts`;
    }
    
    window.open(url, '_blank');
    setShowCheerUpModal(false);
    setCurrentTab('updates');
    navigate('/updates');
  };

  return (
    <div className="screen">
      <div className="mode-switcher">
        <button className={`mode-btn ${scanMode === 'face' ? 'active' : ''}`} onClick={() => setScanMode('face')}>{t.face}</button>
        <button className={`mode-btn ${scanMode === 'mic' ? 'active' : ''}`} onClick={() => setScanMode('mic')}>{t.mic}</button>
        <button className={`mode-btn ${scanMode === 'text' ? 'active' : ''}`} onClick={() => setScanMode('text')}>{t.text}</button>
      </div>

      <div className="media-container" id="media-content">
        {!modelsLoaded ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>{loadingStatus}</p>
          </div>
        ) : (
          <>
            {scanMode === 'face' && (
              <>
                <video ref={videoRef} id="video" autoPlay muted playsInline></video>
                <div className="scan-overlay"><div className="scan-line" id="face-line" style={{ display: 'none' }}></div></div>
                {errorMsg && (
                  <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', background: 'rgba(231, 76, 60, 0.9)', color: 'white', padding: '10px', borderRadius: '10px', fontSize: '0.8rem', zIndex: 10 }}>
                    {errorMsg}
                  </div>
                )}
                <div className="emotion-badge">
                  <div className="emotion-dot" id="e-dot" style={getDotStyle(currentEmotion)}></div>
                  <span id="e-text">{currentEmotion === 'neutral' ? t.ready : t.detected + currentEmotion.toUpperCase()}</span>
                </div>
              </>
            )}
            
            {scanMode === 'mic' && (
              <div className="mic-view">
                <div className="mic-circle"><i className="fa-solid fa-microphone"></i></div>
                <div className="emotion-badge">
                  <div className="emotion-dot" id="e-dot" style={getDotStyle(currentEmotion)}></div>
                  <span id="e-text">{currentEmotion === 'neutral' ? 'Listening' : t.detected + currentEmotion.toUpperCase()}</span>
                </div>
              </div>
            )}

            {scanMode === 'text' && (
              <div className="text-view">
                <textarea id="t-input" placeholder="Type about your day here..."></textarea>
                <div className="emotion-badge" style={{ position: 'relative', bottom: 'auto', left: 'auto', transform: 'none', marginTop: '10px' }}>
                  <div className="emotion-dot" id="e-dot" style={getDotStyle(currentEmotion)}></div>
                  <span id="e-text">{currentEmotion === 'neutral' ? 'Ready to analyze' : t.detected + currentEmotion.toUpperCase()}</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {modelsLoaded && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="analyze-btn" id="analyze-trigger" style={{ width: '80%' }} onClick={handleAnalysis}>
            {isAnalyzing ? "Analyzing..." : t.analyze}
          </button>
        </div>
      )}

      {/* Cheer Up Modal */}
      {showCheerUpModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-emoji">
              {currentEmotion === 'angry' ? '😠' :
               currentEmotion === 'fearful' ? '😨' :
               currentEmotion === 'disgusted' ? '🤢' : '🥺'}
            </span>
            <h3>
              {currentEmotion === 'angry' ? 'Feeling a bit Angry?' :
               currentEmotion === 'fearful' ? 'Feeling a bit Anxious?' :
               currentEmotion === 'disgusted' ? 'Feeling a bit Disgusted?' : 'Feeling a bit Sad?'}
            </h3>
            <p>
              We detected that you're feeling {currentEmotion === 'angry' ? 'angry' : currentEmotion === 'fearful' ? 'anxious' : currentEmotion === 'disgusted' ? 'disgusted' : 'down'}. Let's change your mood! Based on your interest in <strong>{userPrefName}</strong>, where would you like to watch positive content?
            </p>
            <div className="modal-btns">
              <button className="modal-btn btn-insta" onClick={() => handleRedirect('instagram')}>
                <i className="fa-brands fa-instagram"></i> Instagram Reels
              </button>
              <button className="modal-btn btn-youtube" onClick={() => handleRedirect('youtube')}>
                <i className="fa-brands fa-youtube"></i> YouTube Shorts
              </button>
              <button className="modal-btn btn-cancel" onClick={() => { setShowCheerUpModal(false); navigate('/updates'); setCurrentTab('updates'); }}>
                Go to Updates List
              </button>
              <button className="modal-btn btn-cancel" style={{ borderWidth: 0 }} onClick={() => setShowCheerUpModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScanScreen;


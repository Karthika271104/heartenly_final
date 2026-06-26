# Heartenly 💙 (Final Project)

This is our **Heartenly** project! It is a web application that detects a user's facial emotion and helps improve their mood by recommending personalized content.

## How It Works

1. **Onboarding:** When users enter the application, they can select their preferred categories such as Memes, Motivation, Tech, etc.

2. **Face Scan:** The application accesses the user's webcam and scans their face.

3. **Emotion Detection:** After scanning, the application detects whether the user is **Happy, Sad, Angry, Fearful, Disgusted, Surprised,** or **Neutral**.

4. **Mood Boost:** If the user is feeling sad or angry, a **Mood Boost Modal** automatically appears and redirects them to Instagram Reels or YouTube Shorts based on their selected interests.

---

## Behind the Code

For emotion detection, the application uses the **`@vladmandic/face-api`** library, which is a powerful browser-based machine learning library for face detection and facial expression recognition.

To achieve better accuracy, the application uses the **`SSDMobilenetv1`** model.

**Main File:** `src/pages/ScanScreen.jsx`

This file contains the core logic responsible for loading the AI models, detecting facial expressions, and providing mood-based recommendations.

### Important Code

**Loading the Models** (Inside the `useEffect` hook in `ScanScreen.jsx`)

```javascript
// Loading high-accuracy models
await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
```

**Detecting Emotions** (Inside the `handleAnalysis` function in `ScanScreen.jsx`)

```javascript
// Detect the user's face and facial expressions
const detectPromise = faceapi.detectSingleFace(
  video,
  new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }) // High accuracy detection
).withFaceExpressions();
```

The above code captures the webcam video, detects the user's face, and returns the detected facial expression.

The application then uses the following logic to assist users experiencing negative emotions:

```javascript
// Open the Mood Boost modal for negative emotions
if (['sad', 'angry', 'fearful', 'disgusted'].includes(appEmotion)) {
  setShowCheerUpModal(true);
}
```

---

## Setup & Run (Run Locally)

1. Install all required dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the URL displayed in the terminal (for example, `http://localhost:5173`) in your browser.

---

The application's social media links, categories, hashtags, and other metadata are maintained inside the `categoryMetadata` object located in `src/utils/data.js`.

Enjoy! 🚀

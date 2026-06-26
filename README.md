# Heartenly 💙 (Final Project)

Machas, idhu dhaan namma **Heartenly** project! Idhu edhukku na, oruthavanga face-a paathu avanga mood eppadi irukku nu kandupudichu, avangala cheer up pandra oru super-ana web app.

## Idhu Eppadi Work Aagudhu? (How it works)
1. **Onboarding**: User ulla vandhadhum avangalukku pudicha categories (Memes, Motivation, Tech, etc.) select pannuvanga.
2. **Scan Screen**: User avanga face-a camera-la kaatum bodhu, app avanga face-a scan pannum.
3. **Emotion Detection**: Face-a scan panni, avanga Happy, Sad, Angry, Fearful, Disgusted, Surprised illa Neutral-aa irukkanga nu kandupudikkum.
4. **Mood Boost**: Oruvela user konjam sad-aavo illa angry-aavo irundha, udane oru "Mood Boost Modal" open aagi, avanga select panna pudicha category-la irundhu Instagram Reels illa YouTube Shorts-kku direct-aa kootitu poyidum!

## Enga, Eppadi detect pandrom? (Behind the Code)

Indha emotion detection-kku namma use panna API per: **`@vladmandic/face-api`**. Idhu oru semma powerful-ana browser-based ML library.

Accuracy nalla irukkanum nu namma **`SSDMobilenetv1`** model-a use pannirukkom. 

**Main-ana File:** `src/pages/ScanScreen.jsx`

Indha file-la thaan main process nadakkudhu. 

### Important-ana code part:
Models-a load pandra function (ScanScreen.jsx la `useEffect` kulla):
```javascript
// Loading high-accuracy models
await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
```

Emotions-a detect pandra function (ScanScreen.jsx la `handleAnalysis` function kulla):
```javascript
// ScanScreen.jsx -la irukka indha lines thaan face detect pannudhu
const detectPromise = faceapi.detectSingleFace(
  video, 
  new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }) // High accuracy detection!
).withFaceExpressions();
```
Mela irukka code, camera video-va (stream) eduthu, face-a detect panni, adhu enna emotion nu (expressions) return pannum. 

Apparam, indha varuna logic vachi thaan namma user-kku help pandrom:
```javascript
// Negative emotion-a irundha, udane cheer up modal open pannu!
if (['sad', 'angry', 'fearful', 'disgusted'].includes(appEmotion)) {
  setShowCheerUpModal(true); 
}
```

## Setup & Run (Local-la run panna)
1. `npm install` (ellam modules install aagidum)
2. `npm run dev` (development server start aagidum)
3. Browser-la poi URL-a (eg. `localhost:5173`) open panna app vandhudum!

Adhe maari, namma social media links, categories, hashtags ellam namma `src/utils/data.js`-la `categoryMetadata` kulla vechirukkom.

Enjoy pandra macha! 🚀

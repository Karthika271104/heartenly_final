import React from 'react';
import useAppStore from '../store/useAppStore';
import { onboardingData, translations } from '../utils/data';

function Onboarding() {
  const { language, setLanguage, preferences, togglePreference, completeOnboarding } = useAppStore();
  const t = translations[language] || translations.English;

  const handleStart = () => {
    if (preferences.length === 0) {
      alert("Select interest!");
      return;
    }
    completeOnboarding();
  };

  return (
    <div className="onboarding-overlay">
      <h1 className="onboarding-title">Heartenly</h1>
      
      <div className="setup-section">
        <h3>Select Language</h3>
        <div className="pref-grid">
          {onboardingData.languages.map(l => (
            <div 
              key={l}
              className={`pref-item ${language === l ? 'selected' : ''}`} 
              onClick={() => setLanguage(l)}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
      
      <div className="setup-section">
        <h3>Your Loves</h3>
        <div className="pref-grid">
          {onboardingData.categories.map(c => (
             <div 
               key={c}
               className={`pref-item ${preferences.includes(c) ? 'selected' : ''}`} 
               onClick={() => togglePreference(c)}
             >
               {c}
             </div>
          ))}
        </div>
      </div>
      
      <button className="start-btn" onClick={handleStart}>{t.start}</button>
    </div>
  );
}

export default Onboarding;

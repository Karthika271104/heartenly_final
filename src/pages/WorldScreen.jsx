import React from 'react';
import useAppStore from '../store/useAppStore';
import { translations } from '../utils/data';

function WorldScreen() {
  const { language, currentEmotion, preferences } = useAppStore();
  const t = translations[language] || translations.English;

  // MULTIPLE HASHTAG LOGIC
  const mood = currentEmotion === 'sad' ? 'happy' : 'celebration';
  const lang = language;
  const userPrefs = preferences.slice(0, 3).map(p => p.toLowerCase());

  // User suggestion based trending tags
  const trendingTags = ["tamilmemes", "trendingsongs", "cinema", "wholesome", "viral"];
  const combinedTags = [...userPrefs, ...trendingTags].slice(0, 5).map(tag => `#${tag}`).join(' ');
  const query = `${lang} ${mood} ${userPrefs.join(' ')} ${trendingTags.join(' ')}`;

  return (
    <div className="screen">
      <h2>{t.world}</h2>
      
      <div className="world-grid">
        <div className="social-card" onClick={() => window.open(`https://instagram.com/explore/tags/${userPrefs[0] || 'trending'}/`, '_blank')}>
          <i className="fa-brands fa-instagram"></i>
        </div>
        <div className="social-card" onClick={() => window.open(`https://youtube.com/results?search_query=${query}`, '_blank')}>
          <i className="fa-brands fa-youtube"></i>
        </div>
        <div className="social-card" onClick={() => window.open(`https://facebook.com/search/top/?q=${query}`, '_blank')}>
          <i className="fa-brands fa-facebook-f"></i>
        </div>
      </div>
      
      <div className="feed-item" style={{ marginTop: '20px' }}>
        <h3>Trending Boost</h3>
        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Tags: {combinedTags}</p>
      </div>
    </div>
  );
}

export default WorldScreen;

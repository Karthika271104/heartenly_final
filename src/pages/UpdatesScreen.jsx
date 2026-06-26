import React, { useState } from 'react';
import useAppStore from '../store/useAppStore';
import { translations, categoryMetadata } from '../utils/data';

function UpdatesScreen() {
  const { language, currentEmotion, preferences } = useAppStore();
  const t = translations[language] || translations.English;
  const [openCategory, setOpenCategory] = useState(null);

  const allCategoryKeys = Object.keys(categoryMetadata);
  
  // Sort categories: user preferences first, then the rest
  const orderedKeys = [
    ...preferences.filter(p => allCategoryKeys.includes(p)),
    ...allCategoryKeys.filter(k => !preferences.includes(k))
  ];

  const cats = orderedKeys.map(key => ({
    key: key,
    ...categoryMetadata[key]
  }));

  const handleToggle = (catId) => {
    setOpenCategory(openCategory === catId ? null : catId);
  };

  const renderLinks = (catObj) => {
    const links = catObj.links || [];
    const hashtags = catObj.hashtags || ["trending"];
    
    const mood = currentEmotion === 'sad' ? 'happy' : 'success';
    const tagQuery = hashtags.map(t => `#${t}`).join(' ');
    const instaSearch = hashtags[0];

    return (
      <div className="links-container" style={{ paddingTop: '10px' }} onClick={(e) => e.stopPropagation()}>
        {links.map((link, idx) => (
          <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="resource-link">
            {link.label}
          </a>
        ))}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--primary-light)' }}>Trending: {tagQuery}</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href={`https://www.instagram.com/explore/tags/${instaSearch}/`} target="_blank" rel="noreferrer" className="shorts-btn">
              <i className="fa-brands fa-instagram"></i> Reels
            </a>
            <a href={`https://www.youtube.com/results?search_query=${catObj.id}+${mood}+shorts`} target="_blank" rel="noreferrer" className="shorts-btn">
              <i className="fa-brands fa-youtube"></i> Shorts
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="screen">
      <h2>{t.updates}</h2>
      
      <div className="updates-list">
        {cats.map(c => {
          const isUserPref = preferences.includes(c.key);
          return (
            <div 
              key={c.id} 
              className={`update-category ${isUserPref ? 'user-preferred' : ''}`} 
              onClick={() => handleToggle(c.id)}
              style={isUserPref ? { borderLeft: '4px solid var(--primary-light)' } : {}}
            >
              <div className="cat-header">
                <div className="cat-icon"><i className={`fa-solid ${c.icon}`}></i></div>
                <div className="cat-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3>{c.label}</h3>
                    {isUserPref && (
                      <span style={{ fontSize: '0.65rem', background: 'rgba(142, 68, 173, 0.2)', color: 'var(--primary-light)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                        Your Choice
                      </span>
                    )}
                  </div>
                  <p>{t.ready}</p>
                </div>
              </div>
              
              {openCategory === c.id && renderLinks(c)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpdatesScreen;


import React from 'react';
import { NavLink } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import { translations } from '../utils/data';

function Layout({ children }) {
  const { language, currentTab, setCurrentTab } = useAppStore();
  const t = translations[language] || translations.English;

  return (
    <>
      <header>
        <h1>Heartenly</h1>
        <p id="app-subtitle">{t.intro}</p>
      </header>

      <main id="active-screen">
        {children}
      </main>

      <nav className="bottom-nav">
        <NavLink 
          to="/scan" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={() => setCurrentTab('scan')}
        >
          <i className="fa-solid fa-face-smile"></i>
          <span>{t.scan}</span>
        </NavLink>

        <NavLink 
          to="/world" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={() => setCurrentTab('world')}
        >
          <i className="fa-solid fa-earth-americas"></i>
          <span>{t.world}</span>
        </NavLink>

        <NavLink 
          to="/updates" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={() => setCurrentTab('updates')}
        >
          <i className="fa-solid fa-arrow-trend-up"></i>
          <span>{t.updates}</span>
        </NavLink>
      </nav>
    </>
  );
}

export default Layout;

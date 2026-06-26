import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAppStore from './store/useAppStore';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import ScanScreen from './pages/ScanScreen';
import WorldScreen from './pages/WorldScreen';
import UpdatesScreen from './pages/UpdatesScreen';

function App() {
  const { isOnboarded } = useAppStore();

  return (
    <BrowserRouter>
      <div id="app">
        {/* Background elements for visual flair */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>

        {!isOnboarded ? (
          <Onboarding />
        ) : (
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/scan" />} />
              <Route path="/scan" element={<ScanScreen />} />
              <Route path="/world" element={<WorldScreen />} />
              <Route path="/updates" element={<UpdatesScreen />} />
            </Routes>
          </Layout>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;

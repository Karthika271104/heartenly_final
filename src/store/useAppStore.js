import { create } from 'zustand';

const useAppStore = create((set) => ({
  language: 'English',
  preferences: [],
  isOnboarded: false,
  currentTab: 'scan',
  scanMode: 'face',
  currentEmotion: 'neutral',
  
  setLanguage: (lang) => set({ language: lang }),
  
  togglePreference: (pref) => set((state) => {
    const isSelected = state.preferences.includes(pref);
    if (isSelected) {
      return { preferences: state.preferences.filter(p => p !== pref) };
    } else {
      return { preferences: [...state.preferences, pref] };
    }
  }),
  
  completeOnboarding: () => set({ isOnboarded: true }),
  
  setCurrentTab: (tab) => set({ currentTab: tab }),
  
  setScanMode: (mode) => set({ scanMode: mode }),
  
  setCurrentEmotion: (emotion) => set({ currentEmotion: emotion })
}));

export default useAppStore;

// Centralized Reactive State Mesh Provider (DashboardContext)
// Eliminates brittle prop drilling and synchronizes WebSocket active speaker claims across decoupled layout components

import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [boardroomSpeakerState, setBoardroomSpeakerState] = useState({
    activePersona: 'Alex',
    activeVoice: 'Aoede',
    activeLanguage: 'en-US',
    isAudioIngestionActive: false,
    audioGainLevel: 1.0,
    webSocketTelemetryStatus: 'CONNECTED'
  });

  return (
    <DashboardContext.Provider value={{ boardroomSpeakerState, setBoardroomSpeakerState }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardMesh = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardMesh must be utilized within an active DashboardProvider.');
  }
  return context;
};

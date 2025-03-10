// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styles from './App.module.css';
import { CncjsProvider } from './providers/cncjs/CncjsProvider';
import { FluidNCProvider } from './providers/fluidnc/FluidNCProvider';
import ControlView from './views/ControlView';
import ConsoleView from './views/ConsoleView';
import MacrosView from './views/MacrosView';
import FilesView from './views/FilesView';
import AutolevelView from './views/AutolevelView';
import DisconnectedOverlay from './util/DisconnectedOverlay';
import { NavLink } from "react-router-dom"; // ✅ Use NavLink for active styling
import WebcamView from './views/WebcamView';
import loadConfig from "./util/Config";
import { useState, useEffect } from 'react';


function App() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    loadConfig().then(setConfig);
  }, []);

  if (!config) return <div>Loading...</div>;
  // ✅ Dynamically select the provider
  let Provider;
  switch (config.socketProvider) {
    case "fluidnc":
      Provider = FluidNCProvider;
      break;
    case "cncjs":
    default:
      Provider = CncjsProvider;
      break;
  }



  return (

    <Provider options={config}>

      <div className={styles.appContainer}>
        <Router>
          <nav className={styles.tabBar}>
            <NavLink to="/control" title="Control" className={({ isActive }) => isActive ? styles.active : ""}>
              Control
            </NavLink>
            <NavLink to="/console" title="Console" className={({ isActive }) => isActive ? styles.active : ""}>
              Console
            </NavLink>
            <NavLink to="/macros" title="Macros" className={({ isActive }) => isActive ? styles.active : ""}>
              Macros
            </NavLink>
            <NavLink to="/files" title="Files" className={({ isActive }) => isActive ? styles.active : ""}>
              File
            </NavLink>
            <NavLink to="/autolevel" title="Autolevel" className={({ isActive }) => isActive ? styles.active : ""}>
              Autolevel??
            </NavLink>
            <NavLink to="/webcam" title="Webcam" className={({ isActive }) => isActive ? styles.active : ""}>
              Webcam
            </NavLink>
          </nav>

          <div className={styles.viewContainer}>
            <Routes>
              <Route path="/" element={<Navigate to="/control" replace />} />
              <Route path="/control" element={<ControlView />} />
              <Route path="/console" element={<ConsoleView />} />
              <Route path="/macros" element={<MacrosView />} />
              <Route path="/files" element={<FilesView />} />
              <Route path="/autolevel" element={<AutolevelView />} />
              <Route path="/webcam" element={<WebcamView />} />
            </Routes>
          </div>
        </Router>
      </div>
      <DisconnectedOverlay /> {/* ✅ Overlay blocks UI when disconnected */}
    </Provider>
  );
}

export default App;

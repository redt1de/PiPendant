// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGamepad, faTerminal, faListAlt, faFolderOpen, faDraftingCompass } from '@fortawesome/free-solid-svg-icons';
import styles from './App.module.css';
import { CncjsProvider } from './cncjs/CncjsProvider';
// Import the view components
import ControlView from './views/ControlView';
import ConsoleView from './views/ConsoleView';
import MacrosView from './views/MacrosView';
import FilesView from './views/FilesView';
import AutolevelView from './views/AutolevelView';
import DisconnectedOverlay from './util/DisconnectedOverlay';
import { NavLink } from "react-router-dom"; // ✅ Use NavLink for active styling
import WebcamView from './views/WebcamView';


function App() {
  const options = {
    cncjsAddress: '127.0.0.1',
    cncjsPort: 8000,
    baudrate: 115200,
    controllerType: 'Grbl',
    port: '/dev/ttyUSB0',
  }


  return (

    <CncjsProvider options={options}>
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
    </CncjsProvider>
  );
}

export default App;

// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faTerminal, faListAlt, faFolderOpen, faDraftingCompass } from '@fortawesome/free-solid-svg-icons';
import styles from './App.module.module.css';
import { CncjsProvider } from './cncjs/CncjsProvider';
// Import the view components
import ControlView from './views/ControlView';
import ConsoleView from './views/ConsoleView';
import MacrosView from './views/MacrosView';
import FilesView from './views/FilesView';
import AutolevelView from './views/AutolevelView';




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
          {/* Tabbed Navigation Bar */}
          <nav className={styles.tabBar}>
            <Link to="/control" title="Control">
              {/* <FontAwesomeIcon icon={faGamepad} /> */}
              Control
            </Link>
            <Link to="/console" title="Console">
              {/* <FontAwesomeIcon icon={faTerminal} /> */}
              Console
            </Link>
            <Link to="/macros" title="Macros">
              {/* <FontAwesomeIcon icon={faListAlt} /> */}
              Macros
            </Link>
            <Link to="/files" title="Files">
              {/* <FontAwesomeIcon icon={faFolderOpen} /> */}
              File
            </Link>
            <Link to="/autolevel" title="Autolevel">
              {/* <FontAwesomeIcon icon={faDraftingCompass} /> */}
              Autolevel??
            </Link>
          </nav>

          {/* View Container for routed content */}
          <div className={styles.viewContainer}>
            <Routes>
              {/* Default route redirects to Control view */}
              <Route path="/" element={<Navigate to="/control" replace />} />
              <Route path="/control" element={<ControlView />} />
              <Route path="/console" element={<ConsoleView />} />
              <Route path="/macros" element={<MacrosView />} />
              <Route path="/files" element={<FilesView />} />
              <Route path="/autolevel" element={<AutolevelView />} />
            </Routes>
          </div>
        </Router>
      </div>
    </CncjsProvider>
  );
}

export default App;

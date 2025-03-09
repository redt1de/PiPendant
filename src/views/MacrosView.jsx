// views/ConsoleView.jsx
import React from 'react';

export default function ConsoleView() {
    return (
        <div style={{ padding: '10px' }}>
            <h2>Console</h2>
            <div style={{
                background: '#000', color: '#0f0', padding: '10px', height: '80%', overflowY: 'auto'
            }}>
                {/* This area would display console output from CNC in real-time */}
                <p> CNC Console output will appear here...</p>
            </div>
            {/* Reuse MDIInput for sending commands from console, if desired */}
        </div>
    );
}

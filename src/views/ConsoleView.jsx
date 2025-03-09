// views/ConsoleView.jsx
import React from 'react';
import ConsoleGroup from '../components/ConsoleGroup';
import GPadGroup from '../components/GPadGroup';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CncjsContext } from '../cncjs/CncjsProvider';

export default function ConsoleView() {
    const { sendGcode, sendCncjsCommand, sendRawSerial } = useContext(CncjsContext);
    const [machineMessages, setMachineMessages] = useState([
        'Initializing...',
        'Waiting for data...'
    ]);

    useEffect(() => {
        // Example: mock new messages arriving every 2 seconds
        const interval = setInterval(() => {
            setMachineMessages(prev => [...prev, `New message at ${Date.now()}`]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div style={{ padding: '10px' }}>
            <div style={{ position: 'absolute', bottom: '0px', left: '0px' }}>
                <GPadGroup messages={machineMessages} onEnter={(input) => {
                    console.log('🚀 Sending Gcode:', input);
                    sendRawSerial(input);
                    // sendCncjsCommand('gcode', [input]);
                    // sendGcode(input);
                }} />
            </div>
            <div style={{ position: 'absolute', bottom: '50px', left: '350px' }}>
                <ConsoleGroup messages={machineMessages} />
            </div>
        </div>
    );
}
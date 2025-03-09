// views/ConsoleView.jsx
import React from 'react';
import ConsoleGroup from '../components/ConsoleGroup';
import GPadGroup from '../components/GPadGroup';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CncjsContext } from '../cncjs/CncjsProvider';
import Frame from '../util/Frame';
import MDI from '../components/MDI';
import SpindleGroup from '../components/SpindleGroup';
import styles from './css/ConsoleView.module.css';
import MachineGroup from '../components/MachineGroup';
import CycleGroup from '../components/CycleGroup';
import StateGroup from '../components/StateGroup';


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
        <div className={styles.consoleView}>

            <div style={{ position: 'absolute', top: '0px', left: '10px' }}>
                <Frame title="Machine" >
                    <StateGroup />
                </Frame>
            </div>

            <div style={{ position: 'absolute', bottom: '0px', left: '10px' }}>
                <GPadGroup messages={machineMessages} onEnter={(input) => {
                    console.log('🚀 Sending Gcode:', input);
                    sendRawSerial(input);
                    // sendCncjsCommand('gcode', [input]);
                    // sendGcode(input);
                }} />
            </div>


            <div style={{ position: 'absolute', top: '0px', left: '460px' }}>
                <Frame title="DRO">
                    <MDI />
                </Frame>
            </div>


            <div style={{ position: 'absolute', top: '0px', right: '10px' }}>
                <Frame title="Tool">
                    <SpindleGroup />
                </Frame>
            </div>


            <div style={{ position: 'absolute', bottom: '0px', right: '10px' }}>
                <Frame title="Console">
                    <ConsoleGroup messages={machineMessages} />
                </Frame>
            </div>
        </div>
    );
}
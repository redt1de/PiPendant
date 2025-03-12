// views/FilesView.jsx
import React from 'react';
import Frame from '../util/Frame';
import ConsoleGroup from '../components/ConsoleGroup';
import { useEffect, useState } from 'react';
import { useCNC } from "../machine/providers/CNCProvider";
import styles from './css/TestView.module.css';



export default function FilesView() {
    const { machineState, controller } = useCNC();
    // const [machineMessages, setMachineMessages] = useState([
    //     'Initializing...',
    //     'Waiting for data...'
    // ]);

    // useEffect(() => {
    //     // Example: mock new messages arriving every 2 seconds
    //     const interval = setInterval(() => {
    //         setMachineMessages(prev => [...prev, `New message at ${Date.now()}`]);
    //     }, 2000);
    //     return () => clearInterval(interval);
    // }, []);

    const fakeprobe = () => {
        controller.parseData(`[PRB:0.000,0.000,0.000:1]`);
    }

    const getProbeData = () => {
        // console.log(controller.getProbeHistory());
        controller.listFiles();
    }


    return (
        <div style={{ padding: '10px' }}>
            <h2>Testing</h2>
            <div className={styles.testContainer}>
                <button onClick={() => controller.send(`?`)}>?</button>
                <button onClick={getProbeData}>get</button>
                <button onClick={fakeprobe} >fake probe</button>

            </div>
            <div style={{ position: 'absolute', bottom: '0px', right: '10px' }}>
                <Frame title="Console">
                    <ConsoleGroup />
                </Frame>
            </div>
        </div>
    );
}

/*
$Files/ListGcode

{"files":[{"name":"Spoilboard","size":"-1"},{"name":"grid.nc","size":"580"},{"name":"drill.nc","size
":"5589"},{"name":"Macros","size":"-1"}],"path":""}

ok
*/
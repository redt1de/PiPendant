import styles from './css/ZeroGroup.module.css';
import { useContext } from 'react';
import { useCNC } from "../providers/CNCProvider";

export default function ZeroGroup() {
    const { isConnected, send, consoleMessages, machineState } = useCNC();
    return (
        // <Frame title="Zero">
        <div className={styles.zeroContainer}>
            <button onClick={() => send("G10 L20 P1 X0 Y0 Z0")}>Zero All</button>
            <button onClick={() => send("G10 L20 P1 X0")}>Zero X</button>
            <button onClick={() => send("G10 L20 P1 Y0")}>Zero Y</button>
            <button onClick={() => send("G10 L20 P1 Z0")}>Zero Z</button>
        </div>
        // </Frame>
    );
}



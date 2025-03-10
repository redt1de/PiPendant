import styles from './css/ZeroGroup.module.css';
import { useContext } from 'react';
import { CncjsContext } from '../providers/cncjs/CncjsProvider';

export default function ZeroGroup() {
    const { sendGcode } = useContext(CncjsContext);
    return (
        // <Frame title="Zero">
        <div className={styles.zeroContainer}>
            <button onClick={() => sendGcode("G92 X0Y0Z0")}>G92XYZ</button>
            <button onClick={() => sendGcode("G92 X0")}>G92 X0</button>
            <button onClick={() => sendGcode("G92 Y0")}>G92 Y0</button>
            <button onClick={() => sendGcode("G92 Z0")}>G92 Z0</button>
        </div>
        // </Frame>
    );
}



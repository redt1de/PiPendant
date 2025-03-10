import styles from './css/CycleGroup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { useCNC } from "../providers/CNCContext";
// import { CncjsContext } from '../providers/cncjs/CncjsProvider';

export default function CycleGroup() {
    // const { sendCncjsCommand } = useContext(CncjsContext);
    const { isConnected, send, consoleMessages } = useCNC();
    return (

        <div className={styles.cycleContainer}>
            <button onClick={() => send(`$G`)}><FontAwesomeIcon icon={faPlay} /></button>
            <button><FontAwesomeIcon icon={faPause} /></button>
            <button><FontAwesomeIcon icon={faStop} /></button>
        </div>

    );
}

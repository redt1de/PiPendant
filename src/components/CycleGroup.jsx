import styles from './css/CycleGroup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CncjsContext } from '../providers/cncjs/CncjsProvider';

export default function CycleGroup() {
    const { sendCncjsCommand } = useContext(CncjsContext);
    return (

        <div className={styles.cycleContainer}>
            <button onClick={() => sendCncjsCommand(`reset`)}><FontAwesomeIcon icon={faPlay} /></button>
            <button><FontAwesomeIcon icon={faPause} /></button>
            <button><FontAwesomeIcon icon={faStop} /></button>
        </div>

    );
}

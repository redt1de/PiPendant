import styles from './css/CycleGroup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLockOpen, faRotateBack, faStop, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CncjsContext } from '../cncjs/CncjsProvider';

export default function CycleGroup() {
    const { sendGcode, sendCncjsCommand, sendRawSerial } = useContext(CncjsContext);
    return (

        <div className={styles.cycleContainer}>
            <button onClick={() => sendCncjsCommand(`reset`)}><FontAwesomeIcon icon={faPlay} /></button>
            <button><FontAwesomeIcon icon={faPause} /></button>
            <button><FontAwesomeIcon icon={faStop} /></button>
        </div>

    );
}

import styles from './css/CycleGroup.module.css';
import Frame from '../util/Frame';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLockOpen, faRotateBack, faStop, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

export default function CycleGroup() {
    return (
        // <Frame title="Cycle">
        <div className={styles.cycleContainer}>
            <button><FontAwesomeIcon icon={faPlay} /></button>
            <button><FontAwesomeIcon icon={faPause} /></button>
            <button><FontAwesomeIcon icon={faStop} /></button>
        </div>
        // </Frame>
    );
}

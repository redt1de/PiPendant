import styles from './css/MachineGroup.module.css';
import Frame from '../util/Frame';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLockOpen, faRotateBack, faStop, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

export default function MachineGroup() {
    return (
        // <Frame title="Machine">
        <div className={styles.machineContainer}>
            {/* aDD MACHINE STATE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            <button><FontAwesomeIcon icon={faRotateBack} /></button>
            <button><FontAwesomeIcon icon={faLockOpen} /></button>
            <button><FontAwesomeIcon icon={faHouse} /></button>
        </div>
        // </Frame>
    );
}

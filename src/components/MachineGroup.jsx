import styles from './css/MachineGroup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLockOpen, faRotateBack } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
// import { CncjsContext } from '../providers/cncjs/CncjsProvider';
import HomingModal from "../util/HomingModal";
import { useState } from 'react';

export default function MachineGroup() {
    // const { sendGcode, sendCncjsCommand } = useContext(CncjsContext);
    const [showModal, setShowModal] = useState(false);

    const handleHoming = (command) => {
        console.log("Sending:", command);
        // sendGcode(command); // ✅ Send homing command
        setShowModal(false);
    };
    return (
        <div>

            {showModal && <HomingModal onOk={handleHoming} onCancel={() => setShowModal(false)} />}

            <div className={styles.machineContainer}>
                <button /*onClick={() => sendCncjsCommand(`reset`)}*/><FontAwesomeIcon icon={faRotateBack} /></button>
                <button /*onClick={() => sendCncjsCommand(`unlock`)}*/><FontAwesomeIcon icon={faLockOpen} /></button>
                <button /*onClick={() => setShowModal(true)}*/><FontAwesomeIcon icon={faHouse} /></button>
            </div>
        </div>
    );
}

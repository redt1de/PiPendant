import styles from './css/MachineGroup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLockOpen, faRotateBack } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { useCNC } from "../machine/providers/CNCProvider";
import HomingModal from "../util/HomingModal";
import { useState } from 'react';

export default function MachineGroup() {
    const [showModal, setShowModal] = useState(false);
    const { controller } = useCNC();

    const handleHoming = (command) => {
        console.log("Sending:", command);
        controller.send(command); // ✅ Send homing command
        setShowModal(false);
    };
    return (
        <div>

            {showModal && <HomingModal onOk={handleHoming} onCancel={() => setShowModal(false)} />}

            <div className={styles.machineContainer}>
                <button onClick={() => controller.sendRaw(0x18)}><FontAwesomeIcon icon={faRotateBack} /></button>
                <button onClick={() => controller.send(`$X`)}><FontAwesomeIcon icon={faLockOpen} /></button>
                <button onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faHouse} /></button>
            </div>
        </div>
    );
}

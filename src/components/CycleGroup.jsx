import styles from './css/CycleGroup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { useCNC } from "../machine/providers/CNCProvider";

export default function CycleGroup() {
    const { controller } = useCNC();
    return (

        <div className={styles.cycleContainer}>
            <button onClick={() => controller.send(`?\n$G\n$#`)}><FontAwesomeIcon icon={faPlay} /></button>
            <button><FontAwesomeIcon icon={faPause} /></button>
            <button><FontAwesomeIcon icon={faStop} /></button>
        </div>

    );
}

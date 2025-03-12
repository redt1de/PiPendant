import styles from './css/ZeroGroup.module.css';
import { useContext } from 'react';
import { useCNC } from "../machine/providers/CNCProvider";

export default function ZeroGroup() {
    const { controller } = useCNC();
    return (
        // <Frame title="Zero">
        <div className={styles.zeroContainer}>
            <button onClick={() => controller.send("G10 L20 P1 X0 Y0 Z0")}>Zero All</button>
            <button onClick={() => controller.send("G10 L20 P1 X0")}>Zero X</button>
            <button onClick={() => controller.send("G10 L20 P1 Y0")}>Zero Y</button>
            <button onClick={() => controller.send("G10 L20 P1 Z0")}>Zero Z</button>
        </div>
        // </Frame>
    );
}



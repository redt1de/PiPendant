import React, { useContext } from "react"; import styles from './css/MDI.module.css';
import { useCNC } from "../machine/providers/CNCProvider";

export default function MDI({ positions = {} }) {
    const { isConnected, send, consoleMessages, machineState } = useCNC();
    const grblState = null;
    // const { grblState } = useContext(CncjsContext);

    return (
        <div className={styles.mdiContainer}>

            <table className={styles.mdiTable}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Work</th>
                        <th>Machine</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={styles.axisLabel}>X</td>

                        <td className={styles.wposTd}>{(machineState && machineState.wpos?.x) ?? -199.999}</td>
                        <td className={styles.mposTd}>{(machineState && machineState.mpos?.x) ?? -199.999}</td>
                    </tr>
                    <tr>
                        <td className={styles.axisLabel}>Y</td>
                        <td className={styles.wposTd}>{(machineState && machineState.wpos?.y) ?? -199.999}</td>
                        <td className={styles.mposTd}>{(machineState && machineState.mpos?.y) ?? -199.999}</td>
                    </tr>
                    <tr>
                        <td className={styles.axisLabel}>Z</td>
                        <td className={styles.wposTd}>{(machineState && machineState.wpos?.z) ?? -199.999}</td>
                        <td className={styles.mposTd}>{(machineState && machineState.mpos?.z) ?? -199.999}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
}

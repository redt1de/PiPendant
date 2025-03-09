import React, { useContext } from "react"; import styles from './css/MDI.module.css';
import { CncjsContext } from "../cncjs/CncjsProvider";

export default function MDI({ positions = {} }) {
    const { grblState } = useContext(CncjsContext);
    return (
        // <Frame title="DRO">
        <div className={styles.mdiContainer}>
            {/* <label className={styles.stateLabel} htmlFor="state">
                    State:
                </label>
                <label className={styles.state} id="state">
                    RUNNING
                </label> */}

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
                        <td className={styles.wposTd}>{(grblState && grblState.status.wpos.x) ?? -199.999}</td>
                        <td className={styles.mposTd}>{(grblState && grblState.status.mpos.x) ?? -199.999}</td>
                    </tr>
                    <tr>
                        <td className={styles.axisLabel}>Y</td>
                        <td className={styles.wposTd}>{(grblState && grblState.status.wpos.y) ?? -199.999}</td>
                        <td className={styles.mposTd}>{(grblState && grblState.status.mpos.y) ?? -199.999}</td>
                    </tr>
                    <tr>
                        <td className={styles.axisLabel}>Z</td>
                        <td className={styles.wposTd}>{(grblState && grblState.status.wpos.z) ?? -199.999}</td>
                        <td className={styles.mposTd}>{(grblState && grblState.status.mpos.z) ?? -199.999}</td>
                    </tr>
                </tbody>
            </table>
        </div>


        // </Frame>
    );
}

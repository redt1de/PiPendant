import React, { useContext } from "react";
import styles from "./css/DisconnectedOverlay.module.css";
import { CncjsContext } from "../cncjs/CncjsProvider";

export default function DisconnectedOverlay() {
    const { isSocketConnected, isControllerConnected } = useContext(CncjsContext);

    if (isSocketConnected && isControllerConnected) {
        return null; // ✅ Do not show if connected
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.messageBox}>
                <h2>Please check your CNCjs connection.</h2>
                {isSocketConnected ? <p>Socket.IO Connection: ✅</p> : <p>Socket.IO Connection: ❌</p>}

                {isControllerConnected ? <p>Controller Connection: ✅</p> : <p>Controller Connection: ❌</p>}


            </div>
        </div>
    );
}

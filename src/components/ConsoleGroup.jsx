import React, { useRef, useEffect, useContext } from "react";
// import { CncjsContext } from "../providers/cncjs/CncjsProvider";
import { useCNC } from "../providers/CNCContext";
import styles from "./css/ConsoleGroup.module.css";


const syntaxMatchers = {
    "►": styles.sent,                 // Special character highlight
    "ok": styles.success,             // Success messages
    "error|fail|critical": styles.error, // Errors
    "warning|caution|alert": styles.warning, // Warnings
    "\\[MSG:.*\\]": styles.info, // Messages like `[MSG:Check Limits]`
    "\\[DBG:.*\\]": styles.debug // Debug messages
};

// const msgFilters = [
//     "$G"
// ];


export default function ConsoleGroup() {

    // const { consoleMessages = [] } = useContext(CncjsContext); // ✅ Ensure messages update
    const { isConnected, consoleMessages, connect, disconnect, send } = useCNC();

    const scrollRef = useRef(null);

    // ✅ Auto-scroll when messages update
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [consoleMessages]);

    // ✅ Function to apply syntax highlighting



    const getHighlightedMessage = (msg) => {
        for (const [pattern, style] of Object.entries(syntaxMatchers)) {
            if (new RegExp(pattern, "i").test(msg)) {
                return <span className={style}>{msg}</span>;
            }
        }
        return <span className={styles.default}>{msg}</span>; // Default style
    };

    return (
        <div className={styles.consoleContainer} ref={scrollRef}>
            {consoleMessages.length > 0 ? (
                consoleMessages.map((msg, i) => (
                    // checkFilter(msg) &&
                    <div key={i} className={styles.consoleLine}>
                        {getHighlightedMessage(msg)}
                    </div>
                ))
            ) : (
                <div className={styles.placeholder}>No console messages yet...</div>
            )}
        </div>
    );
}

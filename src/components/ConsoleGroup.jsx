import React, { useRef, useEffect, useContext } from "react";
import { CncjsContext } from "../cncjs/CncjsProvider";
import styles from "./css/ConsoleGroup.module.css";

export default function ConsoleGroup() {
    const { consoleMessages = [] } = useContext(CncjsContext); // ✅ Ensure messages update

    const scrollRef = useRef(null);

    // // ✅ Debugging: Log console messages when they change
    // useEffect(() => {
    //     console.log("🔥 ConsoleGroup Received New Messages:", consoleMessages);
    // }, [consoleMessages]);

    // ✅ Auto-scroll when messages update
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [consoleMessages]);

    // ✅ Function to apply syntax highlighting
    const getHighlightedMessage = (msg) => {
        if (/error|fail|critical/i.test(msg)) return <span className={styles.error}>{msg}</span>;
        if (/status|update|ok/i.test(msg)) return <span className={styles.status}>{msg}</span>;
        return <span className={styles.default}>{msg}</span>;
    };

    return (
        <div className={styles.consoleContainer} ref={scrollRef}>
            {consoleMessages.length > 0 ? (
                consoleMessages.map((msg, i) => (
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

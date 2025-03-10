import React, { useState } from "react";
import styles from "./css/GPadGroup.module.css";
import Frame from "../util/Frame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function GPadGroup({ onEnter, initialValue = "" }) {
    const [inputValue, setInputValue] = useState(initialValue);
    const [gcodeHistory, setGcodeHistory] = useState([]); // ✅ Stores entered commands
    const [setHistoryIndex] = useState(-1); // ✅ Tracks position in history

    const keypadLayout = [
        ["X", "G", "7", "8", "9", "UP"],
        ["Y", "M", "4", "5", "6", "DOWN"],
        ["Z", "S", "1", "2", "3", "DEL"],
        ["-", "F", ".", "0", "SPC", "ENTER"],
    ];

    // ✅ Helper function to render key labels
    const renderKeyLabel = (key) => {
        switch (key) {
            case "DEL":
                return <FontAwesomeIcon icon={faDeleteLeft} />;
            case "UP":
                return "▲";
            case "DOWN":
                return "▼";
            case "SPC":
                return "_";
            case "ENTER":
                return <FontAwesomeIcon icon={faArrowRightToBracket} />;
            default:
                return key;
        }
    };

    // ✅ Handle Key Press
    const handlePress = (key) => {
        switch (key) {
            case "DEL":
                setInputValue((prev) => prev.slice(0, -1));
                break;
            case "SPC":
                setInputValue((prev) => prev + " ");
                break;
            case "ENTER":
                if (inputValue.trim() !== "") {
                    setGcodeHistory((prev) => [...prev, inputValue]); // ✅ Save to history
                    setHistoryIndex(-1); // ✅ Reset history index
                    if (onEnter) onEnter(inputValue);
                    setInputValue(""); // ✅ Clear input
                }
                break;
            case "UP":
                navigateHistory(-1);
                break;
            case "DOWN":
                navigateHistory(1);
                break;
            default:
                setInputValue((prev) => prev + key);
                break;
        }
    };

    // ✅ Navigate history with UP/DOWN
    const navigateHistory = (direction) => {
        if (gcodeHistory.length === 0) return; // No history to navigate

        setHistoryIndex((prevIndex) => {
            let newIndex = prevIndex + direction;

            if (newIndex < 0) newIndex = 0; // Prevent going before first entry
            if (newIndex >= gcodeHistory.length) return -1; // Exit history

            setInputValue(gcodeHistory[newIndex]); // ✅ Load history entry
            return newIndex;
        });
    };

    return (
        <Frame title="Gcode">
            <div className={styles.keypadContainer}>
                <div className={styles.display}>{inputValue || "\u00A0"}</div>
                <div className={styles.gpadContainer}>
                    {keypadLayout.map((row, rowIndex) =>
                        row.map((key) => (
                            <button
                                key={`${rowIndex}-${key}`}
                                className={styles.keyButton}
                                onClick={() => handlePress(key)}
                            >
                                {renderKeyLabel(key)}
                            </button>
                        ))
                    )}
                </div>
            </div>
        </Frame>
    );
}

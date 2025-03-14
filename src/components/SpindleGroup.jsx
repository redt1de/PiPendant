import React, { useState, useContext } from 'react';
import styles from './css/SpindleGroup.module.css';
import { useCNC } from "../machine/providers/CNCProvider";
import KeypadModal from '../util/KeypadModal';

export default function SpindleGroup() {
    const [showKeypad, setShowKeypad] = useState(false);
    const [prompt, setPrompt] = useState('Enter Value');
    const [currentCommand, setCurrentCommand] = useState('');
    const { controller, machineState } = useCNC();


    const handleOpenKeypad = (command) => {
        setCurrentCommand(command);

        switch (command) {
            case 'm3':
            case 'm4':
                setPrompt('Enter Speed');
                break;
            case 'm6':
                setPrompt('Enter Tool Number');
                break;
            default:
                setPrompt('Enter Value');
        }

        setShowKeypad(true);
    };

    // Close the keypad
    const handleCancel = () => {
        setShowKeypad(false);
    };

    /*
      handleOk is called when the user presses OK in the keypad
      'value' is the typed number.
    */
    const handleOk = (value) => {
        console.log(`User entered: ${value}, for command: ${currentCommand}`);

        // You could send a G-code command here based on the chosen command:
        switch (currentCommand) {
            case 'm3':
                // e.g., "M3 S{value}"
                console.log(`Send command: M3 S${value}`);
                controller.send(`M3 S${value}`);
                break;
            case 'm4':
                // e.g., "M4 S{value}"
                console.log(`Send command: M4 S${value}`);
                controller.send(`M4 S${value}`);
                break;
            case 'm6':
                // e.g., "M6 T{value}"
                console.log(`Send command: M6 T${value}`);
                controller.send(`M6 T${value}`);
                break;
            default:
                console.log('Unknown command');
        }

        setShowKeypad(false);
    };

    // Example simple M5 logic (stop spindle) - no keypad
    const handleM5 = () => {
        console.log('Send command: M5 (stop spindle)');
        controller.send(`M5`);
    };

    return (
        <div>
            <div className={styles.spindleContainer}>
                <table className={styles.toolTable}>
                    <tbody>
                        <tr>
                            <td className={styles.toolLabel}>T</td>
                            <td className={styles.toolTdV}>{(machineState && machineState.modal?.tool) ?? -1}</td>
                        </tr>
                        <tr>
                            <td className={styles.toolLabel}>TLO</td>
                            <td className={styles.toolTdV}>{(machineState && machineState.tlo) ?? -1}</td>
                        </tr>
                        <tr>
                            <td className={styles.toolLabel}>S</td>
                            <td className={styles.toolTdV}>{(machineState && machineState.modal?.spindleSpeed) ?? -1}</td>
                        </tr>
                    </tbody>
                </table>

                {/* onClick={() => sendGcode("")} */}

                <button className={styles.m3Btn} onClick={() => handleOpenKeypad('m3')}>M3</button>
                <button className={styles.m4Btn} onClick={() => handleOpenKeypad('m4')}>M4</button>
                <button className={styles.m5Btn} onClick={handleM5}>M5</button>
                <button className={styles.m6Btn} onClick={() => handleOpenKeypad('m6')}>M6</button>

            </div>
            <div>
                {showKeypad && (
                    <KeypadModal
                        promptText={prompt}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    />
                )}
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import styles from './css/GPadGroup.module.css';
import Frame from '../util/Frame';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDeleteLeft, faKeyboard, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft, faKeyboard, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CncjsContext } from '../cncjs/CncjsProvider';

// export default function GPadGroup() {
//     return (
//         <Frame title="Gcode">
//             <div className={styles.gpadContainer}>
//                 {/*
//                 G,M,S,F
//                 X,Y,Z,DEL
//                 7,8,9,-
//                 4,5,6,$
//                 1,2,3,=
//                 .,0,SPC,ENTER
//                 EXIT 
//                 */}

//             </div>
//         </Frame>
//     );
// }

export default function GPadGroup({ onEnter, initialValue = '' }) {
    const [inputValue, setInputValue] = useState(initialValue);



    const keypadLayout = [
        ['G', 'M', 'S', 'F'],
        ['X', 'Y', 'Z', 'DEL'],
        ['7', '8', '9', '-'],
        ['4', '5', '6', '$'],
        ['1', '2', '3', '='],
        ['.', '0', 'SPC', 'ENTER'],
    ];

    // A small helper to return either an icon or the original key string
    const renderKeyLabel = (key) => {
        switch (key) {
            case 'DEL':
                return <FontAwesomeIcon icon={faDeleteLeft} />;
            case 'SPC':
                // return <FontAwesomeIcon icon={faKeyboard} />;
                return "_";
            case 'ENTER':
                return <FontAwesomeIcon icon={faArrowRightToBracket} />;
            default:
                return key; // Return the literal string for other keys
        }
    };

    const handlePress = (key) => {
        switch (key) {
            case 'DEL':
                setInputValue((prev) => prev.slice(0, -1));
                break;
            case 'SPC':
                setInputValue((prev) => prev + ' ');
                break;
            case 'ENTER':
                if (onEnter) {
                    onEnter(inputValue);
                }
                setInputValue('');
                break;
            default:
                setInputValue((prev) => prev + key);
                break;
        }
    };

    return (
        <Frame title="Gcode">
            <div className={styles.keypadContainer}>
                <div className={styles.display}>{inputValue || '\u00A0'}</div>
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
                    {/* <button className={styles.exitButton} onClick={() => setInputValue('')}>Exit</button> */}
                </div>
            </div>
        </Frame>
    );
}
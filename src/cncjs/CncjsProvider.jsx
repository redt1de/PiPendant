import React, { createContext, useEffect, useState } from "react";
import {
    openCncjsConnection,
    closeCncjsConnection,
    sendGcode,
    sendCncjsCommand,
    sendRawSerial
} from "./cncjsConnection";

export const CncjsContext = createContext(null);




export function CncjsProvider({ options, children }) {
    const [connected, setConnected] = useState(false);
    // const [status, setStatus] = useState(null);
    // const [workflow, setWorkflow] = useState(null);
    // const [feeder, setFeeder] = useState(null);
    // const [controller, setController] = useState(null);
    const [grblState, setGrblState] = useState(null);
    const [consoleMessages, setConsoleMessages] = useState([]); // Store console output


    useEffect(() => {
        function handleCncjsEvent(eventData) {
            // if (eventData.event === "status") setStatus(eventData.data);
            // if (eventData.event === "workflow:state") setWorkflow(eventData.data);
            // if (eventData.event === "feeder:status") setFeeder(eventData.data);
            // if (eventData.event === "controller:state") setController(eventData.data);

            if (eventData.event === "Grbl:state") setGrblState(eventData.data);

            if (eventData.event === "serialport:error") console.log(eventData.data);

            if (eventData.event === "serialport:read" || eventData.event === "serialport:write") {
                const ln = eventData.data.toString().trim();
                if (ln) {
                    setConsoleMessages((prev) => {
                        const updatedMessages = [...prev, ln];
                        return updatedMessages;
                    });
                }
            }
        }




        openCncjsConnection(options, handleCncjsEvent)
            .then(() => setConnected(true))
            .catch(() => setConnected(false));

        return () => {
            closeCncjsConnection();
            setConnected(false);
        };
    }, [options]);

    // useEffect(() => {
    //     console.log("🔥 Console Messages Updated:", consoleMessages);
    // }, [consoleMessages]);

    return (
        <CncjsContext.Provider value={{
            connected,
            // status,
            // workflow,
            // feeder,
            grblState,
            consoleMessages,
            sendGcode,
            sendCncjsCommand,
            sendRawSerial
        }}>
            {children}
        </CncjsContext.Provider>
    );
}



// // CncjsProvider.jsx
// import React, { createContext, useEffect, useState } from 'react';
// import { openCncjsConnection, closeCncjsConnection } from './cncjsConnection';

// export const CncjsContext = createContext(null);


// const options = {
//     cncjsAddress: '127.0.0.1',
//     cncjsPort: 8000,
//     baudrate: 115200,
//     controllerType: 'Grbl',
//     port: '/dev/ttyUSB0',
// }

// export function CncjsProvider({ baseUrl = 'http://127.0.0.1:8000', children }) {
//     const [connected, setConnected] = useState(false);

//     useEffect(() => {
//         let unmounted = false;

//         async function init() {
//             try {
//                 if (unmounted) return;
//                 openCncjsConnection(options, handleCncjsEvent)
//                 setConnected(true);
//             } catch (error) {
//                 console.error('Failed to initialize CNCjs connection:', error);
//                 setConnected(false);
//             }
//         }

//         init();

//         return () => {
//             unmounted = true;
//             closeCncjsConnection();
//         };
//     }, [baseUrl]);


//     // Example event handler for CNCjs messages
//     function handleCncjsEvent(evt) {
//         console.log('CNCjs event:', evt);


//         if (evt.event === 'disconnect') {
//             setConnected(false);
//         }
//     }

//     // Expose the context value to children
//     const value = {
//         connected,
//         // Example actions if needed
//     };

//     return (
//         <CncjsContext.Provider value={value}>
//             {children}
//         </CncjsContext.Provider>
//     );
// }

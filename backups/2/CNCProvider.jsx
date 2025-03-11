import React, { useRef, createContext, useContext, useState, useEffect } from "react";
import GrblController from "./GrblController";
import { FluidNCProvider } from "./fluidnc/FluidNCProvider";


const CNCContext = createContext();

export function CNCProvider({ options, children }) {
    const [isConnected, setIsConnected] = useState(false);
    const [machineState, setMachineState] = useState({});
    const [consoleMessages, setConsoleMessages] = useState([]);
    const grblController = new GrblController();
    const providerRef = useRef(null); // ✅ Store provider instance persistently

    useEffect(() => {
        // ✅ Only initialize the provider once
        if (!providerRef.current) {
            console.log("🔄 Initializing CNC Provider...");

            let selectedProvider;
            switch (options.socketProvider) {
                case "fluidnc":
                    selectedProvider = new FluidNCProvider(options, () => {
                        setIsConnected(selectedProvider.isConnected);
                        setMachineState({ ...selectedProvider.machineState });
                    }, (data) => grblController.parseData(data));
                    break;
                default:
                    console.error("❌ No valid provider selected!");
                    return;
            }

            providerRef.current = selectedProvider;
        }
        grblController.addListener((state, messages) => {
            setMachineState(state);
            setConsoleMessages([...messages]);
        });


        // ✅ Cleanup on unmount (but not on every re-render)
        return () => {
            console.log("🛑 CNCProvider is being unmounted...");
            providerRef.current?.disconnect();
        };
    }, []); // ✅ Empty dependency array ensures this runs only once


    if (!providerRef.current) return <div>Loading CNC Provider...</div>;

    return (
        <CNCContext.Provider value={{ ...providerRef.current, isConnected, machineState }}>
            {children}
        </CNCContext.Provider>
    );
}

export const useCNC = () => useContext(CNCContext);
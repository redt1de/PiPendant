import React, { useRef, createContext, useContext, useState, useEffect } from "react";
import GrblController from "./GrblController";
import { FluidNCProvider } from "./fluidnc/FluidNCProvider";

const CNCContext = createContext();

export function CNCProvider({ options, children }) {
    const [isConnected, setIsConnected] = useState(false);
    const [machineState, setMachineState] = useState({});
    const [consoleMessages, setConsoleMessages] = useState([]);
    const grblController = useRef(new GrblController());
    const providerRef = useRef(null);

    useEffect(() => {
        if (!providerRef.current) {
            console.log("🔄 Initializing CNC Provider...");
            let selectedProvider;
            switch (options.socketProvider) {
                case "fluidnc":
                    selectedProvider = new FluidNCProvider(options, () => {
                        setIsConnected(selectedProvider.isConnected);
                    }, (data) => grblController.current.parseData(data));
                    break;
                default:
                    console.error("❌ No valid provider selected!");
                    return;
            }
            providerRef.current = selectedProvider;
        }

        grblController.current.addListener((state, messages) => {
            setMachineState({ ...state });
            setConsoleMessages([...messages]);
        });

        return () => {
            console.log("🛑 CNCProvider is being unmounted...");
            providerRef.current?.disconnect();
        };
    }, []);

    if (!providerRef.current) return <div>Loading CNC Provider...</div>;

    return (
        <CNCContext.Provider value={{ isConnected, machineState, consoleMessages, send: providerRef.current.send }}>
            {children}
        </CNCContext.Provider>
    );
}

export const useCNC = () => useContext(CNCContext);

import React, { useState, useEffect } from "react";
import { CNCContext } from "./CNCContext";
import { FluidNCProvider } from "./fluidnc/FluidNCProvider";

export function CNCProvider({ options, children }) {
    const [provider, setProvider] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        let selectedProvider;

        switch (options.socketProvider) {
            case "fluidnc":
                selectedProvider = new FluidNCProvider(options, () => {
                    setForceUpdate((prev) => prev + 1);
                    setIsConnected(selectedProvider.isConnected); // ✅ Track connection state
                });
                break;
            default:
                console.error("❌ No valid provider selected!");
                return;
        }

        setProvider(selectedProvider);

        return () => {
            console.log("🛑 Unmounting CNC Provider...");
            selectedProvider?.disconnect();
        };
    }, [options.socketProvider]);

    if (!provider) return <div>Loading CNC Provider...</div>;

    return (
        <CNCContext.Provider value={{ ...provider, isConnected }}>
            {children}
        </CNCContext.Provider>
    );
}

// import React, { useState, useEffect } from "react";
// import { CNCContext } from "./CNCContext";
// import { FluidNCProvider } from "./fluidnc/FluidNCProvider";

// export function CNCProvider({ options, children }) {
//     const [provider, setProvider] = useState(null);
//     const [forceUpdate, setForceUpdate] = useState(0);

//     useEffect(() => {
//         let selectedProvider;

//         switch (options.socketProvider) {
//             case "fluidnc":
//                 selectedProvider = new FluidNCProvider(options, () => setForceUpdate((prev) => prev + 1));
//                 break;
//             default:
//                 console.error("❌ No valid provider selected!");
//                 return;
//         }

//         setProvider(selectedProvider);

//         return () => {
//             console.log("🛑 Unmounting CNC Provider...");
//             selectedProvider?.disconnect();
//         };
//     }, [options.socketProvider]); // ✅ Only recreate provider if socket provider changes

//     if (!provider) return <div>Loading CNC Provider...</div>;

//     return <CNCContext.Provider value={provider}>{children}</CNCContext.Provider>;
// }

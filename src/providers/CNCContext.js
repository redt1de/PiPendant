import { createContext, useContext } from "react";

// ✅ Create a shared CNC context
export const CNCContext = createContext(null);

// ✅ Hook to access CNC methods and state
export function useCNC() {
    const context = useContext(CNCContext);
    if (!context) throw new Error("useCNC must be used within a CNCProvider");
    return context;
}

// import { GrblHALParser } from 'grblhal-parser';
import  GrblParser  from "../parsers/GrblParser";

export class FluidNCProvider {
    constructor(options, onUpdate) {
        this.options = options;
        this.onUpdate = onUpdate;
        this.socket = null;
        this.isConnected = false;
        this.machineState = {};
        this.consoleMessages = [];
        this.reconnectTimeout = null;
        this.parser  = new GrblParser();
        this.awaitingStatus = false;

        this.parser.on("success", (data) => {
            console.log("🔵 Machine Success:", data);
        });

        this.parser.on("error", (data) => {
            console.log("🔵 Machine Error:", data);
        });

         // ✅ Handle parsed status updates
         this.parser.on("machineState", (data) => {
            console.log("🔵 Machine State Updated:", data);
            this.machineState = data;
        });
        

        this.excludedPatterns = [
            /^PING:.*/, // Ignore "PING: ..." messages
            /^CURRENT_ID:.*/,
            /^ACTIVE_ID:.*/,
            /^\$G$/     // Ignore "$G" status requests
        ];

        this.connect();
    }

    // filterStatus = (message) => {
    //     if (!this.awaitingStatus) {
    //         return false;
    //     }

    // };


    handleMessage = (message) => {
        if (!this.excludedPatterns.some((regex) => regex.test(message))) {
            this.consoleMessages = [...this.consoleMessages, `⬅️ ${message}`]; // ✅ Create new array to trigger re-render
            console.log(`⬅️ FluidNC Message: ${message}`);
        }
    
        this.parser.parse(message);
    
        if (this.onUpdate) this.onUpdate();
    };


    connect = () => {
        if (this.socket) {
            console.warn("⚠️ Already connected to FluidNC");
            return;
        }

        console.log(`🔌 Connecting to FluidNC WebSocket: ws://${this.options.socketAddress}:81`);
        this.socket = new WebSocket(`ws://${this.options.socketAddress}:81`);

        this.socket.onopen = () => {
            this.isConnected = true;
            // this.send("$#\n$G\n?");
            this.consoleMessages.push("✅ Connected to FluidNC");
            console.log("✅ FluidNC WebSocket connected");
            

            if (this.onUpdate) this.onUpdate();
        };

        this.socket.onmessage = async (event) => {
            if (event.data instanceof Blob) {
                // ✅ Convert Blob to text before storing it
                event.data.text().then((text) => {
                    this.handleMessage(text);
                });
            } else {
                this.handleMessage(event.data);
            }
        };

        this.socket.onclose = () => {
            console.warn("🔌 FluidNC WebSocket disconnected");
            this.isConnected = false;
            this.consoleMessages.push("🔌 Disconnected from FluidNC");
            this.socket = null;
            if (this.onUpdate) this.onUpdate();
            this.scheduleReconnect();
        };

        this.socket.onerror = (error) => {
            console.error("❌ FluidNC WebSocket error:", error);
            if (this.socket) {
                this.socket.close();
                this.socket = null;
            }
        };
    };



    disconnect = () => {
        if (!this.socket) {
            console.warn("⚠️ No active FluidNC connection to disconnect.");
            return;
        }
    
        console.log("❌ Manually disconnecting from FluidNC");
        clearTimeout(this.reconnectTimeout);
        
        if (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING) {
            this.socket.close();
        }
        
        this.socket = null;
        this.isConnected = false;
        
        if (this.onUpdate) this.onUpdate();
    };

    send = (command) => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(command + "\n");
            this.consoleMessages.push(`➡️ ${command}`);
            console.log(`➡️ Sent to FluidNC: ${command}`);
            if (this.onUpdate) this.onUpdate();
        } else {
            console.error("❌ Cannot send command: FluidNC WebSocket is not connected.");
        }
    };

    sendRaw = (data) => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            if (typeof data === "number") {
                // Convert number (like 0x18) to a Uint8Array buffer
                this.socket.send(new Uint8Array([data]));
            } else {
                // Send normal string-based commands
                this.socket.send(data + "\n");
            }
    
            this.consoleMessages.push(`➡️ Sent: ${data}`);
            this.onUpdate();
        } else {
            console.error("❌ Cannot send command: FluidNC WebSocket is not connected.");
        }
    };

    scheduleReconnect = () => {
        if (this.reconnectTimeout) return;
        console.log("⏳ Attempting to reconnect in 1 seconds...");
        this.reconnectTimeout = setTimeout(() => {
            this.reconnectTimeout = null;
            this.connect();
        }, 1000);
    };
}


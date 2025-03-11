import { BaseProvider } from "../BaseProvider";

export class FluidNCProvider extends BaseProvider {
    constructor(options, onUpdate, onData) {
        super(onData);
        this.options = options;
        this.onUpdate = onUpdate;
        this.onData = onData;
        this.socket = null;
        this.isConnected = false;
   
        this.connect();
    }



    connect = () => {
        if (this.socket) {
            console.warn("⚠️ Already connected to FluidNC");
            return;
        }

        console.log(`🔌 Connecting to FluidNC WebSocket: ws://${this.options.socketAddress}:81`);
        this.socket = new WebSocket(`ws://${this.options.socketAddress}:81`);

        this.socket.onopen = () => {
            this.isConnected = true;
            console.log("✅ FluidNC WebSocket connected");
            

            if (this.onUpdate) this.onUpdate();
        };

        this.socket.onmessage = async (event) => {
            if (event.data instanceof Blob) {
                // ✅ Convert Blob to text before storing it
                event.data.text().then((text) => {
                    // this.handleMessage(text);
                    this.onData(text);
                });
            } else {
                // this.handleMessage(event.data);
                this.onData(event.data);
            }
        };

        this.socket.onclose = () => {
            console.warn("🔌 FluidNC WebSocket disconnected");
            this.isConnected = false;
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


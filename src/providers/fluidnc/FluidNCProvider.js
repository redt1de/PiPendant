
export class FluidNCProvider {
    constructor(options, onUpdate) {
        this.options = options;
        this.onUpdate = onUpdate;
        this.socket = null;
        this.isConnected = false;
        this.consoleMessages = [];
        this.reconnectTimeout = null;

        this.excludedPatterns = [
            /^PING:.*/, // Ignore "PING: ..." messages
            /^CURRENT_ID:.*/,
            /^ACTIVE_ID:.*/,
            /^\$G$/     // Ignore "$G" status requests
        ];

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

    handleMessage = (message) => {
        // ✅ Check if message matches any excluded pattern
        if (this.excludedPatterns.some((regex) => regex.test(message))) {
            // console.log(`🚫 Ignoring filtered message: ${message}`);
            return; // Ignore the message
        }

        this.consoleMessages.push(`⬅️ ${message}`);
        console.log(`⬅️ FluidNC Message: ${message}`);

        if (this.onUpdate) this.onUpdate();
    };

    disconnect = () => {
        if (this.socket) {
            console.log("❌ Manually disconnecting from FluidNC");
            clearTimeout(this.reconnectTimeout);
            if (this.socket) {
                this.socket.close(); // ✅ Only close if socket is valid
                this.socket = null;
            }
            this.isConnected = false;
            if (this.onUpdate) this.onUpdate();
        } else {
            console.warn("⚠️ No active FluidNC connection to disconnect.");
        }
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

    scheduleReconnect = () => {
        if (this.reconnectTimeout) return;
        console.log("⏳ Attempting to reconnect in 5 seconds...");
        this.reconnectTimeout = setTimeout(() => {
            this.reconnectTimeout = null;
            this.connect();
        }, 5000);
    };
}


import { BaseProvider } from "../BaseProvider";

export class FluidNCProvider extends BaseProvider {
    constructor(options, onUpdate, onData) {
        super(onData);
        this.options = options;
        this.onUpdate = onUpdate;
        this.socket = null;
        this.isConnected = false;
        this.reconnectTimeout = null;

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
            this.onUpdate();
        };

        this.socket.onmessage = async (event) => {
            if (event.data instanceof Blob) {
                event.data.text().then((text) => {
                    this.onData(text);  // ✅ Pass directly to GrblController
                });
            } else {
                this.onData(event.data);
            }
        };

        this.socket.onclose = () => {
            console.warn("🔌 FluidNC WebSocket disconnected");
            this.isConnected = false;
            this.socket = null;
            this.onUpdate();
            this.scheduleReconnect();
        };

        this.socket.onerror = (error) => {
            console.error("❌ FluidNC WebSocket error:", error);
            this.socket?.close();
            this.socket = null;
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
        this.onUpdate();
    };

    send = (command) => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(command + "\n");
            this.onUpdate();
        } else {
            console.error("❌ Cannot send command: FluidNC WebSocket is not connected.");
        }
    };

    scheduleReconnect = () => {
        if (this.reconnectTimeout) return; // ✅ Prevent multiple reconnect attempts

        console.log("⏳ Attempting to reconnect in 1 second...");
        this.reconnectTimeout = setTimeout(() => {
            this.reconnectTimeout = null;
            this.connect();
        }, 1000);
    };
}

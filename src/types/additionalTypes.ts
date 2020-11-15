export enum VerbContextTypes{
    TABLE,
    HAND
}

export enum SocketConnectionStatuses {
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED',
    CONNECTING = 'CONNECTING',
}

export enum ClientConnectionStatuses {
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED',
}

export type Ratio = {
    numerator: number
    divisor: number,
}

export enum EOrientation {
    SOUTH = "SOUTH",
    NORTH = "NORTH"
}
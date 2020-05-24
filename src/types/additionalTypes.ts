export enum VerbContextTypes{
    TABLE,
    HAND
}

export enum SocketConnectionStatuses {
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED',
    CONNECTING = 'CONNECTING',
}

export enum Orientations {
    RIGHT_SIDE_UP = 'RIGHT_SIDE_UP',
    UPSIDE_DOWN = 'UPSIDE_DOWN'
}

export enum ClientConnectionStatuses {
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED',
}

export type Ratio = {
    numerator: number
    divisor: number,
}

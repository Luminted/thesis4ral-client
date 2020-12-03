export enum ETableSocketServerEvents {
    SYNC = 'SYNC',
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    ERROR = 'CUSTOM_ERROR'
}

export enum ETableSocketClientEvents {
        //built in events
        CONNECT = 'connect',
        DISCONNECT = 'disconnect',
        RECONNECT = 'reconnect',
        
        
        JOIN_TABLE = 'JOIN_TABLE',
        REJOIN_TABLE = 'REJOIN_TABLE',
        VERB = 'VERB',
        LEAVE_TABLE = 'LEAVE_TABLE',
        KICK_PLAYER = 'KICK_PLAYER',
}

export type TCustomError = {
    code: number,
    message: string
}
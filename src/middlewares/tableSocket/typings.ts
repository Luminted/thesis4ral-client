export enum ETableSocketServerEvents {
  SYNC = "SYNC",
  CONNECT = "connect",
  DISCONNECT = "disconnect",
}

export enum ETableSocketClientEvents {
  // built in events
  CONNECT = "connect",
  DISCONNECT = "disconnect",

  JOIN_TABLE = "JOIN_TABLE",
  REJOIN_TABLE = "REJOIN_TABLE",
  VERB = "VERB",
  LEAVE_TABLE = "LEAVE_TABLE",
}

export type TCustomError = {
  code: number;
  message: string;
};

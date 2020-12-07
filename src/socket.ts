import SocketIOClient from 'socket.io-client';
import { tableSocketHost, tableSocketNamespace, tableSocketPort } from "./config";

const serverURL = `http://${tableSocketHost}:${tableSocketPort}/${tableSocketNamespace}`
console.log(`connecting to ${serverURL}`);
export const tableSocket = SocketIOClient(serverURL, {
    // TODO: retry limit?
    autoConnect: false,
});
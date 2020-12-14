import SocketIOClient from "socket.io-client";
import { tableSocketHost, tableSocketNamespace, tableSocketPort } from "./config";

const serverURL = `http://${tableSocketHost}:${tableSocketPort}/${tableSocketNamespace}`;
export const tableSocket = SocketIOClient(serverURL, {
  autoConnect: false,
});

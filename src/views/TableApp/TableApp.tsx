import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClientInfo, SerializedGameState, SocketConnectionStatuses} from "../../typings";
import { ApplicationViewport } from "../../components/ApplicationViewport/ApplicationViewport";
import { setClientInfo, setGameState, socketJoinTable } from "../../actions";
import { selectTableConnectionStatus } from "../../selectors";

export const TableApp = () => {

    const dispatch = useDispatch();

    const connectionStatus = useSelector(selectTableConnectionStatus);

    useEffect(() => {
        if(connectionStatus === SocketConnectionStatuses.CONNECTED)
        dispatch(socketJoinTable((clientInfo: ClientInfo, serializedGameState: SerializedGameState) => {
            dispatch(setGameState(serializedGameState));
            dispatch(setClientInfo(clientInfo));
        }));
    }, [connectionStatus])

    return (
        <>
            {connectionStatus === SocketConnectionStatuses.CONNECTING && "CONNECTING"}
            {connectionStatus === SocketConnectionStatuses.DISCONNECTED && "DISCONNECTED"}
            {connectionStatus === SocketConnectionStatuses.CONNECTED && <ApplicationViewport />}
        </>)
} 
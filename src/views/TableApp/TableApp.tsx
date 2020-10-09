import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ClientInfo, SerializedGameState} from "../../types/dataModelDefinitions"
import { socketJoinTable } from "../../actions/socketActions";
import { ApplicationViewport } from "../../components/ApplicationViewport/ApplicationViewport";
import { setClientInfo, setGameState } from "../../actions";
import { useTypedSelector } from "../../store";
import { selectTableConnectionStatus } from "../../selectors";
import { SocketConnectionStatuses } from "../../types/additionalTypes";

export const TableApp = () => {

    const dispatch = useDispatch();

    const connectionStatus = useTypedSelector(selectTableConnectionStatus);

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
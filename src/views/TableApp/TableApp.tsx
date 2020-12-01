import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TClientInfo, TGameState, ESocketConnectionStatuses} from "../../typings";
import { ApplicationViewport } from "../../components/ApplicationViewport/ApplicationViewport";
import { setClientInfo, setGameState, socketJoinTable } from "../../actions";
import { selectTableConnectionStatus } from "../../selectors";

export const TableApp = () => {

    const dispatch = useDispatch();

    const connectionStatus = useSelector(selectTableConnectionStatus);

    useEffect(() => {
        if(connectionStatus === ESocketConnectionStatuses.CONNECTED)
        dispatch(socketJoinTable((clientInfo: TClientInfo, serializedGameState: TGameState) => {
            dispatch(setGameState(serializedGameState));
            dispatch(setClientInfo(clientInfo));
        }));
    }, [connectionStatus])

    return (
        <>
            {connectionStatus === ESocketConnectionStatuses.CONNECTING && "CONNECTING"}
            {connectionStatus === ESocketConnectionStatuses.DISCONNECTED && "DISCONNECTED"}
            {connectionStatus === ESocketConnectionStatuses.CONNECTED && <ApplicationViewport />}
        </>)
} 
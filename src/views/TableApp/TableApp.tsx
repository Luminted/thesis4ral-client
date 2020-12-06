import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TClientInfo, TGameState, ESocketConnectionStatuses} from "../../typings";
import { ApplicationViewport } from "../../components/ApplicationViewport/ApplicationViewport";
import { setClientInfo, setGameState, socketJoinTable } from "../../actions";
import { selectTableConnectionStatus } from "../../selectors";

export const TableApp = () => {

    const connectionStatus = useSelector(selectTableConnectionStatus);

    return (
        <>
            {connectionStatus === ESocketConnectionStatuses.CONNECTING && "CONNECTING"}
            {connectionStatus === ESocketConnectionStatuses.DISCONNECTED && "DISCONNECTED"}
            {connectionStatus === ESocketConnectionStatuses.CONNECTED && <ApplicationViewport />}
        </>)
} 
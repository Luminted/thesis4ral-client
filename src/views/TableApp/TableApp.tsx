import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ESocketConnectionStatuses} from "../../typings";
import { selectOwnClientInfo, selectTableConnectionStatus } from "../../selectors";
import { setClientInfo, setTableSocketStatus, socketConnect, socketRejoinTable } from "../../actions";
import { TableAppLayout } from "../../components/TableAppLayout/TableAppLayout";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { ESpinnerSize } from "../../components/LoadingSpinner/typings";
import "./styles.css"

export const TableApp = () => {

    const dispatch = useDispatch();

    const connectionStatus = useSelector(selectTableConnectionStatus);
    const clientInfo = useSelector(selectOwnClientInfo);

    useEffect(() => {
        if(connectionStatus === ESocketConnectionStatuses.CONNECTED){
            if(clientInfo){
                const {clientId} = clientInfo;
                dispatch(socketRejoinTable(clientId, err => {
                    if(err){
                        console.log("error during reconnection")
                        dispatch(setClientInfo(null));
                    }
                }));
            }
        }
    }, [connectionStatus]);

    useEffect(() => {
        if(connectionStatus === ESocketConnectionStatuses.DISCONNECTED){
            dispatch(socketConnect());
            dispatch(setTableSocketStatus(ESocketConnectionStatuses.CONNECTING));
        }
    }, [])

    return <TableAppLayout connectionStatus={connectionStatus} />
} 
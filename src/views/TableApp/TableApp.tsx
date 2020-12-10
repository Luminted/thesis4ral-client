import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ESocketConnectionStatuses} from "../../typings";
import { selectOwnClientInfo, selectTableConnectionStatus } from "../../selectors";
import { setClientInfo, setTableSocketStatus, socketConnect, socketRejoinTable } from "../../actions";
import { TableAppLayout } from "../../components/TableAppLayout/TableAppLayout";
import "./styles.css"
import { errorNotification, infoNotification, successNotification } from "../../utils/notification";
import { getRejoinErrorMessage, rejoinInfoMessage, rejoinSuccessMessag } from "../../config";

export const TableApp = () => {

    const dispatch = useDispatch();

    const connectionStatus = useSelector(selectTableConnectionStatus);
    const clientInfo = useSelector(selectOwnClientInfo);

    useEffect(() => {
        if(connectionStatus === ESocketConnectionStatuses.CONNECTED){
            if(clientInfo){
                const {clientId} = clientInfo;
                infoNotification(rejoinInfoMessage);
                dispatch(socketRejoinTable(clientId, err => {
                    if(err){
                        console.log("error during reconnection")
                        dispatch(setClientInfo(null));
                        errorNotification(getRejoinErrorMessage(err));
                        
                    }
                    else{
                        console.log('Reconnection successful')
                        successNotification(rejoinSuccessMessag);
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
import React from "react";
import cn from "classnames";
import { ESocketConnectionStatuses } from "../../typings";
import { LeaveTableButton } from "../LeaveTableButton/LeaveTableButton";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { ESpinnerSize } from "../LoadingSpinner/typings";
import { TableViewport } from "../TableViewport/TableViewport";
import "./styles.css";
import { IProps } from "./typings";
import "react-toastify/dist/ReactToastify.css"

export const TableAppLayout = ({connectionStatus, isObserver}: IProps) => (
    <div className="app-background">
        <div className={cn("app_background__observer-border", {"app_background__observer-border--hidden": !isObserver})} />
        {connectionStatus === ESocketConnectionStatuses.CONNECTING && 
            <div className="status-screen">
            <LoadingSpinner size={ESpinnerSize.LARGE}/>
            <div className="status-screen__header">
                Connecting to table
            </div>
        </div>}

        {connectionStatus === ESocketConnectionStatuses.DISCONNECTED && 
        <div className="status-screen">
            <div className="status-screen__icon">
                <i className="fas fa-plug"></i>
            </div>
            <div className="status-screen__header">
                Disconnected
            </div>
            <div className="status-screen__sub-header">
                You will be reconnected automatically
            </div>
        </div>}
        
        {connectionStatus === ESocketConnectionStatuses.CONNECTED && 
        <div className="table-app-layout">
            <div className="table-app-layout__leave-button">
                <LeaveTableButton />
            </div>
            <TableViewport/>
        </div>}
    </div>
)


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClientInfo } from "../../actions";
import { socketLeaveTable } from "../../actions/socketLeaveTable/socketLeaveTable";
import { getLeaveTableErrorMessage, leaveTableInfoMessage, leavingTableSuccessMessage } from "../../config";
import { selectOwnClientInfo } from "../../selectors";
import { errorNotification, infoNotification, successNotification } from "../../utils";
import "./styles.css"

export const LeaveTableButton = () => {
    const dispatch = useDispatch();

    const {clientId} = useSelector(selectOwnClientInfo) || {};

    const onClick = () => {
        if(clientId){
            infoNotification(leaveTableInfoMessage);
            console.log("leaving table")
            dispatch(socketLeaveTable(clientId, err =>{
                if(err){
                    errorNotification(getLeaveTableErrorMessage(err));
                }
                else{
                    dispatch(setClientInfo(null));
                    successNotification(leavingTableSuccessMessage);
                }
            }))
        }
    }

    return (
        <div className="leave-table-button">
            <button className="leave-table-button__button" onClick={onClick} disabled={!clientId}>Leave Table</button>
        </div>
    )
}
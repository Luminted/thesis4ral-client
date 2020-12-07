import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClientInfo } from "../../actions";
import { socketLeaveTable } from "../../actions/socketLeaveTable/socketLeaveTable";
import { selectOwnClientInfo } from "../../selectors";

export const LeaveTableButton = () => {
    const dispatch = useDispatch();

    const {clientId} = useSelector(selectOwnClientInfo) || {};

    const onClick = () => {
        if(clientId){
            dispatch(socketLeaveTable(clientId, err =>{
                if(err){
                    console.log("error happened while leaving table");
                }
                else{
                    dispatch(setClientInfo(null));
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
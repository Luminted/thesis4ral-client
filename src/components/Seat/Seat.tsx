import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectClientHandById } from "../../selectors";
import { Hand } from "../Hand";
import { IProps } from "./typings";
import "./style.css"
import { seatColors } from "../../config";
import { setClientInfo, socketJoinTable } from "../../actions";

export const Seat = ({seatId, isMirrored, clientId = "", orientation}: IProps) => {

    const dispatch = useDispatch();

    const clientHandDetails = useSelector(selectClientHandById(clientId));

    const onTakeSeat = () => {
        dispatch(socketJoinTable(seatId, (err, clientInfo) => {
            dispatch(setClientInfo(clientInfo));
        }))
    }

    return <div className="seat" 
    style={{
        border: `2px solid ${seatColors[seatId]}`
    }}>   
        {!clientHandDetails && <button onClick={onTakeSeat}>TAKE SEAT</button>}
        {clientHandDetails && 
            <div className="seat__hand">
                <Hand handDetails={clientHandDetails} orientation={orientation} isMirrored={isMirrored} />
            </div>}
    </div>
}
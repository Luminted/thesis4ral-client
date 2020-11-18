import React from "react";
import { useSelector } from "react-redux";
import { selectClientHandById, selectClientInfoById } from "../../selectors";
import { Hand } from "../Hand";
import { IProps } from "./typings";
import "./style.css"
import { seatColors } from "../../config";

export const Seat = ({seatId, isMirrored, clientId = "", orientation}: IProps) => {

    const clientHandDetails = useSelector(selectClientHandById(clientId));

    return <div className="seat" 
    style={{
        border: `2px solid ${seatColors[seatId]}`
    }}>   
        {clientHandDetails && 
            <div className="seat__hand">
                <Hand handDetails={clientHandDetails} orientation={orientation} isMirrored={isMirrored} />
            </div>}
    </div>
}
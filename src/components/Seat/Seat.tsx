import React from "react";
import { useSelector } from "react-redux";
import { selectClientInfoById } from "../../selectors";
import { Hand } from "../Hand";
import { IProps } from "./typings";
import "./style.css"

export const Seat = ({isMirrored, clientId = "", orientation}: IProps) => {

    const clientInfo = useSelector(selectClientInfoById(clientId));

    return <div className="seat">   
        {clientInfo && 
            <div className="seat__hand">
                <Hand orientation={orientation} clientId={clientId} isMirrored={isMirrored} />
            </div>}
    </div>
}
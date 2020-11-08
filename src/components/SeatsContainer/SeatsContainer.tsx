import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectClients } from "../../selectors";
import {seatIdMapping} from "../../config";
import {IProps} from "./typings";
import {style} from "./style";
import { Seat } from "../Seat";

export const SeatsContainer = ({orientation, isMirrored}: IProps) => {
    const clients = useSelector(selectClients);

    const seatsOnThisSide = useMemo(() => seatIdMapping.filter(seat => seat.includes(orientation)), [orientation]);

    return (
        <>
            <div style={{position: "absolute"}}>{orientation}</div>
            <div className="seats-container">
                {seatsOnThisSide.map(seat => {
                    const seatId = seatIdMapping.indexOf(seat) + 1;
                    const {clientInfo} = clients.find(client => client.clientInfo.seatId === seatId) || {};
                        return <Seat isMirrored={isMirrored} clientId={clientInfo?.clientId} key={seatId} />
                } )}
            </div>
            <style jsx={true}>{style}</style>
        </>
    )
}
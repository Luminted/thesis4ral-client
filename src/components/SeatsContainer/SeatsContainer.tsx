import React from "react";
import { useSelector } from "react-redux";
import { selectClients } from "../../selectors";
import {seatIdMapping} from "../../config";
import {IProps} from "./typings";
import {style} from "./style";
import { Seat } from "../Seat";

export const SeatsContainer = ({orientation, isMirrored}: IProps) => {
    const clients = useSelector(selectClients);

    const orientationsSeatIds = Object.keys(seatIdMapping).filter(id => {
        if(seatIdMapping[id]){
           return seatIdMapping[id].includes(orientation);
        }
    });

    return (
        <>
            <div style={{position: "absolute"}}>{orientation}</div>
            <div className="seats-container">
                {orientationsSeatIds.map( seatId => {
                    const {clientInfo} = clients.find(client => client.clientInfo.seatId === seatId) || {};
                        return <Seat isMirrored={isMirrored} orientation={orientation} clientId={clientInfo?.clientId} key={seatId} />
                } )}
            </div>
            <style jsx={true}>{style}</style>
        </>
    )
}
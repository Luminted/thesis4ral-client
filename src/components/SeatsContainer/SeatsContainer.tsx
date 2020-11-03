import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectClients } from "../../selectors";
import {seatIdMapping} from "../../config";
import { Hand } from "../Hand";
import {IProps} from "./typings";
import {style} from "./style";

export const SeatsContainer = ({orientation, isMirrored}: IProps) => {
    const clients = useSelector(selectClients);

    const clientsOnThisSide = useMemo( () => clients.filter(client => seatIdMapping[client.clientInfo.seatId].includes(orientation)), [clients]);

    return (
        <>
            <div className="seats-container">
                {clientsOnThisSide.map(client => <Hand isMirrored={isMirrored} clientId={client.clientInfo.clientId} key={client.clientInfo.clientId} />)}
            </div>
            <style jsx={true}>{style}</style>
        </>
    )
}
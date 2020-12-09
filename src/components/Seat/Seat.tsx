import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { selectClientHandById, selectIsMirrored, selectOwnClientInfo } from "../../selectors";
import { Hand } from "../Hand";
import { IProps } from "./typings";
import "./style.css"
import { seatColors } from "../../config";
import { setClientInfo, socketJoinTable } from "../../actions";
import { EOrientation } from "../../typings";

export const Seat = ({seatId, clientId = "", orientation, name}: IProps) => {

    const dispatch = useDispatch();

    const clientHandDetails = useSelector(selectClientHandById(clientId));
    const clientInfo = useSelector(selectOwnClientInfo);
    const isMirrored = useSelector(selectIsMirrored);

    const isSeatMirrored = (isMirrored && orientation === EOrientation.SOUTH) || (!isMirrored && orientation === EOrientation.NORTH);

    const onTakeSeat = () => {
        dispatch(socketJoinTable(seatId, (err, clientInfo) => {
            dispatch(setClientInfo(clientInfo));
        }))
    }

    const coloredBorderCSS: CSSProperties = {
        border: `3px solid ${seatColors[seatId]}`
    }

    return <div className={cn("seat", {"seat--mirrored": isSeatMirrored && clientInfo})}>   
        {!clientHandDetails && !clientInfo &&
            <div className="seat__empty-state" onClick={onTakeSeat}>
                Take seat
            </div>
        }
        {clientHandDetails && 
            <>
            <div className="seat__hand">
                <Hand handDetails={clientHandDetails} />
            </div>
            <div className="seat__name" style={coloredBorderCSS}>{name}</div>
            </>
        }
    </div>
}
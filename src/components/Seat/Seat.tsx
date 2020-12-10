import React, { CSSProperties, useCallback, useState } from "react";
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

    const [isNameEntryOpen, setNameEntryOpen] = useState(false);
    const [enteredName, setEnteredName] = useState("");

    const clientHandDetails = useSelector(selectClientHandById(clientId));
    const clientInfo = useSelector(selectOwnClientInfo);
    const isMirrored = useSelector(selectIsMirrored);

    const isSeatMirrored = (isMirrored && orientation === EOrientation.SOUTH) || (!isMirrored && orientation === EOrientation.NORTH);

    const onEmptySeatClick = () => setNameEntryOpen(!isNameEntryOpen);
    const onNameInputChange = ({currentTarget: {value}}) => setEnteredName(value);
    
    const onSubmit = () => {
        setNameEntryOpen(false);
        joinTable();
    }

    const joinTable = () => {
        dispatch(socketJoinTable(seatId, enteredName, (err, clientInfo) => {
            dispatch(setClientInfo(clientInfo));
        }))
    }

    const coloredBorderCSS: CSSProperties = {
        border: `3px solid ${seatColors[seatId]}`
    }

    return <div className={"seat"}>   
        {!clientHandDetails && !clientInfo &&
            <div className={cn("seat__empty-state", "seat__content")} onClick={onEmptySeatClick}>
                {isNameEntryOpen ? 
                <div className="name-input">
                        <div className="name-input__label">
                            Enter your name
                        </div>
                    <form onSubmit={onSubmit}>
                        <input 
                        autoFocus
                        value={enteredName}
                        onChange={onNameInputChange}
                        type="text"/> 
                </form>
                </div> : "Take Seat"}
            </div>
        }
        {clientHandDetails && 
            <div className={cn("seat__content", {"seat--mirrored": isSeatMirrored})}>
                <div className="seat__hand">
                    <Hand handDetails={clientHandDetails} />
                </div>
                <div className={cn("seat__name", {"seat--mirrored": isSeatMirrored})} style={coloredBorderCSS}>{name}</div>
            </div>
        }
    </div>
}
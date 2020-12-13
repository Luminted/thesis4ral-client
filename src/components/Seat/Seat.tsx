import React, { ChangeEvent, CSSProperties, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { selectClientById, selectClientHandById, selectIsMirrored, selectOwnClientInfo } from "../../selectors";
import { Hand } from "../Hand";
import { SeatDisconnectionOverlay } from "../SeatDisconnectionOverlay/SeatDisconnectionOverlay";
import { IProps } from "./typings";
import { style } from "./style";
import { getJoinErrorMessage, joinInfoMessage, joinSuccessMessage, seatColors } from "../../config";
import { setClientInfo, socketJoinTable } from "../../actions";
import { EClientConnectionStatuses, EOrientation } from "../../typings";
import { errorNotification, infoNotification, successNotification } from "../../utils";

export const Seat = ({ seatId, clientId = "", orientation, name }: IProps) => {
  const dispatch = useDispatch();

  const [isNameEntryOpen, setNameEntryOpen] = useState(false);
  const [enteredName, setEnteredName] = useState("");

  const clientHandDetails = useSelector(selectClientHandById(clientId));
  const { status } = useSelector(selectClientById(clientId)) || {};
  const isDisconnected = status === EClientConnectionStatuses.DISCONNECTED;
  const ownClientInfo = useSelector(selectOwnClientInfo);
  const isMirrored = useSelector(selectIsMirrored);

  const isSeatMirrored = (isMirrored && orientation === EOrientation.SOUTH) || (!isMirrored && orientation === EOrientation.NORTH);

  const onEmptySeatClick = () => setNameEntryOpen(!isNameEntryOpen);
  const onNameInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setEnteredName(value);

  const onSubmit = () => {
    setNameEntryOpen(false);
    joinTable();
  };

  const joinTable = () => {
    infoNotification(joinInfoMessage);
    dispatch(
      socketJoinTable(seatId, enteredName, (err, receivedClientInfo) => {
        if (err) {
          errorNotification(getJoinErrorMessage(err));
        } else {
          dispatch(setClientInfo(receivedClientInfo));
          successNotification(joinSuccessMessage);
        }
      }),
    );
  };

  const coloredBorderCSS: CSSProperties = {
    border: `1vh solid ${seatColors[seatId]}`,
  };

  return (
    <>
      <div className={"seat"}>
        {!clientHandDetails && !ownClientInfo && (
          <div className={cn("seat__empty-state", "seat__content")} onClick={onEmptySeatClick}>
            {isNameEntryOpen ? (
              <div className="name-input">
                <div className="name-input__label">Enter your name</div>
                <form onSubmit={onSubmit}>
                  <input autoFocus={true} value={enteredName} onChange={onNameInputChange} type="text" />
                </form>
              </div>
            ) : (
              "Take Seat"
            )}
          </div>
        )}
        {clientHandDetails && (
          <div
            className={cn("seat__content", {
              "seat--mirrored": isSeatMirrored,
            })}
          >
            <div className={cn("seat__hand", { "seat__hand--disconnected": isDisconnected })}>
              <Hand handDetails={clientHandDetails} />
            </div>
            <div className={cn("seat__name", { "seat--mirrored": isSeatMirrored })} style={coloredBorderCSS}>
              {name}
            </div>
          </div>
        )}
        {status === EClientConnectionStatuses.DISCONNECTED && <SeatDisconnectionOverlay clientId={clientId} isSeatMirrored={isSeatMirrored} />}
      </div>
      <style jsx={true}>{style}</style>
    </>
  );
};

import React, { useState } from "react";
import cn from "classnames";
import { IProps } from "./typings";
import { style } from "./style";
import { useDispatch } from "react-redux";
import { socketEmitLeaveTable } from "../../actions/socketEmitLeaveTable";

export const SeatDisconnectionOverlay = ({ isSeatMirrored, clientId }: IProps) => {
  const dispatch = useDispatch();

  const [showConfirmationPrompt, setShowConfirmationPrompt] = useState(false);

  const decline = () => setShowConfirmationPrompt(false);
  const openConfirmation = () => setShowConfirmationPrompt(true);
  const kickClient = () => dispatch(socketEmitLeaveTable(clientId));

  return (
    <>
      <div className={cn("seat-disconnection-overlay", "seat-disconnection-overlay__conent", { "seat-disconnection-overlay--mirrored": isSeatMirrored })}>
        <div className={cn("kick-prompt", { "seat-disconnection-overlay--mirrored": isSeatMirrored })}>
          {!showConfirmationPrompt && (
            <div className={cn("kick-button")} onClick={openConfirmation}>
              <div className="kick-button__text">Kick Player</div>
            </div>
          )}
          {showConfirmationPrompt && (
            <div>
              Are you sure?
              <div className="kick-prompt__choices">
                <div className={cn("kick-prompt__button", "kick-prompt__button--confirm")} onClick={kickClient}>
                  Yes
                </div>
                <div className={cn("kick-prompt__button", "kick-prompt__button--decline")} onClick={decline}>
                  No
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={cn({ "seat-disconnection-overlay--mirrored": isSeatMirrored })}>DISCONNECTED</div>
        <i className="fas fa-plug" />
      </div>
      <style jsx={true}>{style}</style>
    </>
  );
};

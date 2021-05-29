import { TRootState } from "../../reducers";
import { TActionTypes, setGameState, setTableSocketStatus, ESocketActionTypeKeys } from "../../actions";
import { ETableSocketClientEvents, ETableSocketServerEvents } from "./typings";
import { Middleware } from "redux";
import { ESocketConnectionStatuses, TGameState } from "../../typings";
import { tableSocket } from "../../socket";
import { infoNotification, warningNotification } from "../../utils";
import { observerInfoMessage } from "../../config";

export const tableSocketMiddleware: Middleware<{}, TRootState> = ({ dispatch, getState }) => {
  // Incoming API
  tableSocket.on(ETableSocketServerEvents.SYNC, (gameState: TGameState) => {
    dispatch(setGameState(gameState));
  });

  tableSocket.on(ETableSocketServerEvents.CONNECT, () => {
    dispatch(setTableSocketStatus(ESocketConnectionStatuses.CONNECTED));
  });

  tableSocket.on(ETableSocketServerEvents.DISCONNECT, () => {
    dispatch(setTableSocketStatus(ESocketConnectionStatuses.DISCONNECTED));
  });

  return (next) =>
    // Outgoing API
    (action: TActionTypes) => {
      const { clientInfo } = getState();

      if (action.type.startsWith("socket/")) {
        switch (action.type) {
          case ESocketActionTypeKeys.JOIN_TABLE:
            tableSocket.emit(ETableSocketClientEvents.JOIN_TABLE, action.requestedSeatId, action.name, action.ackFunction);
            break;

          case ESocketActionTypeKeys.REJOIN_TABLE:
            tableSocket.emit(ETableSocketClientEvents.REJOIN_TABLE, action.clientId, action.ackFunction);
            break;

          case ESocketActionTypeKeys.LEAVE_TABLE:
            tableSocket.emit(ETableSocketClientEvents.LEAVE_TABLE, action.clientId, action.ackFunction);
            break;

          case ESocketActionTypeKeys.VERB:
            const { verb, ackFunction } = action;
            if (clientInfo) {
              tableSocket.emit(ETableSocketClientEvents.VERB, clientInfo?.clientId, verb, (err: string, nextGameState: TGameState, handlerResult: any) => {
                if (err) {
                  warningNotification(err);
                }
                if (ackFunction) {
                  ackFunction(err, nextGameState, handlerResult);
                }
              });
            } else {
              infoNotification(observerInfoMessage);
            }
            break;

          case ESocketActionTypeKeys.CONNECT:
            tableSocket.connect();
            break;
        }
      }
      return next(action);
    };
};

import { TRootState } from "../../reducers";
import { TActionTypes, setGameState, setTableSocketStatus, ESocketActionTypeKeys } from "../../actions";
import { ETableSocketClientEvents, ETableSocketServerEvents } from "./typings";
import { Middleware } from "redux";
import { ESocketConnectionStatuses, TGameState } from "../../typings";
import { tableSocket } from "../../socket";
import { warningNotification } from "../../utils";
import { getVerbErrorMessage } from "../../config";

export const tableSocketMiddleware: Middleware<{}, TRootState> = ({ dispatch }) => {
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
            tableSocket.emit(ETableSocketClientEvents.VERB, verb, (err: string, nextGameState: TGameState, handlerResult: any) => {
              if (err) {
                warningNotification(getVerbErrorMessage(err, verb.type));
              }
              if (ackFunction) {
                ackFunction(err, nextGameState, handlerResult);
              }
            });
            break;

          case ESocketActionTypeKeys.CONNECT:
            tableSocket.connect();
            break;
        }
      }
      return next(action);
    };
};

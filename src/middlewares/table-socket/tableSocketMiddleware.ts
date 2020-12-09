import { TRootState } from "../../reducers";
import { TActionTypes, setGameState, setTableSocketStatus, ESocketActionTypeKeys } from "../../actions";
import { ETableSocketClientEvents, ETableSocketServerEvents } from "./typings";
import { Middleware } from 'redux';
import { ESocketConnectionStatuses, TGameState } from "../../typings";
import { tableSocket } from "../../socket";

export const tableSocketMiddleware: Middleware<{}, TRootState> = 
    ({dispatch}) => {

        // Incoming API
        tableSocket.on(ETableSocketServerEvents.SYNC, (gameState: TGameState) => {
            dispatch(setGameState(gameState));
        })

        tableSocket.on(ETableSocketServerEvents.CONNECT, () => {
            dispatch(setTableSocketStatus(ESocketConnectionStatuses.CONNECTED));
        })

        tableSocket.on(ETableSocketServerEvents.DISCONNECT, () => {
            dispatch(setTableSocketStatus(ESocketConnectionStatuses.DISCONNECTED));
        })

        return next => 
            // Outgoing API
            (action: TActionTypes) => {
                    if(action.type.startsWith('socket/')){
                        //TODO: more if(!tableSocket.connected) to top level
                        switch(action.type){
                            case ESocketActionTypeKeys.JOIN_TABLE:
                                if(!tableSocket.connected){
                                    console.log('emitting join: not connected')
                                }else{
                                    tableSocket.emit(ETableSocketClientEvents.JOIN_TABLE, action.requestedSeatId, action.name, action.ackFunction);
                                }
                                break;

                            case ESocketActionTypeKeys.REJOIN_TABLE:
                                tableSocket.emit(ETableSocketClientEvents.REJOIN_TABLE, action.clientId, action.ackFunction);
                                break;

                            case ESocketActionTypeKeys.LEAVE_TABLE:
                                tableSocket.emit(ETableSocketClientEvents.LEAVE_TABLE, action.clientId, action.ackFunction);
                                break;

                            case ESocketActionTypeKeys.EMIT_VERB:
                                if(!tableSocket.connected){
                                    console.log('Middleware: Socket not connected!');
                                    return next(action);
                                }
                                if(action.verb !== null){
                                    tableSocket.emit(ETableSocketClientEvents.VERB, action.verb, action.ackFunction);

                                    console.log(`Middleware: socket event emitted: type=${ETableSocketClientEvents.VERB}, verb type=${action.verb.type}`, action.verb);
                                }else{
                                    console.log('Middleware: Verb to be emitted is NULL. Aborting emit.');
                                    return next(action);
                                }
                                break;

                            case ESocketActionTypeKeys.CONNECT:
                                if(!tableSocket.connected){
                                    tableSocket.connect();
                                }else{
                                    console.log('Middleware: Socket already connected');
                                }
                                break;
                        }
                    }
                    return next(action);
                }
        }

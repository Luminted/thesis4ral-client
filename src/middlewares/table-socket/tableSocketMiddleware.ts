import { TRootState } from "../../reducers";
import { TActionTypes, setGameState, setTableSocketStatus, SocketActionTypeKeys } from "../../actions";
import { ETableSocketClientEvents, ETableSocketServerEvents, TCustomError } from "./typings";
import { Middleware } from 'redux';
import { ESocketConnectionStatuses, TGameState } from "../../typings";
import { getTableSocket } from "../../socket";

export const tableSocketMiddleware: Middleware<{}, TRootState> = 
    ({dispatch, getState}) => {

        const {clientInfo} = getState();
        const tableSocket = getTableSocket({clientId: "9d9a9ef5-f1e0-4cf7-b151-b236401136df"})

        // Incoming API
        tableSocket.on(ETableSocketServerEvents.SYNC, (gameState: TGameState) => {
            dispatch(setGameState(gameState))
            
        })

        tableSocket.on(ETableSocketServerEvents.CONNECT, () => {
            dispatch(setTableSocketStatus(ESocketConnectionStatuses.CONNECTED))
        })

        tableSocket.on(ETableSocketServerEvents.DISCONNECT, () => {
            dispatch(setTableSocketStatus(ESocketConnectionStatuses.DISCONNECTED));
        })

        tableSocket.on(ETableSocketServerEvents.ERROR, (error: TCustomError) => {
            console.log(error.message);
        })


        return next => 
            // Outgoing API
            (action: TActionTypes) => {
                    if(action.type.startsWith('socket/')){
                        //TODO: more if(!tableSocket.connected) to top level
                        switch(action.type){
                            case SocketActionTypeKeys.JOIN_TABLE:
                                if(!tableSocket.connected){
                                    console.log('emitting join: not connected')
                                }else{
                                    tableSocket.emit(ETableSocketClientEvents.JOIN_TABLE, clientInfo?.seatId, action.ackFunction);
                                }
                                break;
                            case SocketActionTypeKeys.EMIT_VERB:
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
                            case SocketActionTypeKeys.CONNECT:
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

import { RootState } from "../../store";
import { ActionTypes, setGameState, setTableSocketStatus, SocketActionTypeKeys } from "../../actions";
import { TableSocketClientEvents, TableSocketServerEvents } from "./types";
import { Middleware } from 'redux';
import { SocketConnectionStatuses, GameState } from "../../typings";

export const createTableSocketMiddleware = (socket: SocketIOClient.Socket):  Middleware<{}, RootState> => {
    return store => {
        const {dispatch} = store;

        // Incoming API
        socket.on(TableSocketServerEvents.SYNC, (gameState: GameState) => {
            dispatch(setGameState(gameState))
            
        })

        socket.on(TableSocketServerEvents.CONNECT, () => {
            console.log('connected')
            dispatch(setTableSocketStatus(SocketConnectionStatuses.CONNECTED))
        })

        socket.on('disconnect', () => {
            dispatch(setTableSocketStatus(SocketConnectionStatuses.DISCONNECTED));
        })


        return next => 
            // Outgoing API
            (action: ActionTypes) => {
                    if(action.type.startsWith('socket/')){
                        //TODO: more if(!socket.connected) to top level
                        switch(action.type){
                            case SocketActionTypeKeys.JOIN_TABLE:
                                if(!socket.connected){
                                    console.log('emitting join: not connected')
                                }else{
                                    socket.emit(TableSocketClientEvents.JOIN_TABLE, action.ackFunction);
                                }
                                break;
                            case SocketActionTypeKeys.EMIT_VERB:
                                if(!socket.connected){
                                    console.log('Middleware: Socket not connected!');
                                    return next(action);
                                }
                                if(action.verb !== null){
                                    socket.emit(TableSocketClientEvents.VERB, action.verb, action.ackFunction);

                                    console.log(`Middleware: socket event emitted: type=${TableSocketClientEvents.VERB}, verb type=${action.verb.type}`, action.verb);
                                }else{
                                    console.log('Middleware: Verb to be emitted is NULL. Aborting emit.');
                                    return next(action);
                                }
                                break;
                            case SocketActionTypeKeys.CONNECT:
                                if(!socket.connected){
                                    socket.connect();
                                }else{
                                    console.log('Middleware: Socket already connected');
                                }
                                break;
                        }
                    }
                    return next(action);
                }
        }
}

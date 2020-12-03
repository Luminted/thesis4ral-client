import { TRootState } from "../../reducers";
import { TActionTypes, setGameState, setTableSocketStatus, SocketActionTypeKeys } from "../../actions";
import { ETableSocketClientEvents, ETableSocketServerEvents, TCustomError } from "./typings";
import { Middleware } from 'redux';
import { ESocketConnectionStatuses, TGameState } from "../../typings";

export const createTableSocketMiddleware = (socket: SocketIOClient.Socket):  Middleware<{}, TRootState> => {
    return store => {
        const {dispatch} = store;

        // Incoming API
        socket.on(ETableSocketServerEvents.SYNC, (gameState: TGameState) => {
            dispatch(setGameState(gameState))
            
        })

        socket.on(ETableSocketServerEvents.CONNECT, () => {
            dispatch(setTableSocketStatus(ESocketConnectionStatuses.CONNECTED))
        })

        socket.on(ETableSocketServerEvents.DISCONNECT, () => {
            dispatch(setTableSocketStatus(ESocketConnectionStatuses.DISCONNECTED));
        })

        socket.on(ETableSocketServerEvents.ERROR, (error: TCustomError) => {
            console.log(error.message);
        })


        return next => 
            // Outgoing API
            (action: TActionTypes) => {
                    if(action.type.startsWith('socket/')){
                        //TODO: more if(!socket.connected) to top level
                        switch(action.type){
                            case SocketActionTypeKeys.JOIN_TABLE:
                                if(!socket.connected){
                                    console.log('emitting join: not connected')
                                }else{
                                    socket.emit(ETableSocketClientEvents.JOIN_TABLE, action.ackFunction);
                                }
                                break;
                            case SocketActionTypeKeys.EMIT_VERB:
                                if(!socket.connected){
                                    console.log('Middleware: Socket not connected!');
                                    return next(action);
                                }
                                if(action.verb !== null){
                                    socket.emit(ETableSocketClientEvents.VERB, action.verb, action.ackFunction);

                                    console.log(`Middleware: socket event emitted: type=${ETableSocketClientEvents.VERB}, verb type=${action.verb.type}`, action.verb);
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

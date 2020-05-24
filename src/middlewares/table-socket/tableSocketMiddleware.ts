import { RootState } from "../../store";
import { ActionTypes, setGameState } from "../../actions";
import { TableSocketClientEvents, TableSocketServerEvents } from "./types";
import { SocketActionTypeKeys } from '../../actions/socketActions';
import { GameState } from '../../types/dataModelDefinitions';
import { Middleware } from 'redux';
import { setTableSocketStatus } from "../../actions/setterActions";
import { SocketConnectionStatuses } from "../../types/additionalTypes";

export function createTableSocketMiddleware (socket: SocketIOClient.Socket):  Middleware<{}, RootState>{
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
            //TODO: test this
            dispatch(setTableSocketStatus(SocketConnectionStatuses.DISCONNECTED));
        })


        return next => 
        // Outgoing API
        (action: ActionTypes) => {
                if(action.type.startsWith('socket/')){
                    switch(action.type){
                        case SocketActionTypeKeys.GET_TABLE_DIMENSIONS:
                            socket.emit(TableSocketClientEvents.GET_TABLE_DIMENSIONS, action.ackFunction);
                            break;
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
                                console.log(`Middleware: socket event emitted: type=${TableSocketClientEvents.VERB}, verb type=${action.verb.type} position=${action.verb.positionX} ${action.verb.positionY}`  );
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
                        case SocketActionTypeKeys.DISCONNECT:
                            if(!socket.disconnected){
                                socket.disconnect();
                            }else{
                                console.log('Middleware: Socket already disconnected');
                            }
                            break;
                    }
                }
                return next(action);
            }
        }
}

import { RootState } from "../../store";
import { ActionTypes, setGameState } from "../../actions";
import { TableSocketClientEvents, TableSocketServerEvents } from "./types";
import { SocketActionTypeKeys } from '../../actions/socketActions';
import { GameState } from '../../types/dataModelDefinitions';
import { Middleware } from 'redux';

export function createTableSocketMiddleware (socket: SocketIOClient.Socket):  Middleware<{}, RootState>{
    return store => {
        const {dispatch} = store;

        socket.on(TableSocketServerEvents.SYNC, (gameState: GameState) => {
            dispatch(setGameState(gameState));
        })


        return next => 
            (action: ActionTypes) => {
                if(action.type.startsWith('socket/')){
                    switch(action.type){
                        case SocketActionTypeKeys.EMIT_VERB:
                            if(!socket.connected){
                                console.log('Middleware: Socket not connected!');
                                return next(action);
                            }
                            if(action.verb !== null){
                                socket.emit(TableSocketClientEvents.VERB, action.verb, action.ackFunction);
                                console.log(`Middleware: socket event emitted: type=${TableSocketClientEvents.VERB}, verb type=${action.verb.type}`  );
                            }else{
                                console.log('Middleware: Verb to be emitted is NULL. Aborting emit.');
                                return next(action);
                            }
                            break;
                        case SocketActionTypeKeys.CONNECT:
                            if(!socket.connected){
                                socket.open();
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

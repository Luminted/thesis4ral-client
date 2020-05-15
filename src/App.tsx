import React from 'react';
import './App.css';
import {useDispatch} from 'react-redux'

import {PlayArea} from './components/play-area/PlayArea';
import { useTypedSelector } from './store';
import { selectTableConnectionStatus, selectOwnClientInfo } from './selectors';
import { socketConnect, socketJoinTable } from './actions/socketActions';
import { SocketConnectionStatuses, Orientations } from './types/additionalTypes';
import { setGameState, setClientInfo } from './actions';
import {addMiddleware} from 'redux-dynamic-middlewares'
import { mirrorVerbPositionMiddleware } from './middlewares/';

export function App() {

    const dispatch = useDispatch();
    const connectionStatus = useTypedSelector(selectTableConnectionStatus);
    const clientInfo = useTypedSelector(selectOwnClientInfo)
    
    React.useEffect(() => {
        if(connectionStatus !== SocketConnectionStatuses.CONNECTED){
            dispatch(socketConnect());
        }
        if(connectionStatus === SocketConnectionStatuses.CONNECTED){
            dispatch(socketJoinTable((clientInfo, gameState) => {
                dispatch(setGameState(gameState));
                dispatch(setClientInfo(clientInfo));
            }));
        }
    }, [connectionStatus])


    if(clientInfo !== null && connectionStatus === SocketConnectionStatuses.CONNECTED){
        const orientation = clientInfo.seatedAt.includes('SOUTH') ? Orientations.RIGHT_SIDE_UP : Orientations.UPSIDE_DOWN
        if(orientation === Orientations.UPSIDE_DOWN){
            addMiddleware(mirrorVerbPositionMiddleware)
    }
    return (
        <div className='app'>
            <PlayArea orientation={orientation}></PlayArea>
        </div>)

    }else {
        return(
            <div>LOADING</div>
        )
    }
}

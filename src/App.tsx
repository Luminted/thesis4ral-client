import React from 'react';
import './App.css';
import io from 'socket.io-client';
import {useDispatch} from 'react-redux'


import {PlayArea} from './components/play-area/PlayArea';
import { GameState, ClientInfo } from './common/dataModelDefinitions';
import {SocketEventTypes} from './common/socketEventTypes';
import {connectToSocket, sync, setClientInfo} from './actions'

const serverURL = 'http://localhost:3001';

const App = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const socket = io(serverURL);
        dispatch(connectToSocket(socket));
        socket.on('connection_accepted', function(clientInfo: ClientInfo){
            console.log('connection accepted by the server');
            dispatch(setClientInfo(clientInfo));
        })
        socket.on(SocketEventTypes.SYNC, (gameState: GameState) => {
            dispatch(sync(gameState));
        })

        return () => {
            socket.disconnect();
        }
    }, [dispatch])

  return (
    <PlayArea></PlayArea>
  );
}

export default App;

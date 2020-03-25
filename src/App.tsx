import React from 'react';
import './App.css';
import io from 'socket.io-client';
import {useDispatch} from 'react-redux'


import {Table} from './components/Table';
import { GameState, ClientInfo } from './common/dataModelDefinitions';
import {SocketEventTypes} from './common/socketEventTypes';
import {connectToSocket, sync, setClientInfo} from './actions'

const PORT = '3001';
const HOST = '172.17.0.3';

const App = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const socket = io(`${HOST}:${PORT}`);
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
    }, [])

  return (
    <Table width={1000} height={1000}/>
  );
}

export default App;

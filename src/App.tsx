import React from 'react';
import './App.css';
import io from 'socket.io-client';
import {useDispatch} from 'react-redux'


import {PlayArea} from './components/play-table/play-area/PlayArea';
import { GameState, ClientInfo } from './types/dataModelDefinitions';
import {TableSocketClientEvents, TableSocketServerEvents} from './types/socketEventTypes';
import {connectToSocket, sync, setClientInfo} from './actions'

const serverURL = 'localhost:8080';

const App = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const socket = io(serverURL + '/table', {
            query: {
                tableId: 'dev2'
            }
        });
        socket.on(TableSocketServerEvents.CONNECT, ()=>{
            dispatch(connectToSocket(socket));
            socket.emit(TableSocketClientEvents.JOIN_TABLE, (clientInfo: ClientInfo) => {
                dispatch(setClientInfo(clientInfo));
            })
        })
        socket.on(TableSocketServerEvents.SYNC, (gameState: GameState) => {
            dispatch(sync(gameState));
        })

        return () => {
            socket.disconnect();
        }
    }, [])

  return (
      <div className='app'>
          <PlayArea></PlayArea>
      </div>
  );
}

export default App;

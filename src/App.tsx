import React from 'react';
import './App.css';
import io from 'socket.io-client';
import {useDispatch} from 'react-redux'


import {PlayArea} from './components/play-area/PlayArea';
import { GameState, ClientInfo } from './types/dataModelDefinitions';
import {TableSocketClientEvents, TableSocketServerEvents} from './types/socketEventTypes';
import {connectToSocket, syncGameState, setClientInfo} from './actions'
import { useTypedSelector } from './store';
import { selectCards } from './selectors';

const port = process.env.REACT_APP_SERVER_PORT;
const host = process.env.REACT_APP_SERVER_HOST;
const serverURL = `http://${host}:${port}`

const App = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        console.log(`connecting to ${serverURL}`)
        const socket = io(`${serverURL}/table`, {
            query: {
                tableId: process.env.NODE_ENV === 'development' ? 'dev' : 'dev'
            }
        });
        socket.on(TableSocketServerEvents.CONNECT, ()=>{
            dispatch(connectToSocket(socket));
            socket.emit(TableSocketClientEvents.JOIN_TABLE, (clientInfo: ClientInfo, gameState: GameState) => {
                dispatch(setClientInfo(clientInfo));
                dispatch(syncGameState(gameState))
            })
        })
        socket.on(TableSocketServerEvents.SYNC, (gameState: GameState) => {
            dispatch(syncGameState(gameState));
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

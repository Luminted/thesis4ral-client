import React from 'react';
import './App.css';
import SocketIOClient from 'socket.io-client';
import {useDispatch} from 'react-redux'


import {PlayArea} from './components/play-area/PlayArea';
import { GameState, ClientInfo } from './types/dataModelDefinitions';
import {setClientInfo, setGameState} from './actions'
import { useTypedSelector } from './store';
import { selectCards } from './selectors';
import { TableSocketServerEvents, TableSocketClientEvents } from './middlewares/table-socket/types';
import { socketConnect } from './actions/socketActions';

const port = process.env.REACT_APP_SERVER_PORT;
const host = process.env.REACT_APP_SERVER_HOST;
const serverURL = `http://${host}:${port}`

const App = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        console.log(`connecting to ${serverURL}`)
        SocketIOClient;
        const socket = SocketIOClient(`${serverURL}/table`, {
            query: {
                tableId: process.env.NODE_ENV === 'development' ? 'dev' : 'dev'
            }
        });
        socket.on(TableSocketServerEvents.CONNECT, ()=>{
            dispatch(socketConnect());
            socket.emit(TableSocketClientEvents.JOIN_TABLE, (clientInfo: ClientInfo, gameState: GameState) => {
                dispatch(setClientInfo(clientInfo));
                dispatch(setGameState(gameState))
            })
        })
        socket.on(TableSocketServerEvents.SYNC, (gameState: GameState) => {
            dispatch(setGameState(gameState));
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

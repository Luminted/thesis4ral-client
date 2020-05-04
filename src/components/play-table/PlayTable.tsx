import React from 'react';
import { useDispatch } from 'react-redux';
import { connectToSocket, setClientInfo, sync } from '../../actions';
import { ClientInfo, GameState } from '../../types/dataModelDefinitions';
import { TableSocketServerEvents } from '../../types/socketEventTypes';
import { PlayArea } from './play-area/PlayArea';

//TODO: change this to env
const serverURL = 'http://localhost:3001';


export function PlayTable(){
    const dispatch = useDispatch();

    React.useEffect(() => {
        const socket = io(serverURL);
        const socketNSP = io(serverURL + '/my-namespace');
        socketNSP.emit('hello');
        socketNSP.on('hello', () => console.log('connected to namespace'))
        dispatch(connectToSocket(socket));
        socket.on('connection_accepted', function(clientInfo: ClientInfo){
            console.log('connection accepted by the server');
            dispatch(setClientInfo(clientInfo));
        })
        socket.on(TableSocketServerEvents.SYNC, (gameState: GameState) => {
            dispatch(sync(gameState));
        })

        return () => {
            socket.disconnect();
        }
    }, [dispatch])

  return (
      <div className='app'>
          <PlayArea></PlayArea>
      </div>
  );
}
import SocketIO from 'socket.io';
import SocketIOClient from 'socket.io-client';
import { createTableSocketMiddleware } from './tableSocketMiddleware';
import { createMockMiddleware, MockMiddleware } from '../testutils';
import { SocketActionTypeKeys, ActionTypes, SetActionTypeKeys, setGameState } from '../../actions/';
import { TableSocketClientEvents, TableSocketServerEvents } from './types';
import { Verb } from '../../types/verbTypes';
import { SerializedGameState } from '../../types/dataModelDefinitions';
import {} from 'redux-mock-store'
import { SocketConnectionStatuses } from '../../types/additionalTypes';
import { setTableSocketStatus } from '../../actions/setterActions';

describe('Testing tableModuleMiddleware', function(){
    
    
    describe('Outgoing API', function(){
        
        const socketMock: SocketIOClient.Socket = {
            connect: jest.fn(),
            emit: jest.fn((event: string, ...data: any) => {}),
            disconnect: jest.fn(),
            on: jest.fn(),
        } as unknown as SocketIOClient.Socket // forcing casting
        const tableSocketMiddleware = createTableSocketMiddleware(socketMock);
        const mockMiddleware = createMockMiddleware<ActionTypes>(tableSocketMiddleware);


        describe(`Action: ${SocketActionTypeKeys.CONNECT}`, function(){
            it(`should call sockets connect`, function(){
                const {invoke} = mockMiddleware;
                const action: ActionTypes = {
                    type: SocketActionTypeKeys.CONNECT
                }
    
                socketMock.connected = false;
                invoke(action);
                expect(socketMock.connect).toHaveBeenCalled();
            })
        })
        describe(`Action: ${SocketActionTypeKeys.DISCONNECT}`, function(){
            it(`should call sockets disconnect`, function(){
                const {invoke} = mockMiddleware;
                const action: ActionTypes ={
                    type: SocketActionTypeKeys.DISCONNECT
                }
                invoke(action);
                expect(socketMock.disconnect).toHaveBeenCalled();
            })
        })
        describe(`Action: ${SocketActionTypeKeys.EMIT_VERB}`, function(){
            it(`should emit ${TableSocketClientEvents.VERB} event with verb and acknowledgement function of action`, function(){
                const {invoke} = mockMiddleware;
                const action: ActionTypes = {
                    type: SocketActionTypeKeys.EMIT_VERB,
                    verb: {} as Verb,
                    ackFunction: jest.fn()
                }
        
                socketMock.connected = true;
                invoke(action);
                expect(socketMock.emit).toHaveBeenCalledWith(TableSocketClientEvents.VERB, action.verb, action.ackFunction);
            })
        })

        describe(`Action: ${SocketActionTypeKeys.JOIN_TABLE} with actions acknowledgement function`, function(){
            it(`should emit ${TableSocketClientEvents.JOIN_TABLE}`, function(){
                const {invoke} = mockMiddleware;
                const action: ActionTypes = {
                    type: SocketActionTypeKeys.JOIN_TABLE,
                    ackFunction: jest.fn()
                }
        
                socketMock.connected = true;
                invoke(action);
                expect(socketMock.emit).toHaveBeenCalledWith(TableSocketClientEvents.JOIN_TABLE, action.ackFunction);
            })
        })
    })

    describe('Incoming API', function(){
        const host = 'http://localhost';
        const port = 4002;
        const uri = `${host}:${port}`;
        const namespace = '/dev'
        const socketServer = SocketIO.listen(port);
        const socketServerNamespace = socketServer.of(namespace);
        const socket = SocketIOClient(`${uri}${namespace}`, {
            autoConnect: false,
            forceNew: true,
        });
        const tableSocketMiddleware = createTableSocketMiddleware(socket);
        let mockMiddleware;
        
        beforeEach(done => {
            mockMiddleware = createMockMiddleware<ActionTypes>(tableSocketMiddleware);
            mockMiddleware.applyMiddleware();

            socketServerNamespace.once('connect', () => {
                console.log('client connected')
            })
            socket.once('connect', done);
            socket.connect();
        })

        afterEach(() =>{
            socket.disconnect();
        })

        describe(`Event: ${TableSocketServerEvents.SYNC}`, function(){
            it(`should dispatch ${SetActionTypeKeys.SET_GAME_STATE} with received gameState on ${TableSocketServerEvents.SYNC} event`, function(done){
                const {store} = mockMiddleware;
                const gameState = {
                    cards: [],
                    clients: [],
                    decks: [],
                    hands: []
                } as SerializedGameState
                socketServerNamespace.emit(TableSocketServerEvents.SYNC, gameState);
                setTimeout(() => {
                    expect(store.dispatch).toHaveBeenCalledWith(setGameState(gameState));
                    done()
                }, 100)
            })
        })

        describe(`Event: ${TableSocketServerEvents.CONNECT}`, function(){
            it(`should dispatch ${SetActionTypeKeys.SET_TABLE_CONNECTION_STATUS} action with status ${SocketConnectionStatuses.CONNECTED}`, function(done){
                const {store} = mockMiddleware;
                socket.disconnect();
                socket.connect();
                setTimeout(() => {
                    expect(store.dispatch).toHaveBeenCalledWith(setTableSocketStatus(SocketConnectionStatuses.CONNECTED));
                    done()
                }, 100)
            })
        })
    })
})
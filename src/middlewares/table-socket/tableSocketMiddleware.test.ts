import SocketIO from 'socket.io';
import SocketIOClient from 'socket.io-client';
import { createTableSocketMiddleware } from './tableSocketMiddleware';
import { createMockMiddleware } from '../testutils';
import { SocketActionTypeKeys, ActionTypes, SetterActionTypeKeys, setGameState, setTableSocketStatus } from '../../actions/';
import { TableSocketClientEvents, TableSocketServerEvents } from './types';
import { SerializedGameState, SocketConnectionStatuses, Verb} from '../../typings';

describe('Testing tableModuleMiddleware', () => {
    
    
    describe('Outgoing API', () => {
        
        const socketMock: SocketIOClient.Socket = {
            connect: jest.fn(),
            emit: jest.fn((event: string, ...data: any) => {}),
            disconnect: jest.fn(),
            on: jest.fn(),
        } as unknown as SocketIOClient.Socket // forcing casting
        const tableSocketMiddleware = createTableSocketMiddleware(socketMock);
        const mockMiddleware = createMockMiddleware<ActionTypes>(tableSocketMiddleware);


        describe(`Action: ${SocketActionTypeKeys.CONNECT}`, () => {
            it(`should call sockets connect`, () => {
                const {invoke} = mockMiddleware;
                const action: ActionTypes = {
                    type: SocketActionTypeKeys.CONNECT
                }
    
                socketMock.connected = false;
                invoke(action);
                expect(socketMock.connect).toHaveBeenCalled();
            })
        })
        describe(`Action: ${SocketActionTypeKeys.EMIT_VERB}`, () => {
            it(`should emit ${TableSocketClientEvents.VERB} event with verb and acknowledgement  o => f action`, () => {
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

        describe(`Action: ${SocketActionTypeKeys.JOIN_TABLE}`, () => {
            it(`should emit ${TableSocketClientEvents.JOIN_TABLE} event with actions ackFunction`, () => {
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

    describe('Incoming API', () => {
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

        describe(`Event: ${TableSocketServerEvents.SYNC}`, () => {
            it(`should dispatch ${SetterActionTypeKeys.SET_GAME_STATE} with received gameState on ${TableSocketServerEvents.SYNC} event`, (done) => {
                const {store} = mockMiddleware;
                const gameState = {
                    cards: [],
                    clients: [],
                    decks: [],
                    hands: [],
                    entityScale: 1
                } as SerializedGameState
                socketServerNamespace.emit(TableSocketServerEvents.SYNC, gameState);
                setTimeout(() => {
                    expect(store.dispatch).toHaveBeenCalledWith(setGameState(gameState));
                    done();
                }, 100)
            })
        })

        describe(`Event: ${TableSocketServerEvents.CONNECT}`, () => {
            it(`should dispatch ${SetterActionTypeKeys.SET_TABLE_CONNECTION_STATUS} action with status ${SocketConnectionStatuses.CONNECTED}`, (done) => {
                const {store} = mockMiddleware;
                socket.disconnect();
                socket.connect();
                setTimeout(() => {
                    expect(store.dispatch).toHaveBeenCalledWith(setTableSocketStatus(SocketConnectionStatuses.CONNECTED));
                    done();
                }, 100)
            })
        })
    })
})
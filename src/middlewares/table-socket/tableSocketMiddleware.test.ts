import SocketIO from 'socket.io';
import SocketIOClient from 'socket.io-client';
import { createTableSocketMiddleware } from './tableSocketMiddleware';
import { createMockMiddleware, MockMiddleware } from '../testutils';
import { SocketActionTypeKeys, ActionTypes } from '../../actions/';
import { TableSocketClientEvents } from './types';
import { Verb } from '../../types/verbTypes';

describe('Testing tableModuleMiddleware', function(){
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
    const mockMiddleware = createMockMiddleware<ActionTypes>(tableSocketMiddleware);

    afterEach(() => {
        socket.close();
    })

    afterAll((done) => {
        socketServer.close(done);
    })

    it('should call next', function(){
        const {invoke, next} = mockMiddleware;
        invoke({
            type: 'socket/'
        } as unknown as ActionTypes); //forcing casting
        expect(next).toHaveBeenCalled();
    })
    it(`should connect socket to given host and port on ${SocketActionTypeKeys.CONNECT}`, function(done){
        const {invoke} = mockMiddleware;
        const action: ActionTypes = {
            type: SocketActionTypeKeys.CONNECT
        }
        socket.once('connect', () => {
            expect(socket.connected).toBe(true);
            done();
        });
        invoke(action);
    })

    it(`should disconnect on ${SocketActionTypeKeys.DISCONNECT}`, function(done){
        const {invoke} = mockMiddleware;
        const action: ActionTypes ={
            type: SocketActionTypeKeys.DISCONNECT
        }
        socket.once('connect', () => {
            invoke(action);
            expect(socket.disconnected).toBe(true);
            done();
        })
        socket.connect();
    })

    it(`should emit ${TableSocketClientEvents.VERB} event with verb and acknowledgement function of action on ${SocketActionTypeKeys.EMIT_VERB}`, function(done){
        const emitSpy = jest.spyOn(socket, 'emit')
        const {invoke} = mockMiddleware;
        const action: ActionTypes = {
            type: SocketActionTypeKeys.EMIT_VERB,
            verb: {} as Verb,
            ackFunction: jest.fn()
        }

        socket.once('connect', () => {
            invoke(action);
            expect(emitSpy).toHaveBeenCalledWith(TableSocketClientEvents.VERB, action.verb, action.ackFunction);
            emitSpy.mockRestore();
            done();
        })
        socket.connect();
    })
    it('should be able to perform side effects with acknowledgement function', function(done){
        const {invoke} = mockMiddleware;
        let testCounter = 0;
        
        socketServerNamespace.once('connect', socket => {
            socket.once(TableSocketClientEvents.VERB, (verb, ackFun) => {
                ackFun();
            })
        })

        socket.once('connect', () => {
            const action: ActionTypes = {
                type: SocketActionTypeKeys.EMIT_VERB,
                verb: {} as Verb,
                ackFunction: function() {
                    testCounter++;
                    // !!Assertion is done here!!
                    expect(testCounter).toBe(1);
                    done();
                }
            }
            invoke(action);
        })

        socket.disconnect();
        socket.connect();
    })
})
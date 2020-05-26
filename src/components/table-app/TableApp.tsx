import React, { CSSProperties, useEffect, useState, useLayoutEffect } from 'react';
import {addMiddleware, resetMiddlewares} from 'redux-dynamic-middlewares'
import { useDispatch } from 'react-redux';

import { selectClients, selectTableConnectionStatus, selectOwnClientInfo, selectTableReady } from '../../selectors';
import { setTablePosition, readyTable, setVerticalScalingRatio } from '../../actions';
import { Table } from '../table/Table';
import { getElementAbsolutePosition, calculateDiagonalLength, calculateWidthByDiagonalLength, calculateHeightByDiagonalLength } from '../../utils';
import { Seats } from '../../types/dataModelDefinitions';
import { useTypedSelector } from '../../store';
import { Orientations, SocketConnectionStatuses } from '../../types/additionalTypes';
import { Seat } from '../Seat';
import { socketConnect } from '../../actions/socketActions';
import { mirrorVerbPositionMiddleware } from '../../middlewares';
import { setScalingRatios } from '../../actions/thunks';
import { setTablePixelDimensions } from '../../actions/setterActions';


type Props = {

}

const config = {
    //TODO: calculate ratio instead of hardcoding it
    tableAspectRatio: {
        divisor: 2200,
        numerator: 4100
    },
    tableScale: 60
}

const NORTHERN_SEATS_IN_ORDER = [Seats.NORTH_WEST, Seats.NORTH, Seats.NORTH_EAST]
const SOUTHERN_SEATS_IN_ORDER = [Seats.SOUTH_WEST, Seats.SOUTH, Seats.SOUTH_EAST]

export function TableApp (){

    const dispatch = useDispatch();

    const clients = useTypedSelector(selectClients);
    const connectionStatus = useTypedSelector(selectTableConnectionStatus);
    const clientInfo = useTypedSelector(selectOwnClientInfo);
    const tableReady = useTypedSelector(selectTableReady);
 
    const {tableAspectRatio, tableScale} = config;
    const {innerWidth, innerHeight} = window;
    const [tableDiagonalLength, setTableDiagonalLength] = useState<number>(calculateDiagonalLength(innerWidth, innerHeight) * (tableScale / 100));
    const tablePixelWidth = calculateWidthByDiagonalLength(tableDiagonalLength, tableAspectRatio);
    const tablePixelHeight = calculateHeightByDiagonalLength(tableDiagonalLength, tableAspectRatio);

    console.log('calculated by diagonal', tablePixelWidth,
        tablePixelHeight)

    useEffect(() => {
        if(connectionStatus !== SocketConnectionStatuses.CONNECTED){
            dispatch(socketConnect());
        }
        if(connectionStatus === SocketConnectionStatuses.CONNECTED && !tableReady){
            dispatch(readyTable(tablePixelWidth, tablePixelHeight));
        }
    }, [connectionStatus])

    useLayoutEffect(() => {
        if(tableReady){
            const tableElement = document.querySelector('.table');
            const tablePosition = getElementAbsolutePosition(tableElement);

            dispatch(setTablePosition(tablePosition.x, tablePosition.y));
            dispatch(setScalingRatios(tablePixelWidth, tablePixelHeight));
            dispatch(setTablePixelDimensions(tablePixelWidth, tablePixelHeight));

            const recalculateDiagonalLength = () => {
                const {innerWidth, innerHeight} = window;
                const resizedDiagonalLength = calculateDiagonalLength(innerWidth, innerHeight) * (tableScale / 100);
                
                setTableDiagonalLength(resizedDiagonalLength);
            }

            window.addEventListener('resize', recalculateDiagonalLength);
            return () => {
                window.removeEventListener('resize', recalculateDiagonalLength)
            }
        }
    }, [tableDiagonalLength, tableReady])

    if(tableReady){
        //TODO: maybe this could be on higher level
       

        const orientation = clientInfo!.seatedAt.includes('SOUTH') ? Orientations.RIGHT_SIDE_UP : Orientations.UPSIDE_DOWN
        if(orientation === Orientations.UPSIDE_DOWN){
            resetMiddlewares();
            addMiddleware(mirrorVerbPositionMiddleware);
            NORTHERN_SEATS_IN_ORDER.reverse();
            SOUTHERN_SEATS_IN_ORDER.reverse();
        }

        const renderedHandsNorth: JSX.Element[] = [];
        const renderedHandsSouth: JSX.Element[] = [];

        //TODO: name Directions to SeatDirections

        NORTHERN_SEATS_IN_ORDER.forEach(seat => {
            const clientIdInSeat = clients.find(client => client.clientInfo.seatedAt === seat)?.clientInfo.clientId;
            if(clientIdInSeat){
                renderedHandsNorth.push(<Seat belongsTo={clientIdInSeat} upsideDown={orientation === Orientations.RIGHT_SIDE_UP} />)
            }

        })

        SOUTHERN_SEATS_IN_ORDER.forEach(seat => {
            const clientIdInSeat = clients.find(client => client.clientInfo.seatedAt === seat)?.clientInfo.clientId;
            if(clientIdInSeat){
                renderedHandsSouth.push(<Seat belongsTo={clientIdInSeat} upsideDown={orientation === Orientations.UPSIDE_DOWN}/>)
            }
        })

        const styles: {[key: string]: CSSProperties} = {
            playArea: {
                width: '100vw',
                height: '100vh',
                backgroundColor: 'grey',
                position: 'relative'
            },
            playAreaMain:{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
            },
            handsContainer: {
                display: 'flex',
                justifyContent: 'space-between'
            }
        }

        // console.log('playarea', document.querySelector('.play-area')?.getBoundingClientRect())
        //     console.log('table width', document.querySelector('.table')?.getBoundingClientRect());

        return (
                <div className='play-area' style={styles.playArea}>
                    <div className='play-area-main' style={styles.playAreaMain}>
                        <div className='hands-container' style={styles.handsContainer}>
                            {orientation === Orientations.RIGHT_SIDE_UP ? 
                                (<>
                                    NORTH
                                {renderedHandsNorth} 
                                </>) :
                                (
                                    <>
                                    SOUTH
                                    {renderedHandsSouth}
                                    </>
                                )}
                        </div>
                        <Table upsideDown={orientation === Orientations.UPSIDE_DOWN} width={tablePixelWidth} height={tablePixelHeight} />
                        <div className='hands-container' style={styles.handsContainer}>
                            {orientation === Orientations.RIGHT_SIDE_UP ? 
                                (<>
                                    SOUTH
                                    {renderedHandsSouth} 
                                </>) :
                                (<>
                                    NORTH
                                    {renderedHandsNorth}
                                </>
                                )}
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>
                    LOADING
                </div>
            )
        }
}
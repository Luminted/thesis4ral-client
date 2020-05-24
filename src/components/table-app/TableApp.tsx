import React, { CSSProperties, useEffect, useState } from 'react';
import {addMiddleware} from 'redux-dynamic-middlewares'
import { useDispatch } from 'react-redux';

import { selectClients, selectEmptySeats, selectTableConnectionStatus, selectOwnClientInfo, selectTableReady } from '../../selectors';
import { setTablePosition, readyTable, setVerticalScalingRatio } from '../../actions';
import { Table } from '../table/Table';
import { getElementAbsolutePosition } from '../../utils';
import { Seats } from '../../types/dataModelDefinitions';
import { useTypedSelector } from '../../store';
import { Orientations, SocketConnectionStatuses } from '../../types/additionalTypes';
import { Seat } from '../Seat';
import { InteractionGutter } from './InteractionGutter';
import { socketConnect } from '../../actions/socketActions';
import { mirrorVerbPositionMiddleware } from '../../middlewares';
import { setScalingRatios } from '../../actions/thunks';


type Props = {

}

const config = {
    tableRenderWidth: 80,
    tableRenderHeight: 80,
}

const NORTHERN_SEATS_IN_ORDER = [Seats.NORTH_WEST, Seats.NORTH, Seats.NORTH_EAST]
const SOUTHERN_SEATS_IN_ORDER = [Seats.SOUTH_WEST, Seats.SOUTH, Seats.SOUTH_EAST]

export function TableApp (){

    const dispatch = useDispatch();

    const clients = useTypedSelector(selectClients);
    const freeSeats = useTypedSelector(selectEmptySeats);
    const connectionStatus = useTypedSelector(selectTableConnectionStatus);
    const clientInfo = useTypedSelector(selectOwnClientInfo);
    const tableReadt = useTypedSelector(selectTableReady);

    const [tablePixelWidth, setTablePixelWidth] = useState<number>(Math.round(window.innerWidth * (config.tableRenderWidth / 100)));
    const [tablePixelHeight, setTablePixelHeight] = useState<number>(Math.round(window.innerHeight * (config.tableRenderHeight / 100)));
    
    useEffect(() => {
        if(connectionStatus !== SocketConnectionStatuses.CONNECTED){
            dispatch(socketConnect());
        }
        if(connectionStatus === SocketConnectionStatuses.CONNECTED){
            dispatch(readyTable(tablePixelWidth, tablePixelHeight));
            //join table
            // calculate scaling ratio
            // ready table
        }
    }, [connectionStatus])

    useEffect(() => {
        const tableElement = document.querySelector('.table');
        if(tableElement){
            const tablePosition = getElementAbsolutePosition(tableElement);
            dispatch(setTablePosition(tablePosition.x, tablePosition.y));
        }
    }, [])    

    if(tableReadt){
        //TODO: maybe this could be on higher level
        window.onresize = ev => {
            const resizedTablePixelWidth = Math.round(window.innerWidth * (config.tableRenderWidth / 100));
            const resizedTablePixelHeight = Math.round(window.innerHeight * (config.tableRenderHeight / 100));
            setTablePixelWidth(resizedTablePixelWidth);
            setTablePixelHeight(resizedTablePixelHeight);
            dispatch(setScalingRatios(resizedTablePixelWidth, resizedTablePixelHeight));
        }

        const orientation = clientInfo!.seatedAt.includes('SOUTH') ? Orientations.RIGHT_SIDE_UP : Orientations.UPSIDE_DOWN
        if(orientation === Orientations.UPSIDE_DOWN){
            addMiddleware(mirrorVerbPositionMiddleware);
            NORTHERN_SEATS_IN_ORDER.reverse();
            SOUTHERN_SEATS_IN_ORDER.reverse();
        }

        const renderedHandsNorth: JSX.Element[] = [];
        const renderedHandsSouth: JSX.Element[] = [];

        //TODO: name Directions to SeatDirections

        NORTHERN_SEATS_IN_ORDER.forEach(seat => {
            if(freeSeats.includes(seat)){
                return;
            }else{
                const clientIdInSeat = clients.find(client => client.clientInfo.seatedAt === seat)?.clientInfo.clientId;
                if(clientIdInSeat){
                    renderedHandsNorth.push(<Seat belongsTo={clientIdInSeat} upsideDown={orientation === Orientations.RIGHT_SIDE_UP} />)
                }
            }
        })

        SOUTHERN_SEATS_IN_ORDER.forEach(seat => {
            if(freeSeats.includes(seat)){
                return;
            }else{
                const clientIdInSeat = clients.find(client => client.clientInfo.seatedAt === seat)?.clientInfo.clientId;
                if(clientIdInSeat){
                    renderedHandsSouth.push(<Seat belongsTo={clientIdInSeat} upsideDown={orientation === Orientations.UPSIDE_DOWN}/>)
                }
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
                    {/* <div className='play-area-main' style={styles.playAreaMain}> */}
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
                    {/* </div> */}
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
import React, { CSSProperties, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { selectHands, selectClients, selectEmptySeats } from '../../selectors';
import { setTablePosition, setTableBoundaries, setPlayareaBoundaries } from '../../actions';
import { playAreaDimensions } from '../../config/visuals';
import { Hand } from '../hand/Hand';
import { Table } from '../table/Table';
import { getElementAbsolutePosition } from '../../utils/';
import { Seats } from '../../types/dataModelDefinitions';
import config from '../../config/global'
import { useTypedSelector } from '../../store';
import { Orientations } from '../../types/additionalTypes';
import { Seat } from '../Seat';


type Props = {
    orientation: Orientations
}

const NORTHERN_SEATS_IN_ORDER = [Seats.NORTH_WEST, Seats.NORTH, Seats.NORTH_EAST]
const SOUTHERN_SEATS_IN_ORDER = [Seats.SOUTH_WEST, Seats.SOUTH, Seats.SOUTH_EAST]

export function PlayArea ({orientation}: Props){
    const dispatch = useDispatch();
    useEffect(() => {
        const {tableHeight, tableWidth, playareaHorizontalBoundaryMargin} = config
        const tableElement = document.querySelector('.table');
        if(tableElement){
            const playareaElement = document.querySelector('.play-area');
            const tablePosition = getElementAbsolutePosition(tableElement);
            const tableBoundaryBottom = tablePosition.y + tableHeight;
            const tableBoundaryRight = tablePosition.x + tableWidth;
            dispatch(setTablePosition(tablePosition.x, tablePosition.y));
            dispatch(setTableBoundaries(tablePosition.y, tableBoundaryBottom, tablePosition.x, tableBoundaryRight));
            if(playareaElement){
                const playareaBoundaryTop = 0;
                const playareaBoundaryBottom = playareaElement.clientHeight;
                const playareaBoundaryLeft = Math.round(tablePosition.x - tableWidth * (playareaHorizontalBoundaryMargin / 100));
                const playareaBoundaryRight = Math.round(tablePosition.x + tableWidth * (1 + playareaHorizontalBoundaryMargin / 100));
                dispatch(setPlayareaBoundaries(playareaBoundaryTop, playareaBoundaryBottom, playareaBoundaryLeft, playareaBoundaryRight));
            }
        }
    }, [])

    const clients = useTypedSelector(selectClients);
    const freeSeats = useTypedSelector(selectEmptySeats);

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
            width: playAreaDimensions.width,
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
                <Table upsideDown={orientation === Orientations.UPSIDE_DOWN}/>
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
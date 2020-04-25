import React, { CSSProperties, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectGrabbrdEntityOfCurrentClient, selectHands, selectClients } from '../../selectors';
import { emitSharedVerb, setTablePosition, setTableBoundaries, setPlayareaBoundaries } from '../../actions';
import { playAreaDimensions } from '../../config/visuals';
import { Hand } from '../hand/Hand';
import { Table } from '../table/Table';
import { SharedVerbTypes } from '../../types/verbTypes';
import { getElementAbsolutePosition } from '../../utils';
import { Directions } from '../../types/dataModelDefinitions';
import { useSetEntityBoundaries } from '../../effects';
import config from '../../config/global'
import { tableBoundaries } from '../../reducers';

export function PlayArea(){


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

    const clients = useSelector(selectClients);
    const clientHands = useSelector(selectHands);

    const renderedHandsNorth: JSX.Element[] = [];
    const renderedHandsSouth: JSX.Element[] = [];

    //TODO: name Directions to SeatDirections
    const handDirections = new Set([Directions.NORTH, Directions.SOUTH, Directions.NORTH_EAST, Directions.SOUTH_EAST, Directions.NORTH_WEST, Directions.SOUTH_WEST]);

    clientHands.forEach(hand => {
        const {clientId} = hand;
        const client = clients.find(c => c.clientInfo.clientId === clientId);
        if(client){
            const {seatedAt} = client.clientInfo;
            handDirections.delete(seatedAt);
            if (seatedAt === null) return false;
            if(seatedAt.includes('NORTH')){
                renderedHandsNorth.push(<Hand key={seatedAt} ownerId={hand.clientId}/>)
                return;
            }
            if(seatedAt.includes('SOUTH')){
                renderedHandsSouth.push(<Hand key={seatedAt} ownerId={hand.clientId}/>)
                return;
            }
            debugger
        }
    })
    handDirections.forEach(direction => {
        if(direction.includes('NORTH')){
            renderedHandsNorth.push(<Hand key ={direction}/>)
            return;
        }
        if(direction.includes('SOUTH')){
            renderedHandsSouth.push(<Hand key ={direction}/>)
            return;
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
        <div className='hands-container' style={styles.handsContainer}>{renderedHandsNorth}</div>
                <Table/>
        <div className='hands-container' style={styles.handsContainer}>{renderedHandsSouth}</div>
            </div>
        </div>
    )
}
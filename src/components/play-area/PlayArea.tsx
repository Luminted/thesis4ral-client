import React from 'react';

import './style.css';
import {Table} from '../Table'
import { useDispatch, useSelector } from 'react-redux';
import { selectGrabbrdEntityOfCurrentClient, selectHands, selectClients } from '../../selectors';
import { emitDerivedVerb } from '../../actions';
import { playAreaDimensions } from '../../config/visuals';
import { Hand } from '../hand/Hand';

export function PlayArea(){

    const dispatch = useDispatch();
    const grabbedEntity = useSelector(selectGrabbrdEntityOfCurrentClient);
    const clients = useSelector(selectClients);
    const clientHands = useSelector(selectHands);

    const renderedHandsNorth: JSX.Element[] = [];
    const renderedHandsSouth: JSX.Element[] = [];

     clientHands.forEach(hand => {
        const {clientId} = hand;
        const currentClient = clients.find(c => c.clientInfo.clientId === clientId);
        if(currentClient){
            const {seatedAt} = currentClient.clientInfo;
            if (seatedAt === null) return false;
            if(seatedAt.includes('NORTH')){
                renderedHandsNorth.push(<Hand belongsTo={hand.clientId}/>)
                return;
            }
            if(seatedAt.includes('SOUTH')){
                renderedHandsSouth.push(<Hand belongsTo={hand.clientId}/>)
                return;
            }
        }
        
    })

    return (
    <div className='play-area--root' style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'silver',
        width: playAreaDimensions.width,
        height: '100%'
    }}
    onMouseMove={
        ev => {
            ev.preventDefault();
            if(grabbedEntity){
                const {entityId, entityType} = grabbedEntity;
                dispatch(emitDerivedVerb(ev, entityId, entityType));
            }
        }
    }
    onMouseUp = {
        ev => {
            console.log('play area mouse up')
            ev.preventDefault();
            if(grabbedEntity){

                const {entityId, entityType} = grabbedEntity;
                dispatch(emitDerivedVerb(ev, entityId, entityType));
            }
        }
    }>
        <div className='content'
        style= {{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            <div className='hand--container'>
                {renderedHandsNorth}
            </div>
            <Table />
            <div className='hand--container'>
                {renderedHandsSouth}
            </div>
        </div>
    </div>
    )
}
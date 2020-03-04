import * as React from 'react';
import {useDispatch} from 'react-redux';

import {useTypedSelector} from '../store';
import {CardDataModel} from '../common/dataModelDefinitions'
import {Card} from './Card';
import {emitMouseInput} from '../actions';

type Props = {
    width: number,
    height: number,
}

const tableElementId = 'TableElement'

export function Table({width, height}: Props) {

    const dispatch = useDispatch();

    const cards = useTypedSelector<CardDataModel[]>((store) => store.gameState.cards);
    const clientId = useTypedSelector(store => store.clientInfo?.clientId);

    const cardRender = cards.map((card) => {
        const {entityId} = card;
        return <Card key={entityId} {...card} />
    });

    // TODO: DESTRUCT EVENT LISTENERS
    
    return (
        <div id={tableElementId}
        onMouseMove={
            ev => {
                if(clientId){
                    dispatch(emitMouseInput(ev, clientId, undefined, undefined))
                }
            }
        }
        onMouseUp={
            ev => {
                ev.preventDefault();
                if(clientId){
                    dispatch(emitMouseInput(ev, clientId, undefined, undefined))
                }
            }
        }
        onContextMenu={ev => ev.preventDefault()}
        style={{
            position: 'relative',
            width,
            height,
            backgroundColor: 'green'
        }}>
            {cardRender}
        </div>
    )
}
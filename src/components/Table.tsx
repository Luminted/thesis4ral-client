import * as React from 'react';
import {useDispatch} from 'react-redux';

import {useTypedSelector} from '../store';
import {CardDataModel} from '../common/dataModelDefinitions'
import {Card} from './Card';
import {emitVerb} from '../actions';
import { selectGrabbedEntityByClientId } from '../selectors';

type Props = {
    width: number,
    height: number,
}

const tableElementId = 'TableElement'

export function Table({width, height}: Props) {

    const dispatch = useDispatch();

    const cards = useTypedSelector<CardDataModel[]>((store) => store.gameState.cards);
    const clientId = useTypedSelector(store => store.clientInfo.clientId);
    const grabbedEntity = useTypedSelector(selectGrabbedEntityByClientId(clientId));

    const cardRender = cards.map((card) => {
        const {entityId} = card;
        return <Card key={entityId} {...card} />
    });

    // TODO: DESTRUCT EVENT LISTENERS
    
    return (
        <div id={tableElementId}
        onMouseMove={
            ev => {
                ev.preventDefault();
                if(grabbedEntity){
                    const {entityId, entityType} = grabbedEntity;
                    dispatch(emitVerb(ev, entityId, entityType));
                }
            }
        }
        onMouseUp={
            ev => {
                ev.preventDefault();
                if(grabbedEntity){
                    const {entityId, entityType} = grabbedEntity;
                    dispatch(emitVerb(ev, entityId, entityType));
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
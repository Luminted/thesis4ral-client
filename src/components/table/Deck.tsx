import React, { CSSProperties } from 'react';
import { EntityInterface } from '../entity-interface/';
import { BaseEntity } from '../../types/dataModelDefinitions';

interface Props extends BaseEntity {

}
export function Deck({entityId, height, width, scale, positionY, positionX, entityType}: Props){
    const styles: {[key: string]: CSSProperties} = {
        deckGraphics: {
            height: height * scale,
            width: width * scale,
            backgroundColor: 'red'
        }
    }

    return (
        <div className='deck'>
            <EntityInterface boundTo={'table'} entityId={entityId} entityType={entityType} positionX={positionX} positionY={positionY} height={height} width={width} scale={scale}>
                <div className='deck-graphics' style={styles.deckGraphics}>
                    DECK
                </div>
            </EntityInterface>
            {/* <button onClick={ev => dispatch(emitDeckVerb(ev.clientX, ev.clientY, DeckVerbTypes.RESET, entityId))}>RESET</button>
            <button onClick={ev => dispatch(emitSharedVerb(ev.clientX, ev.clientY, SharedVerbTypes.REMOVE, entityId, entityType))}>REMOVE</button> */}
        </div>
    )
}
import React, { CSSProperties } from 'react';
import { EntityInterface } from './EntityInterface';
import { Entity } from '../../types/dataModelDefinitions';
import {downscale} from '../../utils';
import {useTypedSelector} from '../../store';
import { selectHorizontalScalingRatio, selectVerticalScalingRatio } from '../../selectors';

interface Props extends Entity {
    drawIndex: number,
    size: number,
    upsideDown?: boolean
    scale: number
}
export function Deck({entityId, height, width, scale, positionY, positionX, entityType, drawIndex, grabbedBy, size, zIndex, upsideDown = false}: Props){
    const horizontalScalingRatio = useTypedSelector(selectHorizontalScalingRatio);
    const verticalScalingRatio = useTypedSelector(selectVerticalScalingRatio); 
    
    const styles: {[key: string]: CSSProperties} = {
        deckGraphics: {
            width: downscale(horizontalScalingRatio, width) * scale,
            height: downscale(verticalScalingRatio, height) * scale,
            backgroundColor: 'red'
        }
    }

    return (
        <div className='deck'>
            <EntityInterface upsideDown={upsideDown} grabbedBy={grabbedBy} entityId={entityId} entityType={entityType} positionX={positionX} positionY={positionY} zIndex={zIndex}>
                <div className='deck-graphics' style={styles.deckGraphics} >
                    DECK
                </div>
            </EntityInterface>
            {/* <button onClick={ev => dispatch(emitDeckVerb(ev.clientX, ev.clientY, DeckVerbTypes.RESET, entityId))}>RESET</button>
            <button onClick={ev => dispatch(emitSharedVerb(ev.clientX, ev.clientY, SharedVerbTypes.REMOVE, entityId, entityType))}>REMOVE</button> */}
        </div>
    )
}
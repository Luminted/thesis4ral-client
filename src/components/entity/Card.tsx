import React, { CSSProperties } from 'react';
import { EntityTypes, CardEntity, Entity, FrenchCardFaces } from '../../types/dataModelDefinitions';
import {EntityInterface} from './EntityInterface'
import { VerbContextTypes } from '../../types/additionalTypes';
import { useTypedSelector } from '../../store';
import { selectHorizontalScalingRatio, selectVerticalScalingRatio } from '../../selectors';
import { downscale } from '../../utils';

interface Props extends Entity {
    face: FrenchCardFaces,
    scale: number,
    upsideDown?: boolean
    inHand?: boolean
};

export function Card({entityId, height, width, scale, face, positionX, positionY, grabbedBy, zIndex, upsideDown = false, inHand = false}: Props) {
    const horizontalScalingRatio = useTypedSelector(selectHorizontalScalingRatio);
    const verticalScalingRatio = useTypedSelector(selectVerticalScalingRatio); 
    
    const styles: {[key: string]: CSSProperties} = {
        cardGraphics: {
            width: downscale(horizontalScalingRatio, width) * scale,
            height: downscale(verticalScalingRatio, height) * scale,
            background: 'blue',
            border: '1px solid black',
        }
    }

    return (
            <EntityInterface verbContext={inHand ? VerbContextTypes.HAND : VerbContextTypes.TABLE} upsideDown={upsideDown} grabbedBy={grabbedBy} entityId={entityId} entityType={EntityTypes.CARD} positionX={positionX} positionY={positionY} zIndex={zIndex}>
                <div className='card-graphics' style={styles.cardGraphics}>
                    {face}
                </div>
            </EntityInterface>
    )
}
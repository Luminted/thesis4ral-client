import React, { CSSProperties } from 'react';
import { EntityTypes, CardEntity, Entity } from '../../types/dataModelDefinitions';
import {EntityInterface} from './EntityInterface'
import { VerbContextTypes } from '../../types/additionalTypes';

interface Props extends Entity {
    face: string,
    upsideDown?: boolean
};

export function Card({entityId, height, width, scale, face, positionX, positionY, grabbedBy, zIndex, upsideDown = false}: Props) {
    const styles: {[key: string]: CSSProperties} = {
        cardGraphics: {
            height: height * scale,
            width: width * scale,
            background: 'blue',
            border: '1px solid black',
        }
    }

    return (
            <EntityInterface upsideDown={upsideDown} grabbedBy={grabbedBy} entityId={entityId} entityType={EntityTypes.CARD} positionX={positionX} positionY={positionY} verbContext={VerbContextTypes.TABLE} zIndex={zIndex}>
                <div className='card-graphics' style={styles.cardGraphics}>
                    {face}
                </div>
            </EntityInterface>
    )
}
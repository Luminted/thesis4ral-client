import React, { CSSProperties } from 'react';
import { EntityTypes, BaseEntity } from '../../../types/dataModelDefinitions';
import { EntityInterface } from '../entity-interface';
import { VerbContextTypes } from '../../../types/additionalTypes';

interface Props extends BaseEntity {
    face: string
}

const cardDim = {
    x: 63,
    y: 88
}


export function HandCard({entityId, face, positionX, positionY}: Props) {
    const styles: {[key: string]: CSSProperties} = {
        handCard:{
            position: 'absolute',
            left: positionX,
            top: positionY,
        },
        handCardGraphics: {
            height: cardDim.y,
            width: cardDim.x,
            background: 'blue',
            border: '1px solid black'
        }
    }


    return (
            <EntityInterface entityId={entityId} entityType={EntityTypes.CARD} positionX={positionX} positionY={positionY} height={cardDim.y} width={cardDim.x} scale={1} verbContext={VerbContextTypes.HAND}>
                <div className='hand-card-graphics' style={styles.handCardGraphics}>
                    {face}
                </div>
            </EntityInterface>
    )
}
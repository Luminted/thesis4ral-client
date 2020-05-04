import React, { CSSProperties } from 'react';
import { EntityTypes, BaseEntity } from '../../../types/dataModelDefinitions';
import {EntityInterface} from '../entity-interface';

interface Props extends BaseEntity {
    face: string
};

export function Card({entityId, height, width, scale, face, positionX, positionY}: Props) {
    const styles: {[key: string]: CSSProperties} = {
        cardGraphics: {
            background: 'blue',
            border: '1px solid black',
            pointerEvents: 'none'
        }
    }


    return (
        <EntityInterface entityId={entityId} entityType={EntityTypes.CARD} positionX={positionX} positionY={positionY} height={height} scale={scale} width={width}>
            <div className='card-graphics' style={styles.cardGraphics}>
                {face}
            </div>
        </EntityInterface>
    )
}
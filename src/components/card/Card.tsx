import React, { CSSProperties } from 'react';
import { EntityTypes, BaseEntity } from '../../types/dataModelDefinitions';
import {EntityInterface} from '../entity-interface'
import { VerbContextTypes } from '../../types/additionalTypes';

interface Props extends BaseEntity {
    face: string
};

export function Card({entityId, height, width, scale, face, positionX, positionY}: Props) {
    const styles: {[key: string]: CSSProperties} = {
        cardGraphics: {
            height: height * scale,
            width: width * scale,
            background: 'blue',
            border: '1px solid black'
        }
    }

    return (
            <EntityInterface boundTo={'playarea'} entityId={entityId} entityType={EntityTypes.CARD} positionX={positionX} positionY={positionY} height={height} width={width} scale={scale} verbContext={VerbContextTypes.TABLE}>
                <div className='card-graphics' style={styles.cardGraphics}>
                    {face}
                </div>
            </EntityInterface>
    )
}
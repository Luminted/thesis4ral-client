import * as React from 'react';

const cardDim = {
    x: 63,
    y: 88
}

type Props = {
    width?: number,
    height?: number,
    positionX: number,
    positionY: number,
    scale?: number
}

export function Card({height = cardDim.y ,width = cardDim.x, scale = 1, positionX, positionY}:Props) {
    return (
        <div style={{
            position: 'absolute',
            left: positionX,
            top: positionY,
            backgroundColor: 'blue',
            width: width * scale,
            height: height * scale
        }}>

        </div>
    )
}
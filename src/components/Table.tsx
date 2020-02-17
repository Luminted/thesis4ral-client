import * as React from 'react';
import {useTypedSelector} from '../store';
import {CardDataModel} from '../dataModelTypedefinitions'
import {Card} from './Card';

type Props = {
    width: number,
    height: number
}

export function Table({width, height}: Props) {

    const cards = useTypedSelector<CardDataModel[]>((store) => store.cards);
    const cardRender = cards.map((card) => {
        // const {height, positionX, positionY, width} = card;
        return <Card {...card} />
    });
    
    return (
        <div style={{
            position: 'relative',
            width,
            height,
            backgroundColor: 'green'
        }}>;
            {cardRender}
        </div>
    )
}
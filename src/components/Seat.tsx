import React from 'react';
import { useTypedSelector } from '../store';
import { selectClientInfoById } from '../selectors';
import { Hand } from './hand';

type Props = {
    upsideDown: boolean
    belongsTo: string
}

export function Seat({belongsTo, upsideDown}: Props){
    const clientInfo = useTypedSelector(selectClientInfoById(belongsTo));

    if(clientInfo !== null){
        return(
            <div className='hand-container'>
                <Hand belongsTo={belongsTo} upsideDown={upsideDown} />
            </div>
        )
    }else{
        return (
            <div>
                CLIENT INFO IS NULL
            </div>
        )
    }
}
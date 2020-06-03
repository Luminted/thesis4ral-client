import React, { CSSProperties } from 'react'
import { useTypedSelector } from '../store';
import { selectClientInfoById } from '../selectors';
import { Hand } from './hand';
import { MaybeNull } from '../types/genericTypes';

type Props = {
    upsideDown: boolean,
    empty: boolean,
    belongsTo?: MaybeNull<string>
}

export function Seat({belongsTo = null, upsideDown, empty}: Props){

    const clientInfo = useTypedSelector(selectClientInfoById(belongsTo));

    const styles:{[key: string]: CSSProperties} = {
        seat: {
            backgroundColor: 'purple',
            height: '100%',
            width: '33%'
        }
    }

    if(!empty && !!belongsTo && clientInfo !== null){
        return(
            <div className='seat' style={styles.seat}>
                <Hand belongsTo={belongsTo} upsideDown={upsideDown} />
            </div>
        )
    }else{
        return (
            <div className='seat' style={styles.seat}>
                EMPTY SEAT
            </div>
        )
    }
}
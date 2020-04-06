import React from 'react';
import {DeckEntity} from '../common/dataModelDefinitions'
import { emitDerivedVerb, emitDeckVerb, emitSharedVerb } from '../actions';
import { SharedVerbTypes, DeckVerbTypes } from '../common/verbTypes';
import { useDispatch } from 'react-redux';

type Props = DeckEntity;

export function Deck({positionX, positionY, height, width, entityId, entityType, scale}: Props) {
    const dispatch = useDispatch();

    return (
        <div className='deck' style={{
            display: 'flex',
            flexDirection: 'row',
            position: "absolute",
            left: positionX,
            top: positionY,
        }}>
            {/* GRAPHIC */}
            <div style={{
                backgroundColor: 'red',
                height: height * scale,
                width: width * scale,
            }}
            onMouseUp={
                (ev) => {dispatch(emitDerivedVerb(ev, entityId, entityType))}
            }
            onMouseDown={
                (ev) => dispatch(emitDerivedVerb(ev, entityId, entityType))
            }
            >Deck</div>
            {/* HANDLE */}
            <div className='handle' 
                style={{
                    border: '2px solid black',
                    marginTop: '2px',
                    backgroundColor: 'red',
                    width: 15,
                    height: 15,
                    cursor: 'grab'
                }}
                onMouseDown={ev => {
                    dispatch(emitSharedVerb(ev.clientX, ev.clientY, SharedVerbTypes.GRAB_FROM_TABLE, entityId, entityType))}
                }
            >
            </div>
            {/* RESET BUTTON */}
            <button onMouseUp={ev => dispatch(emitDeckVerb(ev.clientX, ev.clientY, DeckVerbTypes.RESET, entityId))}>RESET</button>
            {/* REMOVE BUTTON */}
            <button onMouseUp={ev => dispatch(emitSharedVerb(ev.clientX, ev.clientY, SharedVerbTypes.REMOVE, entityId, entityType))}>REMOVE</button>
        </div>
    )
}
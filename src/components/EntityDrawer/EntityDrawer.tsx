import React from "react";
import { useDispatch } from "react-redux";
import { emitAddDeckVerb } from "../../actions";
import {french52Sorted} from "../../entities";
import "./style.css";

export const EntityDrawer = () => {
    const dispatch = useDispatch();

    return <div className="entity-drawer">
        <button onClick={
            () => dispatch(emitAddDeckVerb(french52Sorted, {
                name: "rcb",
                type: "french"
            }, 0, 0, 0))
        }>Add Deck</button>
    </div>

}
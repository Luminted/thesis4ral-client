import css from "styled-jsx/css";
import {colors} from "../../config";

const {deckSide} = colors;

export const styles = css`
.menu_button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3vh;
    height: 3vh;
    border: 1px solid black;
    border-radius: 1vh;
    background: white;
    margin-bottom: 10%;
    cursor: pointer;
}

:global(.deck-entity-illusion) {
    border-bottom: 0.5vh solid ${deckSide};
    border-right: 0.5vh solid ${deckSide};
    border-radius: 0.5vh;
    box-shadow: 2px 2px 2px black;
    background: ${deckSide};
}`
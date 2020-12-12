import css from "styled-jsx/css";
import {colors} from "../../config";

const {deckSide, buttonBackground, buttonBackgroundHighlight, buttonBackgroundActive} = colors;

export const styles = css`
.menu-button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3vh;
    height: 3vh;
    border: 1px solid black;
    border-radius: 1vh;
    background-color: ${buttonBackground};
    margin-bottom: 10%;
    cursor: pointer;
    font-size: 2vh;
}
.menu-button:hover{
    background-color: ${buttonBackgroundHighlight};
}
.menu-button:active{
    background-color: ${buttonBackgroundActive} !important;
}
:global(.deck-entity-illusion) {
    border-bottom: 0.5vh solid ${deckSide};
    border-right: 0.5vh solid ${deckSide};
    border-radius: 0.5vh;
    box-shadow: 2px 2px 2px black;
    background: ${deckSide};
}`
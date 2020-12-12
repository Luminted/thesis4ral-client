import css from "styled-jsx/css";
import {colors} from "../../config";

const {deckSide} = colors;

export const style = css`
.entity-tray-deck{
    display: inline-block;
    position: relative;
}
.entity-tray-deck:hover{
    box-shadow: 0 0 1vh white;
}
.entity-tray-deck__preview{
    position: absolute;
    transform-origin: center;
    transform: rotate(20deg) scale(0.85);
    height: 100%;
    width: 100%;
    pointer-events: none;
}
:global(.entity-tray-tray-deck-illusion){
    border-bottom: 0.5vh solid ${deckSide};
    border-right: 0.5vh solid ${deckSide};
    border-radius: 0.5vh;
    box-shadow: 2px 2px 2px black;
    background: ${deckSide};
}
:global(.entity-tray-tray-deck-illusion:hover){
    box-shadow: 2px 2px 2px 5px white;
}`
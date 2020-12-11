import css from "styled-jsx/css";
import {colors} from "../../config";

const {deckSide} = colors;

export const style = css`
.entity-tray{
    width: 100%;
    height: 100%;
}
.entity-tray__content{
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: bisque;
}

.entity-tray__segment {
    padding: 5%;
    flex-grow: 1;
}
.remove-entity-zone{
    width: 100%;
    height: 100%;
    border: 1px dashed black;
    display: flex;
    justify-content: center;
    align-items: center;
}
:global(.entity-tray__entity){
    display: inline-block;
    padding: 1vh;
}
.entity-tray__tray{
    margin: 0 10px 10px 0;
    display: inline-block;
}`
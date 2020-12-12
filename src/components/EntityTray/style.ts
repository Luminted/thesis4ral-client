import css from "styled-jsx/css";
import {colors} from "../../config";

const { tableTrayBackground, removeEntityBackground, removeEntityBackgroundHighlight} = colors;

export const style = css`
.entity-tray{
    width: 100%;
    height: 100%;
    border: 2px inset;
    box-sizing: border-box;
}
.entity-tray__content{
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: ${tableTrayBackground};
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
    background-color: ${removeEntityBackground};
    justify-content: center;
    align-items: center;
}
.remove-entity-zone:hover{
    background-color: ${removeEntityBackgroundHighlight}
}
:global(.entity-tray__entity){
    display: inline-block;
    padding: 1vh;
}
.entity-tray__tray{
    margin: 0 10px 10px 0;
    display: inline-block;
}
.remove-entity-zone__icon{
    font-size: 5vh;
}`
import css from "styled-jsx/css";
import {colors} from "../../config";

const {ownHand, opponentHand, ownHandHovered} = colors;

export const style = css`
.hand {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 0.5vh;
    box-shadow: 0 0 8px 1px black;
}
.hand--own-hand{
    box-sizing: border-box;
    background: ${ownHand};
    box-sizing: border-box;
    border: gray ridge 2px;
}
.hand--own-hand:hover{
    background: ${ownHandHovered};
    border: gray ridge 2px;
}
.hand--partner-hand{
    background: ${opponentHand};
}`
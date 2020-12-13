import css from "styled-jsx/css";
import {colors} from "../../config";

const {interfaceBackground} = colors;

export const style = css`
.help-icon{
    font-size: 4vh;
}
.help-icon i{
    cursor: pointer;
}
.help-icon i:active{
    color: ${interfaceBackground};
}

.help{
    display:flex;
    justify-content: center;
    align-items: center;
    
    position: absolute;
    width: 100vw;
    height: 100vh;
    transform: translate(0, -10%)
}
.help__panel{
    overflow-x: scroll;
    width: 60vw;
    height: 30vh;
    padding: 5%;
    background: ${interfaceBackground};
    border-radius: 2vh;
    font-weight: 500;
}
.help__title{
    text-align: center;
}
.help__close{
    position: absolute;
    left: 80%;
    top: 30%;
    cursor: pointer;
}`
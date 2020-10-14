import css from "styled-jsx/css";
import {tableHeightPercentage} from "../../config"

export const style = css`
    .seats-container {
        width: 85%;
        height: ${(100 - tableHeightPercentage) / 2}vh;
        margin: auto;
    }
`
import css from "styled-jsx/css";
import {tableHeightPercentage, aspectRatio} from "../../config"

export const style = css`
    .card-table{
        position: absolute;
        background-color: green;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: ${tableHeightPercentage}vh;
        width: calc(${tableHeightPercentage}vh * ${aspectRatio.numerator / aspectRatio.divisor})
    }`
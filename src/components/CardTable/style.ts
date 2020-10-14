import css from "styled-jsx/css";
import {tableHeightPercentage, tableAspectRatio} from "../../config"

export const style = css`
    .card-table{
        position: relative;
        background-color: green;
        height: ${tableHeightPercentage}vh;
        width: ${tableHeightPercentage * (tableAspectRatio.numerator / tableAspectRatio.divisor)}vh;
    }`
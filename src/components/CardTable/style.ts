import css from "styled-jsx/css";
import {tableHeightPercentage, tableAspectRatio, drawerHandleWidth} from "../../config"

const tableWidth = tableHeightPercentage * (tableAspectRatio.numerator / tableAspectRatio.divisor);

export const style = css`
    .card-table{
    position: relative;
    height: ${tableHeightPercentage}vh;
    width: ${tableWidth}vh;
    }
    .card-table__table{
        position: relative;
        background-color: green;
        height: 100%;
        width: 100%;
    }
    .card-table__drawer{
        position: absolute;
        height: 100%;
        width: ${tableWidth * 0.15}vh;
        translate: -${drawerHandleWidth}%;
        transition: all 0.2s;
    }
    .card-table__drawer--open{
        translate: -100%;
    }`
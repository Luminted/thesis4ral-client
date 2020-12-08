import css from "styled-jsx/css";
import {tableHeightPercentage, tableAspectRatio, trayWidthPercentage} from "../../config"

const tableWidth = tableHeightPercentage * (tableAspectRatio.numerator / tableAspectRatio.divisor);

export const style = css`
    .card-table{
        position: relative;
        height: ${tableHeightPercentage}vh;
        width: ${tableWidth}vh;
        z-index: 2;
    }
    .card-table__table{
        position: relative;
        background-color: green;
        height: 100%;
        width: 100%;
    }
    .card-table__tray{
        position: absolute;
        height: 100%;
        width: ${trayWidthPercentage}%;
        transform: translate(-100%);
    }
    .card-table--mirrored{
        transform: rotate(180deg);
    }`
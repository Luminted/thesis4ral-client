import css from "styled-jsx/css";
import {tableHeightPercentage, tableAspectRatio, trayWidthPercentage, tableRimWidth, trayRimWidth, borderRadius} from "../../config"

const tableWidth = tableHeightPercentage * (tableAspectRatio.numerator / tableAspectRatio.divisor);

export const style = css`
    .card-table{
        position: relative;
        height: ${tableHeightPercentage}vh;
        width: ${tableWidth}vh;
        z-index: 999;
    }
    .card-table__table{
        position: relative;
        background-color: green;
        height: 100%;
        width: 100%;
    }
    .card-table__table-border{
        border-top: solid darkgreen ${tableRimWidth}vh;
        border-bottom: solid darkgreen ${tableRimWidth}vh;
        border-right: solid darkgreen ${tableRimWidth}vh;
        height: 100%;
        box-sizing: border-box;
        border-radius: ${borderRadius}vh;
    }
    .card-table__tray{
        position: absolute;
        height: calc(100% - ${2 * tableRimWidth}vh);
        width: ${trayWidthPercentage}%;
        transform: translate(-100%, ${tableRimWidth - trayRimWidth}vh);
        border-left: ${trayRimWidth}vh solid black;
        border-top: ${trayRimWidth}vh solid black;
        border-bottom: ${trayRimWidth}vh solid black;
        border-radius: ${borderRadius}vh 0 0 ${borderRadius}vh;

    }
    .card-table--mirrored{
        transform: rotate(180deg);
    }`
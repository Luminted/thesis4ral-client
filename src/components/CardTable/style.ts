import css from "styled-jsx/css";
import {tableHeightPercentage, tableAspectRatio, trayWidthPercentage, tableRimWidth, trayRimWidth, borderRadius, colors} from "../../config"

const {tableBackground, tableRim} = colors;
const tableWidth = tableHeightPercentage * (tableAspectRatio.numerator / tableAspectRatio.divisor);

export const style = css`
    .card-table{
        position: relative;
        height: ${tableHeightPercentage}vh;
        width: ${tableWidth}vh;
    }
    .card-table__table{
        position: relative;
        background-color: ${tableBackground};
        height: 100%;
        width: 100%;
        border: 2px inset;
        box-sizing: border-box;
    }
    .card-table__table-border{
        border-top: solid ${tableRim} ${tableRimWidth}vh;
        border-bottom: solid ${tableRim} ${tableRimWidth}vh;
        border-right: solid ${tableRim} ${tableRimWidth}vh;
        height: 100%;
        box-sizing: border-box;
        border-radius: ${borderRadius}vh;
    }
    .card-table__tray{
        position: absolute;
        height: calc(100% - ${2 * tableRimWidth}vh);
        width: ${trayWidthPercentage}%;
        transform: translate(-100%, ${tableRimWidth - trayRimWidth}vh);
        border-left: ${trayRimWidth}vh solid ${tableRim};
        border-top: ${trayRimWidth}vh solid ${tableRim};
        border-bottom: ${trayRimWidth}vh solid ${tableRim};
        border-radius: ${borderRadius}vh 0 0 ${borderRadius}vh;

    }
    .card-table--mirrored{
        transform: rotate(180deg);
    }`
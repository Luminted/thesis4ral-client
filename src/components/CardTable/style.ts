import css from "styled-jsx/css";
import { tableHeightPercentage, tableAspectRatio, trayWidthPercentage, tableRimWidth, trayRimWidth, borderRadius, colors } from "../../config";

const { tableBackground, tableRimShort, tableRimLong, shadow } = colors;
const tableWidth = tableHeightPercentage * (tableAspectRatio.numerator / tableAspectRatio.divisor);

export const style = css`
  .card-table {
    position: relative;
    height: ${tableHeightPercentage}vh;
    width: ${tableWidth}vh;
  }
  .card-table__table {
    position: relative;
    background-color: ${tableBackground};
    height: 100%;
    width: 100%;
    border: 2px inset;
    box-sizing: border-box;
  }
  .card-table__table-border {
    border-top: solid ${tableRimLong} ${tableRimWidth}vh;
    border-bottom: solid ${tableRimLong} ${tableRimWidth}vh;
    border-right: solid ${tableRimShort} ${tableRimWidth}vh;
    height: 100%;
    box-sizing: border-box;
    border-radius: ${borderRadius}vh;
    box-shadow: 2vh 2vh 1vh 0.5vh ${shadow};
  }
  .card-table__tray {
    position: absolute;
    height: calc(100% - ${2 * tableRimWidth}vh);
    width: ${trayWidthPercentage}%;
    transform: translate(-100%, ${tableRimWidth - trayRimWidth}vh);
    border-left: ${trayRimWidth}vh solid ${tableRimShort};
    border-top: ${trayRimWidth}vh solid ${tableRimLong};
    border-bottom: ${trayRimWidth}vh solid ${tableRimLong};
    border-radius: ${borderRadius}vh 0 0 ${borderRadius}vh;
    box-shadow: 2vh 2vh 1vh 0.5vh ${shadow};
    z-index: -1;
  }
  .card-table--mirrored {
    transform: rotate(180deg);
  }
`;

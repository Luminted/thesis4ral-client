import css from "styled-jsx/css";
import { colors } from "../../config";

const { background, info } = colors;

export const style = css`
  .table-app-layout {
    position: relative;
    overflow: hidden;
    color: white;
  }
  .table-app-layout__leave-button {
    position: absolute;
    z-index: 1;
  }
  .app-background {
    position: absolute;
    height: 100vh;
    width: 100vw;
    box-sizing: content-box;
    overflow: hidden;
    background-color: ${background};
    z-index: -1;
  }
  .app_background__observer-border {
    position: absolute;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    border: ${info} 1.5vh solid;
    border-radius: 2vh;
    box-sizing: border-box;
  }
  .app_background__observer-border--hidden {
    display: none;
  }
  .status-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }
  .status-screen__icon {
    font-size: 10vh;
  }

  .status-screen__header {
    font-size: 5vh;
    font-weight: 700;
    padding-top: 3%;
  }
  .status-screen__sub-header {
    font-size: 3vh;
    font-weight: 600;
    padding-top: 1%;
  }
`;

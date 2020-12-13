import css from "styled-jsx/css";
import { colors } from "../../config";

const { text, alert, alertDepressed, interfaceBackgroundLight, interfaceBackgroundDark, interfaceBackground } = colors;

export const style = css`
  .seat-disconnection-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .seat-disconnection-overlay__conent {
    text-align: center;
    color: ${alert};
    font-size: 3vh;
    font-weight: 600;
    text-shadow: 0 0 1vh black;
  }
  .seat-disconnection-overlay--mirrored {
    transform: rotate(180deg);
  }
  .kick-prompt {
    margin: 5% 0 2% 0;
    height: 20%;
    font-size: 2.5vh;
    padding: 1vh;
  }
  .kick-prompt__button {
    display: inline-block;
    border-radius: 1vh;
    font-weight: 500;
    font-size: 2vh;
    cursor: pointer;
  }
  .kick-prompt__button--confirm {
    border: 0.5vh solid ${alert};
    color: ${text};
    background: ${alert};
  }
  .kick-prompt__button--confirm:active {
    border: 0.5vh solid ${alertDepressed};
    background: ${alertDepressed};
  }
  .kick-prompt__button--decline {
    border: 0.5vh solid ${interfaceBackgroundLight};
    color: ${text};
  }
  .kick-prompt__button--decline:hover {
    background: ${interfaceBackground};
  }
  .kick-prompt__button--decline:active {
    background: ${interfaceBackgroundDark};
  }
  .kick-prompt__choices {
    padding: 0.3vh;
  }
  .kick-prompt__choices .kick-prompt__button:first-child {
    margin-right: 1.5vh;
  }
  .kick-button {
    display: inline-block;
    position: relative;
    border: ${alert} 0.7vh solid;
    border-radius: 2vh;
    width: 50%;
    height: 100%;
    color: ${alert};
    font-size: 2vh;
    font-weight: 800;
    cursor: pointer;
  }
  .kick-button:hover {
    color: ${text};
    background: ${alert};
  }
  .kick-button:active {
    background: ${alertDepressed};
    border: ${alertDepressed} 0.7vh solid;
  }
  .kick-button__text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-shadow: 0 0 1vh black;
  }
`;

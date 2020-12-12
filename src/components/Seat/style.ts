import css from "styled-jsx/css";
import { colors } from "../../config";

const { backgroundPattern, buttonBackground, buttonBackgroundHighlight } = colors;

export const style = css`
  .seat {
    position: relative;
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .seat--mirrored {
    transform: rotate(180deg);
  }
  .seat__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .seat__empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10%;
    background: ${buttonBackground};
    border: 1px black dashed;
    cursor: pointer;
    font-size: 2vh;
    font-weight: 600;
  }
  .seat__empty-state:hover {
    background: ${buttonBackgroundHighlight};
    border: 1px black solid;
  }
  .seat__hand {
    height: 60%;
    width: 85%;
    margin-top: 2%;
  }
  .seat__name {
    text-align: center;
    background-color: ${backgroundPattern};
    width: fit-content;
    padding: 5%;
    margin-top: 2%;
    border-radius: 2.5vh;
    font-size: 1.5vh;
    font-weight: bold;
  }
  .name-input {
    text-align: center;
  }
  .name-input__label {
    font-size: 2vh;
    font-weight: 500;
    margin-bottom: 5%;
  }
`;

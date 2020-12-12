import css from "styled-jsx/css";
import { colors } from "../../config";

const { alert } = colors;

export const style = css`
  .leave-table-button {
    padding: 2vh;
  }
  .leave-table-button__button {
    height: 5vh;
    font-size: 2vh;
    font-weight: 700;
    border-radius: 2vh;
    background-color: ${alert};
    color: inherit;
  }
  .leave-table-button--hidden {
    display: none;
  }
`;

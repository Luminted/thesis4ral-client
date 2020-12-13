import css from "styled-jsx/css";
import { colors } from "../../config";

const { shadow } = colors;

export const style = css`
  .hand-card {
    position: absolute;
    transition: 0.05s;
    transition-timing-function: ease-in;
  }

  :global(.hand-card__entity-core) {
    border: 2px solid black;
    border-radius: 0.5vh;
    box-shadow: 1vh 1vh 5px ${shadow};
    box-sizing: border-box;
  }

  .hand-card.hand-card--feedback:hover {
    z-index: 99 !important;
  }
`;

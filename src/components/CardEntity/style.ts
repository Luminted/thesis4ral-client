import css from "styled-jsx/css";
import { colors } from "../../config";

const { shadow } = colors;

export const style = css`
  :global(.card-entity) {
    border: 0.5vh solid black;
    border-radius: 0.5vh;
  }
  :global(.card-entity__mouse-highlight) {
    transition-duration: 50ms;
  }

  :global(.card-entity__mouse-highlight:hover) {
    transform: scale(1.05);
    box-shadow: 0 0 10px ${shadow};
  }

  :global(.card-entity__mouse-highlight:active) {
    transform: scale(1);
    box-shadow: none;
  }

  :global(.card-entity__drag-highlight) {
    transform: scale(1.07);
  }
`;

import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { selectIsMirrored, selectTablePixelDimensions, selectTablePosition } from "../../selectors";
import { IProps } from "./typings";
import "./styles.css";

export const EntityRenderLayer = ({ children }: IProps) => {
  const { x, y } = useSelector(selectTablePosition);
  const { height, width } = useSelector(selectTablePixelDimensions);
  const isMirrored = useSelector(selectIsMirrored);

  const elementRef = useRef(document.createElement("div"));
  const { current: element } = elementRef;
  element.classList.add("entity-render-layer");
  element.style.top = `${y + (isMirrored ? height : 0)}px`;
  element.style.left = `${x + (isMirrored ? width : 0)}px`;

  useEffect(() => {
    if (isMirrored) {
      element.classList.add("entity-render-layer--mirrored");
    } else {
      element.classList.remove("entity-render-layer--mirrored");
    }
    document.querySelector(".table-viewport")?.appendChild(element);
    return () => {
      document.querySelector(".table-viewport")?.appendChild(element);
    };
  }, [isMirrored]);

  return ReactDOM.createPortal(children, element);
};

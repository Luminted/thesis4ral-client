import React, { useEffect, useLayoutEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { selectIsMirrored, selectTablePixelDimensions, selectTablePosition } from "../../selectors";
import { IProps } from "./typings";
import "./styles.css"

export const CardRenderLayer = ({children}: IProps) => {

    const {x, y} = useSelector(selectTablePosition);
    const {height, width} = useSelector(selectTablePixelDimensions);
    const isMirrored = useSelector(selectIsMirrored);

    const elementRef = useRef(document.createElement("div"));
    const {current: element} = elementRef
    element.classList.add("card-render-layer");
    if(isMirrored) element.classList.add("card-render-layer--mirrored");
    element.style.top = `${y + (isMirrored ? height : 0)}px`;
    element.style.left = `${x + (isMirrored ? width : 0)}px`;

    useEffect(() => {
        document.querySelector(".table-viewport")?.appendChild(element);
        return () => {document.querySelector(".table-viewport")?.appendChild(element);}
    }, []);

    return ReactDOM.createPortal(children, element);
}
import React from "react";
import { DimensionsScaler } from "../DimensionsScaler";
import { SVGLoader } from "../SVGLoader";
import { IProps } from "./typings";
import "./style.css";

export const EntityCore = ({width, height, eventHandlerMapping, graphicEndpoint}: IProps) => 
    <DimensionsScaler width={width} height={height}>
        <div className="entity-core" draggable={true} {...eventHandlerMapping}>
            <SVGLoader endpoint={graphicEndpoint} />
        </div>
    </DimensionsScaler>

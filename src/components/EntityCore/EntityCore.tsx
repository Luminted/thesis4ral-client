import React from "react";
import { DimensionsScaler } from "../DimensionsScaler";
import { ImageLoader } from "../ImageLoader";
import { IProps } from "./typings";
import "./style.css";

export const EntityCore = ({width, height, eventHandlerMapping, graphicEndpoint}: IProps) => 
    <DimensionsScaler width={width} height={height}>
        <div className="entity-core" draggable={true} {...eventHandlerMapping}>
            <ImageLoader resourceRoute={graphicEndpoint} />
        </div>
    </DimensionsScaler>

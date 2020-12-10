import React from "react";
import cn from "classnames";
import { DimensionsScaler } from "../DimensionsScaler";
import { ImageLoader } from "../ImageLoader";
import { IProps } from "./typings";
import "./style.css";

export const EntityCore = ({width, height, eventHandlerMapping, graphicEndpoint, withBorder}: IProps) => 
    <DimensionsScaler width={width} height={height}>
        <div className={cn("entity-core", {"entity-core--bordered": withBorder})} draggable={true} {...eventHandlerMapping}>
            <ImageLoader resourceRoute={graphicEndpoint} />
        </div>
    </DimensionsScaler>

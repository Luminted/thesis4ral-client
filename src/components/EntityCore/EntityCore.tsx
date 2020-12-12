import React from "react";
import cn from "classnames";
import { DimensionsScaler } from "../DimensionsScaler";
import { ImageLoader } from "../ImageLoader";
import { IProps } from "./typings";
import "./style.css";

export const EntityCore = ({ height, eventHandlerMapping, graphicEndpoint, classnames = [] }: IProps) => (
  <DimensionsScaler height={height}>
    <div className={cn("entity-core", ...classnames)} draggable={true} {...eventHandlerMapping}>
      <ImageLoader resourceRoute={graphicEndpoint} />
    </div>
  </DimensionsScaler>
);

import React from "react";
import { serverPort } from "../../config/connection";
import "./style.css"
import { IProps } from "./typings";

export const ImageLoader = ({resourceRoute}: IProps) => {
    const resourceURL = `http://localhost:${serverPort}/${resourceRoute}.svg`;

    return <img className="svg-container" src={ resourceURL }/>;
  };
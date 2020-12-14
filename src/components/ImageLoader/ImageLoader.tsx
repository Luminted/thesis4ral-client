import React from "react";
import { serverHost, serverPort } from "../../config/connection";
import "./style.css";
import { IProps } from "./typings";

export const ImageLoader = ({ resourceRoute }: IProps) => {
  const resourceURL = `http://${serverHost}:${serverPort}/${resourceRoute}.svg`;

  return <img alt="" className="svg-container" src={resourceURL} />;
};

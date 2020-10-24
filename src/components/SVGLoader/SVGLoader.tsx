import React, { useState } from "react";
import "./style.css"
import { IProps } from "./typings";

export const SVGLoader = ({endpoint}: IProps) => {

    // TODO: make host and port dynamic
    const url = `http://localhost:3000/${endpoint}.svg`;

    return <img className="svg-container" src={ url }/>;
  };
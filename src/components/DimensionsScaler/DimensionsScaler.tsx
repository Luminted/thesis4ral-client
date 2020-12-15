import React, { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { selectHorizontalScalingRation, selectVerticalScalingRation } from "../../selectors";
import { downscale } from "../../utils";
import { IProps } from "./typings";

export const DimensionsScaler = ({ height, width, children }: IProps) => {

  const horizontalScalingRatio = useSelector(selectHorizontalScalingRation);
  const verticalScalingRatio = useSelector(selectVerticalScalingRation);

  const downscaledHeight = downscale(verticalScalingRatio, height);
  const downscaledWidth = width ? downscale(verticalScalingRatio, width) : null;

  const computedCSS: CSSProperties = {
    height: downscaledHeight,
    minWidth: downscaledWidth || "unset"
  };

  return <div style={computedCSS}>{children}</div>;
};

import React, { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { tableVirtualWidth } from "../../config";
import { selectTablePixelDimensions } from "../../selectors";
import { TRatio } from "../../typings";
import { downscale } from "../../utils";
import { IProps } from "./typings";

export const DimensionsScaler = ({ height, children }: IProps) => {
  const tablePixelDimensions = useSelector(selectTablePixelDimensions);

  const horizontalScalingRatio: TRatio = {
    numerator: tablePixelDimensions?.width || 0,
    divisor: tableVirtualWidth,
  };

  const downscaledHeight = downscale(horizontalScalingRatio, height);

  const computedCSS: CSSProperties = {
    height: downscaledHeight,
  };

  return <div style={computedCSS}>{children}</div>;
};

import React, { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { tableVirtualWidth } from "../../config";
import { selectTablePixelDimensions } from "../../selectors";
import { Ratio } from "../../typings";
import { downscale } from "../../utils";
import { IProps } from "./typings";

export const DimensionsScaler = ({width, height, children}: IProps) => {

    const tablePixelDimensions = useSelector(selectTablePixelDimensions);

    const horizontalScalingRatio: Ratio = {
        numerator: tablePixelDimensions?.width || 0,
        divisor: tableVirtualWidth
    }
    
    const downscaledWidth = downscale(horizontalScalingRatio, width);
    const downscaledHeight = downscale(horizontalScalingRatio, height);

    const computedCSS: CSSProperties = {
        width: downscaledWidth,
        height: downscaledHeight
    }

    return <div style={computedCSS}>
        {children}
    </div>
}
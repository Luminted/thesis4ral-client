import { Ratio } from "../types/additionalTypes";

// numerator is assumed to be the actual table size and the divisor to be the virtual size

export const upscale = (ratio: Ratio, value: number) => 
    Math.ceil(value * ratio.divisor / ratio.numerator);


export const downscale = (ratio: Ratio, value: number) => 
    Math.trunc(value * ratio.numerator / ratio.divisor);

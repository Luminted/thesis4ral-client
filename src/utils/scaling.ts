import { TRatio } from "../typings";

// numerator is assumed to be the actual table size and the divisor to be the virtual size

export const upscale = (ratio: TRatio, value: number) => 
    Math.ceil(value * ratio.divisor / ratio.numerator);


export const downscale = (ratio: TRatio, value: number) => 
    Math.trunc(value * ratio.numerator / ratio.divisor);

import { Ratio } from "../types/additionalTypes";

// numerator is assumed to be the actual table size and the divisor to be the virtual size
export function upscale(ratio: Ratio, value: number){
    return Math.ceil(value * ratio.divisor / ratio.numerator);
}

export function downscale(ratio: Ratio, value: number) {
    console.log(value, "virtual value")
    return Math.trunc(value * ratio.numerator / ratio.divisor);
}
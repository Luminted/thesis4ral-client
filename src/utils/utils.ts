import { Ratio } from "../types/additionalTypes";

export function mirrorOnTablePosition(positionX: number, positionY: number, tableWidth: number, tableHeight: number): [number, number]{
    const transformedPositionX = -positionX + tableWidth;
    const transformedPositionY = -positionY + tableHeight;
    return [transformedPositionX, transformedPositionY];
}

export function inverseMirrorOnTablePosition(positionX: number, positionY: number, tableWidth: number, tableHeight: number): [number, number]{
    const transformedPositionX = -positionX + tableWidth;
    const transformedPositionY = -positionY + tableHeight;
    return [transformedPositionX, transformedPositionY];
}

export function getElementAbsolutePosition(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { x: Math.round(rect.left + scrollLeft), y: Math.round(rect.top + scrollTop) }
}

export function upscale(ratio: Ratio, value: number){
    return Math.ceil(value * ratio.divisor / ratio.numerator);
}

export function downscale(ratio: Ratio, value: number) {
    return Math.trunc(value * ratio.numerator / ratio.divisor);
}

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
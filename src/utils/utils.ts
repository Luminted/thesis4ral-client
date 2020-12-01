import { Ratio } from "../types/additionalTypes";

export const mirrorOnTablePosition = (positionX: number, positionY: number, tableWidth: number, tableHeight: number): [number, number] => {
    const transformedPositionX = -positionX + tableWidth;
    const transformedPositionY = -positionY + tableHeight;
    return [transformedPositionX, transformedPositionY];
}

export const inverseMirrorOnTablePosition = (positionX: number, positionY: number, tableWidth: number, tableHeight: number): [number, number] => {
    const transformedPositionX = -positionX + tableWidth;
    const transformedPositionY = -positionY + tableHeight;
    return [transformedPositionX, transformedPositionY];
}

export const getElementAbsolutePosition = (el)  => {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { x: Math.round(rect.left + scrollLeft), y: Math.round(rect.top + scrollTop) }
}

export const calculateDiagonalLength = (a: number, b: number) => {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

export const calculateHeightByDiagonalLength = (diagonalLength: number, ratio: Ratio) => {
    const {divisor, numerator} = ratio;
    return (diagonalLength * divisor) / (Math.sqrt(Math.pow(numerator, 2) + Math.pow(divisor, 2)));
}

export const calculateWidthByDiagonalLength = (diagonalLength: number, ratio: Ratio) => {
    const {divisor, numerator} = ratio;
    return (diagonalLength * numerator) / (Math.sqrt(Math.pow(numerator, 2) + Math.pow(divisor, 2)));
}

export const clamp = (value, min, max)  => {
    return Math.min(Math.max(value, min), max);
}
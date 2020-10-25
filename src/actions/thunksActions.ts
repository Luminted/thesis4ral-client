import { ThunkResult } from ".";
import { Ratio } from '../types/additionalTypes';
import { setVerticalScalingRatio, setHorizontalScalingRatio } from './setterActions/setterActions';

export function setScalingRatios(renderedTableWidth: number, renderedTableHeight: number): ThunkResult {
   return (dispatch, getStore) => {
        const {tableVirtualDimensions} = getStore();
        const horizontalScalingRatio: Ratio = {
        numerator: renderedTableWidth,
        divisor: tableVirtualDimensions!.width
        };
        const verticalScalingRatio: Ratio = {
            numerator: renderedTableHeight,
            divisor: tableVirtualDimensions!.height
        }
        dispatch(setHorizontalScalingRatio(horizontalScalingRatio));
        dispatch(setVerticalScalingRatio(verticalScalingRatio));
   }
}
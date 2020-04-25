import { useTypedSelector } from "./store";
import { selectTablePosition } from "./selectors";


export function useNormalizePositionToTable(positionX, positionY): [number, number] {
    let tablePosition = useTypedSelector<{x: number, y: number}>(selectTablePosition);
    return [positionX - tablePosition.x, positionY - tablePosition.y];
}
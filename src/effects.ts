import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getElementAbsolutePosition } from "./utils";
import { setTablePosition, setTableBoundaries, setPlayareaBoundaries } from "./actions";
import config from './config/global'

export function useSetEntityBoundaries(){
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('running')
        const {tableHeight, tableWidth, playareaHorizontalBoundaryMargin} = config
        const tableElement = document.querySelector('.table');
        if(tableElement){
            const playareaElement = document.querySelector('.play-area');
            const tablePosition = getElementAbsolutePosition(tableElement);
            const tableBoundaryBottom = tablePosition.y + tableHeight;
            const tableBoundaryRight = tablePosition.x + tableWidth;
            dispatch(setTablePosition(tablePosition.x, tablePosition.y));
            dispatch(setTableBoundaries(tablePosition.y, tableBoundaryBottom, tablePosition.x, tableBoundaryRight));
            if(playareaElement){
                const playareaBoundaryTop = 0;
                const playareaBoundaryBottom = playareaElement?.clientHeight;
                const playareaBoundaryLeft = tablePosition.x - tableWidth * (playareaHorizontalBoundaryMargin / 100);
                const playareaBoundaryRight = tablePosition.x + tableWidth * (playareaHorizontalBoundaryMargin / 100);
                dispatch(setPlayareaBoundaries(playareaBoundaryTop, playareaBoundaryBottom, playareaBoundaryLeft, playareaBoundaryRight));
            }
        }
    }, [])
}
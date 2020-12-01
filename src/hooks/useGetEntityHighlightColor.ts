import { useSelector } from "react-redux"
import { seatColors } from "../config";
import { selectClientSeatId } from "../selectors"
import { MaybeNull } from "../types/genericTypes";

export const useGetEntityHighlightColor = (clientId: MaybeNull<string>) => {
    const seatId = useSelector(selectClientSeatId(clientId));
    return seatId !== null ? seatColors[seatId] : null;
}
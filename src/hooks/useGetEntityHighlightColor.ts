import { useSelector } from "react-redux"
import { seatColors } from "../config";
import { selectClientSeatId } from "../selectors"
import { TMaybeNull } from "../typings";

export const useGetEntityHighlightColor = (clientId: TMaybeNull<string>) => {
    const seatId = useSelector(selectClientSeatId(clientId));
    return seatId !== null ? seatColors[seatId] : null;
}
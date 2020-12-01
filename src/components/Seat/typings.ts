import { EOrientation } from "../../typings";

export interface IProps {
    seatId: string
    isMirrored: boolean
    orientation: EOrientation
    clientId?: string
}
import { EOrientation } from "../../types/additionalTypes";

export interface IProps {
    seatId: string
    isMirrored: boolean
    orientation: EOrientation
    clientId?: string
}
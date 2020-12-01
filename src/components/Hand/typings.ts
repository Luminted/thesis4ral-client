import { IClientHand, EOrientation } from "../../typings";

export interface IProps {
    handDetails: IClientHand
    isMirrored: boolean
    orientation: EOrientation
}
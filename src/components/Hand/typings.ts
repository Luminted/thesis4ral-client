import { EOrientation } from "../../types/additionalTypes";
import { IClientHand } from "../../types/dataModelDefinitions";

export interface IProps {
    handDetails: IClientHand
    isMirrored: boolean
    orientation: EOrientation
}
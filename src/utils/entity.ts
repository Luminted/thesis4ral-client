import { frenchCardConfig, setCardConfig } from "../entities";
import { ECardTypes } from "../typings";

export const getCardDimensions = (type: string) => {
  switch (type) {
    case ECardTypes.FRENCH:
      return { width: frenchCardConfig.width, height: frenchCardConfig.height };
    case ECardTypes.SET:
      return { width: setCardConfig.width, height: setCardConfig.height };
    default:
      throw new Error("Type of card not found.");
  }
};

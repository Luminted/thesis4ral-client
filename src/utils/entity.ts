import { frenchCardConfig } from "../entities";
import { ECardTypes } from "../typings";

export const getCardHeight = (type: string) => {
  switch (type) {
    case ECardTypes.FRENCH:
      const { height } = frenchCardConfig;
      return height;
    default:
      throw new Error("Type of card not found.");
  }
};

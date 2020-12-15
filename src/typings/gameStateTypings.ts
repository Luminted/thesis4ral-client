import { TMaybeNull } from "./utilityTypings";
import { EClientConnectionStatuses } from "./";
import { ECardTypes } from "./cardTableTypings";

export interface IEntity {
  entityType: EEntityTypes;
  entityId: string;
  positionX: number;
  positionY: number;
  grabbedBy: TMaybeNull<string>;
  zIndex: number;
  rotation: number;
  metadata?: IEntityMetadata;
}

export interface ICardEntity extends IEntity {
  faceUp: boolean;
  ownerDeck: TMaybeNull<string>;
  metadata: ICardEntityMetadata;
}

export interface IDeckEntity extends IEntity {
  metadata: IEntityMetadata;
  numberOfCards: number;
  drawIndex: number;
}

export interface IEntityMetadata {
  name: string;
  type: string;
}

export interface ICardEntityMetadata extends IEntityMetadata {
  back: string;
}

export type TDeckConfig = {
  type: ECardTypes;
  cardBack: string;
  preview: string;
  cards: IEntityMetadata[];
};

export interface IHandCard extends Pick<ICardEntity, "entityId" | "metadata" | "ownerDeck" | "faceUp"> {}

export interface IDeckCard extends Pick<ICardEntity, "entityId" | "metadata"> {}

export interface IClientHand {
  clientId: string;
  cards: IHandCard[];
  ordering: number[];
}

export enum EEntityTypes {
  CARD = "CARD",
  DECK = "DECK",
}

export type TClient = {
  clientInfo: TClientInfo;
  status: EClientConnectionStatuses;
};

export type TClientInfo = {
  clientId: string;
  name?: string;
  seatId: string;
};

export type TGameState = {
  cards: ICardEntity[];
  decks: IDeckEntity[];
  clients: TClient[];
  hands: IClientHand[];
};

import { TMaybeNull } from "./utilityTypings";

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
}

export interface IEntityMetadata {
  name: string;
  type: string;
}

export interface ICardEntityMetadata extends IEntityMetadata {
  back: string;
}

export type TDeckConfig = {
  type: string;
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

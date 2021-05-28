import { EEntityTypes, IEntityMetadata } from "./gameStateTypings";

export enum ECardTypes {
  FRENCH = "french",
  SET = "set",
}

export interface ICardConfig {
  height: number;
  width: number;
}

export type TDeckConfig = {
  type: ECardTypes;
  cardBack: string;
  preview: string;
  cards: IEntityMetadata[];
};

export enum EOrientation {
  SOUTH = "SOUTH",
  NORTH = "NORTH",
}

export type TGrabbedEntityInfo = {
  entityId: string;
  entityType: EEntityTypes;
  width?: number;
  height?: number;
  relativeGrabbedAtX: number;
  relativeGrabbedAtY: number;
  restricted: boolean;
  originalPositionX?: number;
  originalPositionY?: number;
  grabbedFromHand?: string;
};

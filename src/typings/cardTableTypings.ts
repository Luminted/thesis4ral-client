import { EEntityTypes } from "./gameStateTypings";

export enum ECardTypes {
  FRENCH = "french",
}

export interface ICardConfig {
  height: number;
}

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

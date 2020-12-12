import { TRatio } from "../typings";
import { french52SortedBlue, french52SortedRed } from "../entities";

export const tableAspectRatio: TRatio = {
  numerator: 7,
  divisor: 3,
};

export const cardTiltFactor = 1;

export const tableHeightPercentage = 50;
export const trayWidthPercentage = 20;

export const tableVirtualWidth = 10000;
export const tableVirtualHeight = 10000;

export const trayDecks = [french52SortedRed, french52SortedBlue];

export const seatIdMapping: { [key in string]: string } = {
  1: "NORTH_WEST",
  2: "NORTH",
  3: "NORTH_EAST",
  4: "SOUTH_WEST",
  5: "SOUTH",
  6: "SOUTH_EAST",
};

export const seatColors: { [key in string]: string } = {
  1: "red",
  2: "blue",
  3: "yellow",
  4: "green",
  5: "purple",
  6: "orange",
};

export const tableRimWidth = 3;
export const trayRimWidth = 1;
export const borderRadius = 2;
export const entityClientHighlightThickness = 4;

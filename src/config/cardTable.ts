import {Ratio} from "../typings";
import { french52SortedBlue, french52SortedRed } from "../entities";

export const tableAspectRatio: Ratio = {
    numerator: 7,
    divisor: 3
}

export const cardTiltFactor = 1;

export const tableHeightPercentage = 55;
export const trayWidthPercentage = 15;

export const tableVirtualWidth = 10000;
export const tableVirtualHeight = 10000;

export const seatIdMapping = {
    1: 'NORTH_WEST',
    2: 'NORTH',
    3: 'NORTH_EAST',
    4: 'SOUTH_WEST',
    5: 'SOUTH',
    6: 'SOUTH_EAST'
}

export const seatColors = { 
    1: "red",
    2: "blue",
    3: "yellow",
    4: "green",
    5: "purple",
    6: "orange"
};

export const trayDecks = [french52SortedRed, french52SortedBlue];

import { ReactNode } from "react";
import { IEntity } from "../../typings";

export interface IProps extends IEntity {
  width: number;
  height: number;
  rotationStep: number;
  clickPassThrough: boolean;
  svgEndpoint: string;
  boundToTable: boolean;
  entityCoreClassnames?: string[];
  menuContent?: ReactNode;
  eventHandlers?: { [key in string]: (event: any) => void };
}

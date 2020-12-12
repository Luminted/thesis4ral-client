import { DragEvent } from "react";

export interface IProps {
  height: number;
  previewGraphicEndpoint: string;
  deckGraphicEndpoint: string;
  onDragStart: (e: DragEvent) => void;
}

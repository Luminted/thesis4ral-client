import { DragEvent } from "react";

export interface IProps {
    width: number
    height: number
    previewGraphicEndpoint: string
    deckGraphicEndpoint: string
    onDragStart: (e: DragEvent) => void
}
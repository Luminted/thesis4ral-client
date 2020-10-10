export interface Props {
    entityId: string
    context: CardInteractionContext
    scale?: number,
    // children: React.Component
}

export enum CardInteractionContext {
    TABLE = "TABLE",
    HAND = "HAND"
}

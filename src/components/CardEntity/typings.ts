export interface Props {
    entityId: string
    context: CardContext
    scale?: number,
    // children: React.Component
}

export enum CardContext {
    TABLE = "TABLE",
    HAND = "HAND"
}

import { IAddCardVerb, IAddDeckVerb, IGrabFromHandVerb, IGrabVerb, IMoveToVerb, IMoveVerb, IPutOnTable, TVerb } from "../typings"

export const isVerbTypeWithPosition = (verb: TVerb): verb is IGrabVerb |
    IMoveToVerb |
    IMoveVerb |
    IAddCardVerb |
    IGrabFromHandVerb |
    IPutOnTable |
    IAddDeckVerb => "positionX" in verb && "positionY" in verb; 
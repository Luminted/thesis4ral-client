import { IAddCardVerb, IAddDeckVerb, IGrabFromHandVerb, IGrabVerb, IMoveToVerb, IMoveVerb, IPutOnTable, Verb } from "../types/verb"

export const isVerbTypeWithPosition = (verb: Verb): verb is IGrabVerb |
    IMoveToVerb |
    IMoveVerb |
    IAddCardVerb |
    IGrabFromHandVerb |
    IPutOnTable |
    IAddDeckVerb => {

        console.log("positionX" in verb, "positionY" in verb)
        return "positionX" in verb && "positionY" in verb;
    } 
import { IAddCardVerb, IAddDeckVerb, IGrabFromHandVerb, IGrabVerb, IMoveToVerb, IMoveVerb, TVerb } from "../typings";

export const isVerbTypeWithPosition = (verb: TVerb): verb is IGrabVerb | IMoveToVerb | IMoveVerb | IAddCardVerb | IGrabFromHandVerb | IAddDeckVerb =>
  "positionX" in verb && "positionY" in verb;

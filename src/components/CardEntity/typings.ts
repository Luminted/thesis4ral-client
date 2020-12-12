import { ICardEntity } from "../../typings";

export interface IProps extends Omit<ICardEntity, "entityType"> {}

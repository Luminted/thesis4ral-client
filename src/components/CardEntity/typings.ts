import { ICardEntity } from "../../types/dataModelDefinitions"

export interface IProps extends Omit<ICardEntity, "entityType"> {}
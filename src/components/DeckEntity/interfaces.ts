import { IDeckEntity } from "../../types/dataModelDefinitions";

export interface IProps extends Omit<IDeckEntity, "entityType"> {}
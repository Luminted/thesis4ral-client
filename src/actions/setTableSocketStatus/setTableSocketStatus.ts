import { ESocketConnectionStatuses } from "../../typings";
import { ESetterActionTypeKeys } from "../actionTypeKeys";

export type TSetTableConnectionStatusAction = {
  type: ESetterActionTypeKeys.SET_TABLE_CONNECTION_STATUS;
  status: ESocketConnectionStatuses;
};

export const setTableSocketStatus = (status: ESocketConnectionStatuses): TSetTableConnectionStatusAction => {
  return {
    type: ESetterActionTypeKeys.SET_TABLE_CONNECTION_STATUS,
    status,
  };
};

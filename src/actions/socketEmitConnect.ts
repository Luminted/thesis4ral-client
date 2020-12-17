import { ESocketActionTypeKeys } from "./actionTypeKeys";

export type TSocketEmitConnectAction = {
  type: ESocketActionTypeKeys.CONNECT;
};

export const socketEmitConnect = (): TSocketEmitConnectAction => {
  return {
    type: ESocketActionTypeKeys.CONNECT,
  };
};

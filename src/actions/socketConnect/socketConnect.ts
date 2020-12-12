import { ESocketActionTypeKeys } from "../actionTypeKeys";

export type TSocketConnectAction = {
  type: ESocketActionTypeKeys.CONNECT;
};

// TODO: remove if auto connection stays in use
export const socketConnect = (): TSocketConnectAction => {
  return {
    type: ESocketActionTypeKeys.CONNECT,
  };
};

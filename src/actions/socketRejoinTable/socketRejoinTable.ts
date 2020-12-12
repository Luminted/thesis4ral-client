import { ESocketActionTypeKeys } from "../actionTypeKeys";

export type TSocketRejoinAction = {
  type: ESocketActionTypeKeys.REJOIN_TABLE;
  clientId: string;
  ackFunction?: TSocketRejoinAckFunction;
};

type TSocketRejoinAckFunction = (error: string) => void;

export const socketRejoinTable = (clientId: string, ackFunction?: TSocketRejoinAckFunction): TSocketRejoinAction => ({
  type: ESocketActionTypeKeys.REJOIN_TABLE,
  clientId,
  ackFunction,
});

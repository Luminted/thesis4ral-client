import { ESocketActionTypeKeys } from "./actionTypeKeys";

export type TSocketEmitRejoinAction = {
  type: ESocketActionTypeKeys.REJOIN_TABLE;
  clientId: string;
  ackFunction?: TSocketEmitRejoinAckFunction;
};

type TSocketEmitRejoinAckFunction = (error: string) => void;

export const socketEmitRejoinTable = (clientId: string, ackFunction?: TSocketEmitRejoinAckFunction): TSocketEmitRejoinAction => ({
  type: ESocketActionTypeKeys.REJOIN_TABLE,
  clientId,
  ackFunction,
});

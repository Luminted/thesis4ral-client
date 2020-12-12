import { ESocketActionTypeKeys } from "../actionTypeKeys";

export type TSocketLeaveTableAction = {
  type: ESocketActionTypeKeys.LEAVE_TABLE;
  clientId: string;
  ackFunction?: TSocketLeaveTableAckFunction;
};

export type TSocketLeaveTableAckFunction = (error: string) => void;

export const socketLeaveTable = (clientId: string, ackFunction?: TSocketLeaveTableAckFunction): TSocketLeaveTableAction => ({
  type: ESocketActionTypeKeys.LEAVE_TABLE,
  clientId,
  ackFunction,
});

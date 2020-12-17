import { ESocketActionTypeKeys } from "../actionTypeKeys";

export type TSocketEmitLeaveTableAction = {
  type: ESocketActionTypeKeys.LEAVE_TABLE;
  clientId: string;
  ackFunction?: TSocketEmitLeaveTableAckFunction;
};

export type TSocketEmitLeaveTableAckFunction = (error: string) => void;

export const socketEmitLeaveTable = (clientId: string, ackFunction?: TSocketEmitLeaveTableAckFunction): TSocketEmitLeaveTableAction => ({
  type: ESocketActionTypeKeys.LEAVE_TABLE,
  clientId,
  ackFunction,
});

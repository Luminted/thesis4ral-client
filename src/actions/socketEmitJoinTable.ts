import { TClientInfo, TMaybeNull } from "../typings";
import { ESocketActionTypeKeys } from "./actionTypeKeys";

type TSocketEmitJoinTableAckFunction = (error: TMaybeNull<string>, clientInfo: TClientInfo) => void;

export type TSocketEmitJoinTableAction = {
  type: ESocketActionTypeKeys.JOIN_TABLE;
  requestedSeatId: string;
  name: string;
  ackFunction?: TSocketEmitJoinTableAckFunction;
};

export const socketEmitJoinTable = (requestedSeatId: string, name: string, ackFunction?: TSocketEmitJoinTableAckFunction): TSocketEmitJoinTableAction => {
  return {
    type: ESocketActionTypeKeys.JOIN_TABLE,
    requestedSeatId,
    name,
    ackFunction,
  };
};

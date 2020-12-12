import { ESocketConnectionStatuses } from "../../typings";

export interface IProps {
  connectionStatus: ESocketConnectionStatuses;
  isObserver: boolean;
}

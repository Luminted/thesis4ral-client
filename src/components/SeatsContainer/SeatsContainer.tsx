import React from "react";
import { useSelector } from "react-redux";
import { selectClients, selectIsMirrored } from "../../selectors";
import { seatIdMapping } from "../../config";
import { IProps } from "./typings";
import { style } from "./style";
import { Seat } from "../Seat";

export const SeatsContainer = ({ orientation }: IProps) => {
  const clients = useSelector(selectClients);
  const isMirrored = useSelector(selectIsMirrored);

  const orientationsSeatIds = Object.keys(seatIdMapping).filter((id) =>  seatIdMapping[id]?.includes(orientation));
  if(isMirrored) orientationsSeatIds.reverse();

  return (
    <>
      <div className="seats-container">
        {orientationsSeatIds.map((seatId) => {
          const { clientInfo } = clients.find((client) => client.clientInfo.seatId === seatId) || {};
          return <Seat name={clientInfo?.name} seatId={seatId} orientation={orientation} clientId={clientInfo?.clientId} key={seatId} />;
        })}
      </div>
      <style jsx={true}>{style}</style>
    </>
  );
};

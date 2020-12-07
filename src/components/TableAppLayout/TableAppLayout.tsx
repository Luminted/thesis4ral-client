import React from "react";
import { LeaveTableButton } from "../LeaveTableButton/LeaveTableButton";
import { TableViewport } from "../TableViewport/TableViewport";
import "./styles.css";

export const TableAppLayout = () => (
    <div className="table-app-layout">
        <div className="table-app-layout__leave-button">
            <LeaveTableButton />
        </div>
        <TableViewport/>
    </div>
)
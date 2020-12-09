import React from "react";
import { ESpinnerSize, IProps } from "./typings";
import "./styles.css"

const sizeMapping = {
    [ESpinnerSize.SMALL]: 2,
    [ESpinnerSize.MEDIUM]: 5,
    [ESpinnerSize.LARGE]: 10,
}

export const LoadingSpinner = ({size = ESpinnerSize.MEDIUM}: IProps) => 
    <div className="loading-spinner" style={{
        fontSize: `${sizeMapping[size]}vh`
    }}>
            <i className="fas fa-circle-notch fa-spin"></i>
    </div>
import React from "react";
import {RoutesConstants} from "../../../core/constants/routes";

export interface IMenu {
    title: string
    icon: React.ReactNode
    link: RoutesConstants
}
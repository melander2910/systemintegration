import { Client } from "./client";
import { User } from "./user";

export interface TimeTracking {
    id?: number;
    startDate?: string;
    endDate?: string;
    title?: string | undefined;
    description?: string | undefined;
    userId?: number;
    clientId?: number;
}
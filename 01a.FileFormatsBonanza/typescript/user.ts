import { Client } from "./client";
import { TimeTracking } from "./time-trackings";

export interface User {
    id?: number;
    firstname?: string | undefined;
    lastname?: string | undefined;
    email?: string | undefined;
    clients?: Client[] | undefined;
    timeTrackings?: TimeTracking[] | undefined;
}
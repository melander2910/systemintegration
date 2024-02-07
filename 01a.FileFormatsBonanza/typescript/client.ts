import { TimeTracking } from "./time-trackings";
import { User } from "./user";

export interface Client {
    id?: number;
    firstname?: string | undefined;
    lastname?: string | undefined;
    phoneNumber?: string | undefined;
    email?: string | undefined;
    companyName?: string | undefined;
}
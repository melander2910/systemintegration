import { CalendarModel } from "../models/calendar-model";
import { TimeTracking } from "../models/time-tracking";

export const timeTrackingToCalendar = (timeTracking: TimeTracking): CalendarModel => {
    return {
        id: timeTracking.id,
        start: new Date(timeTracking.startDate ?? ""),
        end: new Date(timeTracking.endDate ?? ""),
        title: timeTracking.title,
        description: timeTracking.description,
        userId: timeTracking.userId,
        clientId: timeTracking.clientId,
    };
};

export const calendarToTimeTracking = (calendar: CalendarModel): TimeTracking => {
    return {
        id: calendar.id,
        startDate: calendar.start?.toLocaleString(),
        endDate: calendar.end?.toLocaleString(),
        title: calendar.title,
        description: calendar.description,
        userId: calendar.userId,
        clientId: calendar.clientId,
    };
};
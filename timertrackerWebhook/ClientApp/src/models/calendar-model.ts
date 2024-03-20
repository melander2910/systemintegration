// TODO: Create Calendar type for mapping timetracking to Calendar?
export type CalendarModel = {
    id?:number,
    start?:Date,
    end?:Date,
    title?:string,
    description?:string,
    userId?:number
    clientId?:number
}
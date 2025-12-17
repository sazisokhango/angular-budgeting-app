export interface ScheduleModel {
    id: number,
    recurrencePattern: string,
    startDate: Date,
    endDate: Date,
    active: boolean
}